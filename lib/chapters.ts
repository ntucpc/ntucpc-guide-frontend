import path from 'path';

import { Dirent, existsSync, readdirSync, readFileSync } from 'fs';
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';
import { getGuideRoot } from './environment';
import { getTopic, VirtualTopic } from './topics';
import { getVirtualArticle } from './articles';

const ARTICLE_PATH = path.join(getGuideRoot(), "content");
const CHAPTER_PATH = path.join(getGuideRoot(), "chapters");

export type Chapter = {
    code: string;
    title: string;
    contents: string[];
};

export type VirtualChapter = {
    code: string
    displayTitle: string
    topics: VirtualTopic[]
}

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

export function getFullChapterStructure(): VirtualChapter[] {
    return chapters.map((chapter) => {
        const topics: VirtualTopic[] = []
        for (const articleFullCode of chapter.contents) {
            const article = getVirtualArticle(articleFullCode)
            const topicCode = article.topicCode
            if (topics.length === 0 || topics.at(-1)?.code !== topicCode) {
                topics.push({
                    code: topicCode,
                    displayTitle: article.topicDisplayTitle,
                    articles: []
                })
            }
            topics.at(-1)?.articles.push(getVirtualArticle(articleFullCode))
        }
        return {
            code: chapter.code,
            displayTitle: chapter.title,
            topics: topics
        }
    })
}