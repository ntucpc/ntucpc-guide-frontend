import path from 'path';

import getEnvironmentVariable from 'lib/environment';
import { readdirSync, readFileSync } from 'fs';

const ARTICLE_PATH = path.join(process.cwd(), getEnvironmentVariable('CONTENTS_RELATIVE_PATH'));


export type ChapterType = {
    name: string;
    sections: SectionType[];
};
export type SectionType = {
    chapter: string;
    section: string;
    title: string;
    authors: string[];
    contributors: string[];
    description: string;
    prerequisites: string[];
};

const chapters: ChapterType[] = (function () {
    let ret: ChapterType[] = [];
    const chapter_names = readdirSync(ARTICLE_PATH, { withFileTypes: true })
        .filter((dir) => dir.isDirectory());
    for (const chapter_dir of chapter_names) {
        const chapter_name = chapter_dir.name;
        ret.push({
            name: chapter_name,
            sections: readdirSync(path.join(ARTICLE_PATH, chapter_name), { withFileTypes: true })
                .filter((dir) => dir.isDirectory())
                .map((dir) => ({
                    chapter: chapter_name,
                    section: dir.name,
                    ...JSON.parse(readFileSync(path.join(dir.path, dir.name, "config.json"), { encoding: "utf-8" })),
                })),
        });
    }
    return ret;
})();

export function getChapters() {
    return chapters;
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

export function getAdjacentSections(target: SectionType): {prev_url?: string, next_url?: string} {
    const sections = getSections();
    const idx = sections.findIndex(
        section => (section.chapter == target.chapter && section.section == target.section)
    );
    const prev_url = (function() {
        if(idx <= 0) return undefined;
        const prev = sections[idx - 1];
        return getSectionUrl(prev);
    })();
    const next_url = (function() {
        if(idx >= sections.length - 1) return undefined;
        const next = sections[idx + 1];
        return getSectionUrl(next);
    })();
    return {prev_url, next_url};
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
