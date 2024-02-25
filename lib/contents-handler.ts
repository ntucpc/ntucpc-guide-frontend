import path from 'path';

import getEnvironmentVariable from 'lib/environment';
import { Dirent, existsSync, readdirSync, readFileSync } from 'fs';

const ARTICLE_PATH = path.join(process.cwd(), getEnvironmentVariable('CONTENTS_RELATIVE_PATH'));
const LEVEL_PATH = path.join(process.cwd(), getEnvironmentVariable('LEVELS_RELATIVE_PATH'));

// to use the DataType types in props, make sure they are JSON-serializable and do not contain circular references
export type ChapterDataType = {
    name: string;
    url: string;
    title: string;
};
export type SectionDataType = {
    name: string,
    url: string,
    title: string,
    authors: string[];
    contributors: string[];
    description: string;
    prerequisites: string[];
};
export type LevelDataType = {
    name: string,
    url: string,
    title: string,
};

export type ChapterType = {
    d_chapter: ChapterDataType;
    d_sections: SectionDataType[];
};
export type SectionType = {
    d_section: SectionDataType;
    d_chapter?: ChapterDataType;
    d_level?: LevelDataType;
};
export type LevelType = {
    d_level: LevelDataType;
    d_sections: SectionDataType[];
};

function readJson(json_path: string): any {
    if(existsSync(json_path)) {
        return JSON.parse(readFileSync(json_path, {encoding: "utf-8"}));
    }
    return undefined;
}

// entry is a Dirent of a directory containing the section
function readSection(entry: Dirent): SectionType {
    const chapter_name = path.parse(entry.path).name;
    return {
        d_section: {
            name: entry.name,
            url: getPageUrl(chapter_name, entry.name),
            ...JSON.parse(readFileSync(path.join(entry.path, entry.name, "config.json"), { encoding: "utf-8" })),
        } as SectionDataType,
    } as SectionType;
    // TODO: sanitize config file
}

// entry is a Dirent of a .json file describing the level
function readLevel(entry: Dirent): LevelType {
    const level_name = path.parse(entry.name).name;
    const level_json = JSON.parse(readFileSync(path.join(entry.path, entry.name), { encoding: "utf-8" }));
    const sections_: SectionType[] = level_json["sections"].map((path: string) => getSectionByPath(path));
    const level = {
        d_level: {
            name: level_name,
            title: level_json["title"],
            url: getPageUrl(level_name),
        } as LevelDataType,
        d_sections: sections_.map(sec => sec.d_section),
    } as LevelType;
    for(const section of sections_) {
        if(section.d_level !== undefined) {
            console.log(`Warning: section [${section.d_chapter}/${section.d_section}] is included in multiple levels!`);
        }
        section.d_level = level.d_level;
    }
    return level;
    // TODO: sanitize config file
}

const {sections, chapters}: {sections: SectionType[], chapters: ChapterType[]} = (() => {
    let chapters: ChapterType[] = [];
    let sections: SectionType[] = [];
    const chapter_dirs = readdirSync(ARTICLE_PATH, { withFileTypes: true })
        .filter((dir) => dir.isDirectory());
    for (const chapter_dir of chapter_dirs) {
        const chapter_name = chapter_dir.name;
        const section_dirs = readdirSync(path.join(chapter_dir.path, chapter_dir.name), { withFileTypes: true })
            .filter((dir) => dir.isDirectory());
        const sections_ = section_dirs.map((dir) => readSection(dir));
        const chapter_json = readJson(path.join(chapter_dir.path, chapter_dir.name, "config.json"));
        const chapter_data = {
            name: chapter_name,
            url: getPageUrl(chapter_name),
            ...(chapter_json ?? {title: chapter_name}),
        } as ChapterDataType;
        sections_.forEach(sec => {
            sec.d_chapter = chapter_data;
        })
        sections.push(...sections_);
        chapters.push({
            d_chapter: chapter_data,
            d_sections: sections_.map(sec => sec.d_section),
        });
    }
    return {sections, chapters};
})();

const levels = (() => {
    const levels = readdirSync(LEVEL_PATH, { withFileTypes: true })
        .map(entry => readLevel(entry));
    const level_others = {
        d_level: {
            name: "others",
            title: "Others",
            url: getPageUrl("others"),
        } as LevelDataType,
        d_sections: [],
    } as LevelType;
    levels.push(level_others);
    for(const section of sections) {
        if(section.d_level === undefined) {
            section.d_level = level_others.d_level;
            level_others.d_sections.push(section.d_section);
        }
    }
    return levels;
})();

export function getSections() {
    return sections;
}
export function getChapters() {
    return chapters;
}
export function getLevels() {
    return levels;
}

export function getChapterByName(chapter_name: string) {
    return chapters.filter(chap => chap.d_chapter.name === chapter_name)[0];
}

export function getSectionsByChapter(chapter_name: string) {
    return sections.filter(section => section.d_chapter?.name === chapter_name);
}

export function getSectionByName(chapter_name: string, section_name: string): SectionType {
    const matched = getSections().filter(section => (
        chapter_name === section.d_chapter?.name && section_name === section.d_section.name
    ));
    return matched[0];
}

export function getSectionByPath(section_path: string): SectionType {
    const section_name = path.parse(section_path).name;
    const chapter_name = path.parse(path.parse(section_path).dir).name;
    return getSectionByName(chapter_name, section_name);
}

export function getAdjacentSections(target: SectionType): {prev: SectionType | null, next: SectionType | null} {
    const sections = getSections();
    const idx = sections.findIndex(
        section => (section.d_chapter == target.d_chapter && section.d_section == target.d_section)
    );
    return {
        prev: sections[idx - 1] ?? null,
        next: sections[idx + 1] ?? null,
    };
}

export function getPageUrl(chapter_name?: string, section_name?: string): string {
    let url = `/handout`;
    if(chapter_name) {
        url = path.join(url, chapter_name);
        if(section_name) {
            url = path.join(url, section_name);
        }
    }
    return url;
}
