import path from 'path';

import getEnvironmentVariable from 'lib/environment';
import { Dirent, existsSync, readdirSync, readFileSync } from 'fs';

const ARTICLE_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "content");
const LEVEL_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "level");

// to use the DataType types in props, make sure they are JSON-serializable and do not contain circular references
export type ChapterType = {
    id: string;
    url: string;
    title: string;
    sections: SectionType[];
};
export type SectionType = {
    id: string;
    url: string;
    title: string;
    authors: string[];
    contributors: string[];
    description: string;
    prerequisites: string[];
    chapter: ChapterType;
    level: LevelType;
};
export type LevelType = {
    id: string;
    url: string;
    title: string;
    sections: SectionType[];
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
        id: entry.name,
        url: getPageUrl(chapter_name, entry.name),
        ...JSON.parse(readFileSync(path.join(entry.path, entry.name, "config.json"), { encoding: "utf-8" })),
    } as SectionType;
    // TODO: sanitize config file
}

// entry is a Dirent of a .json file describing the level
function readLevel(entry: Dirent): LevelType {
    const level_name = path.parse(entry.name).name;
    const level_json = JSON.parse(readFileSync(path.join(entry.path, entry.name), { encoding: "utf-8" }));
    const sections_: SectionType[] = level_json["sections"].map((path: string) => getSectionByPath(path));
    const level = {
        id: level_name,
        title: level_json["title"],
        url: getPageUrl(level_name),
        sections: sections_,
    } as LevelType;
    for(const section of sections_) {
        if(section.level !== undefined) {
            console.log(`Warning: section [${section.chapter.id}/${section.id}] is included in multiple levels!`);
        }
        section.level = level;
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
        const section = section_dirs.map((dir) => readSection(dir));
        const chapter_json = readJson(path.join(chapter_dir.path, chapter_dir.name, "config.json"));
        const chapter = {
            id: chapter_name,
            url: getPageUrl(chapter_name),
            ...(chapter_json ?? {title: chapter_name}),
            sections: section,
        } as ChapterType;
        section.forEach(sec => {
            sec.chapter = chapter;
        })
        sections.push(...section);
        chapters.push(chapter);
    }
    return {sections, chapters};
})();

const levels = (() => {
    const levels = readdirSync(LEVEL_PATH, { withFileTypes: true })
        .map(entry => readLevel(entry));
    const level_others = {
        id: "others",
        title: "Others",
        url: getPageUrl("others"),
        sections: [],
    } as LevelType;
    levels.push(level_others);
    for(const section of sections) {
        if(section.level === undefined) {
            section.level = level_others;
            level_others.sections.push(section);
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
    return chapters.filter(chap => chap.id === chapter_name)[0];
}

export function getSectionsByChapter(chapter_name: string) {
    return sections.filter(section => section.chapter.id === chapter_name);
}

export function getSectionByName(chapter_name: string, section_name: string): SectionType {
    const matched = getSections().filter(section => (
        chapter_name === section.chapter.id && section_name === section.id
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
        section => (section.chapter.id == target.chapter.id && section.id == target.id)
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
