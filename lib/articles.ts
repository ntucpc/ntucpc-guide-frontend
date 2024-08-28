import path from 'path';

import { Dirent, existsSync, readdirSync, readFileSync } from 'fs';
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';
import { getGuideRoot } from './environment';
import { getTopic } from './topics';
import { findChapter } from './chapters';

const ARTICLE_PATH = path.join(getGuideRoot(), "content");
const CHAPTER_PATH = path.join(getGuideRoot(), "chapters");

export type Article = {
    code: string // Guide/welcome
    topic: string // Guide
    article: string // welcome
    title: string
    authors: string[]
    contributors: string[]
    prerequisites: string[]
    coming: boolean
};
export type VirtualArticle = {
    code: string
    topicCode: string
    articleCode: string
    chapterCode: string | null
    fullDisplayTitle: string
    topicDisplayTitle: string
    chapterDisplayTitle: string
    articleDisplayTitle: string
    article: Article | null
}

const articles = (() => {
    const topicDirs = readdirSync(ARTICLE_PATH, { withFileTypes: true })
        .filter((dir) => dir.isDirectory());
    const articles: Article[] = []
    for (const topicDir of topicDirs) {
        const topic = topicDir.name;
        const articleDirs = readdirSync(path.join(ARTICLE_PATH, topic), { withFileTypes: true })
            .filter((dir) => dir.isDirectory());
        for (const articleDir of articleDirs) {
            const article = articleDir.name;
            const configPath = path.join(path.join(articleDir.path, article), "config.json");
            if (!existsSync(configPath)) continue;
            const config = readConfig(configPath);
            articles.push({
                code: `${topic}/${article}`,
                topic: topic,
                article: article,
                title: "",
                authors: [],
                contributors: [],
                prerequisites: [],
                coming: false,
                ...config
            });
        }
    }
    return articles;
})();

export function getArticles() {
    return articles;
}

export function getArticle(code: string) {
    for (const article of articles) {
        if (article.code === code) return article;
    }
    return undefined;
}

export function getVirtualArticle(code: string): VirtualArticle {
    const [topicCode, articleCode] = code.split("/")
    const topicTitle = getTopic(topicCode)?.title ?? topicCode
    const articleObj = getArticle(code)
    const articleTitle = articleObj?.title ?? articleCode
    const chapter = findChapter(code)
    return {
        code: code,
        topicCode: topicCode,
        articleCode: articleCode,
        chapterCode: chapter?.code ?? null,
        fullDisplayTitle: `${topicTitle} / ${articleTitle}`,
        articleDisplayTitle: articleTitle,
        topicDisplayTitle: topicTitle,
        chapterDisplayTitle: chapter?.title ?? "Chapter ???",
        article: articleObj ?? null
    }
}