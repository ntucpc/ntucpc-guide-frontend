import path from 'path';

import getEnvironmentVariable from 'lib/environment';
import { Dirent, existsSync, readdirSync, readFileSync } from 'fs';
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';

const ARTICLE_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "content");
const CHAPTER_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "chapters");

export type Chapter = {
    code: string;
    title: string;
    contents: string[];
};

const chapters: Chapter[] = (() => {
    const config = readConfig(path.join(CHAPTER_PATH, "chapters.json"));
    const chapters: Chapter[] = []
    for (const chapter of config["chapters"]) {
        const chapterFilePath = path.join(CHAPTER_PATH, `${chapter}.json`);
        if (!existsSync(chapterFilePath)) {
            console.log(`Warning: invalid chapter ${chapter}`);
            continue;
        }
        const chapterConfig = readConfig(chapterFilePath);
        chapters.push({
            code: chapter,
            ...chapterConfig
        });
    }
    return chapters;
})();

export function getChapters() {
    return chapters;
}

export function getChapter(code: string) {
    for (const chapter of chapters) {
        if (chapter.code === code) return chapter;
    }
    return undefined;
};

export function findChapter(content: string) {
    for (const chapter of chapters) {
        if (chapter.contents.includes(content)) {
            return chapter;
        }
    }
    return undefined;
}