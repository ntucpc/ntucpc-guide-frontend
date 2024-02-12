import path from 'path';

import getEnvironmentVariable from 'lib/environment';
import { readdirSync } from 'fs';

const ARTICLE_PATH = path.join(process.cwd(), getEnvironmentVariable('CONTENTS_RELATIVE_PATH'));


export type ChapterType = {
    name: string;
    sections: SectionType[];
};
export type SectionType = {
    chapter: string;
    section: string;
}

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
                })),
        });
    }
    return ret;
})();

export function getChapters() {
    return chapters;
}

export function getChapterNames() {
    return chapters.map(chapter => chapter.name);
}

export function getSectionNames(chapter_name?: string) {
    return chapters
        .filter(chapter => (chapter_name === undefined || chapter_name === chapter.name))
        .map(chapter => chapter.sections)
        .reduce((acc, cur) => acc.concat(cur), []);
}
