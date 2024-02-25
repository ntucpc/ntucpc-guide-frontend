import path from 'path';

import getEnvironmentVariable from 'lib/environment';
import { Dirent, readdirSync, readFileSync } from 'fs';

const ARTICLE_PATH = path.join(process.cwd(), getEnvironmentVariable('CONTENTS_RELATIVE_PATH'));
const LEVEL_PATH = path.join(process.cwd(), getEnvironmentVariable('LEVELS_RELATIVE_PATH'));


export type ChapterType = {
    name: string;
    url: string;
    sections: SectionType[];
};
export type SectionType = {
    chapter: string;
    section: string;
    handout_url: string;
    chapter_url: string;
    section_url: string;
    level_name: string;
    title: string;
    authors: string[];
    contributors: string[];
    description: string;
    prerequisites: string[];
};
export type LevelType = {
    name: string;
    title: string;
    url: string;
    sections: SectionType[];
};

// entry is a Dirent of a directory containing the section
function readSection(entry: Dirent): SectionType {
    const chapter_name = path.parse(entry.path).name;
    return {
        chapter: chapter_name,
        section: entry.name,
        handout_url: getPageUrl(),
        chapter_url: getPageUrl(chapter_name),
        section_url: getPageUrl(chapter_name, entry.name),
        ...JSON.parse(readFileSync(path.join(entry.path, entry.name, "config.json"), { encoding: "utf-8" })),
    } as SectionType;
    // TODO: sanitize config file
}

// entry is a Dirent of a .json file describing the level
function readLevel(entry: Dirent): LevelType {
    const level_name = path.parse(entry.name).name;
    const level_json = JSON.parse(readFileSync(path.join(entry.path, entry.name), { encoding: "utf-8" }));
    const level = {
        name: level_name,
        title: level_json["title"],
        url: getPageUrl(level_name),
        sections: level_json["sections"].map((path: string) => getSectionByPath(path)),
    } as LevelType;
    return level;
    // TODO: sanitize config file
}

const chapters: ChapterType[] = (function () {
    let ret: ChapterType[] = [];
    const chapter_names = readdirSync(ARTICLE_PATH, { withFileTypes: true })
        .filter((dir) => dir.isDirectory());
    for (const chapter_dir of chapter_names) {
        const chapter_name = chapter_dir.name;
        ret.push({
            name: chapter_name,
            url: getPageUrl(chapter_name),
            sections: readdirSync(path.join(ARTICLE_PATH, chapter_name), { withFileTypes: true })
                .filter((dir) => dir.isDirectory())
                .map((dir) => readSection(dir)),
        });
    }
    return ret;
})();

const sections: SectionType[] = (() => {
    return chapters
        .map(chapter => chapter.sections)
        .reduce((acc, cur) => acc.concat(cur), []);
})();

const levels = (() => {
    const levels = readdirSync(LEVEL_PATH, { withFileTypes: true })
        .map(entry => readLevel(entry));
    for(const level of levels) {
        for(const section of level.sections) {
            if(section.level_name !== undefined) {
                console.log(`Warning: section [${section.chapter}/${section.section}] is included in multiple levels!`);
            }
            section.level_name = level.name;
        }
    }
    const level_others = {
        name: "others",
        title: "Others",
        url: getPageUrl("others"),
        sections: [],
    } as LevelType;
    levels.push(level_others);
    for(const section of sections) {
        if(section.level_name === undefined) {
            section.level_name = level_others.name;
            level_others.sections.push(section);
        }
    }
    return levels;
})();

export function getChapters() {
    return chapters;
}

export function getLevels() {
    return levels;
}

export function getSections(chapter_name?: string) {
    return chapters
        .filter(chapter => (chapter_name === undefined || chapter_name === chapter.name))
        .map(chapter => chapter.sections)
        .reduce((acc, cur) => acc.concat(cur), []);
}

export function getSectionByName(chapter_name: string, section_name: string): SectionType {
    const matched = getSections().filter(section => (
        chapter_name === section.chapter && section_name === section.section
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
        section => (section.chapter == target.chapter && section.section == target.section)
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

export function getChapterUrl(chapter: ChapterType): string;
export function getChapterUrl(chapter: SectionType): string;
export function getChapterUrl(arg: ChapterType | SectionType): string {
    if((arg as ChapterType).name !== undefined) {
        arg = arg as ChapterType;
        return getPageUrl(arg.name);
    } else {
        arg = arg as SectionType;
        return getPageUrl(arg.chapter);
    }
};

export function getSectionUrl(arg: SectionType): string {
    return getPageUrl(arg.chapter, arg.section);
};
