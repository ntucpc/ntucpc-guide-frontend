import path from 'path';

import { Dirent, existsSync, readdirSync, readFileSync } from 'fs';
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';
import { getGuideRoot } from '../environment';
import { findChapter } from './chapters';
import { Article } from './type';

const ARTICLE_PATH = path.join(getGuideRoot(), "content");
const CHAPTER_PATH = path.join(getGuideRoot(), "chapters");

export function getArticleDirectory(code: string): string {
    const [topic, article] = code.split("/")
    return path.join(ARTICLE_PATH, topic, article)
}
export function getArticleConfigPath(code: string): string {
    return path.join(getArticleDirectory(code), "config.json")
}
export function getArticleMdxPath(code: string): string {
    const [topic, article] = code.split("/")
    return path.join(getArticleDirectory(code), `${article}.mdx`)
}

const articles = (() => {
    const topicDirs = readdirSync(ARTICLE_PATH, { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
    const articles: Article[] = []
    for (const topicDir of topicDirs) {
        const topic = topicDir.name
        const articleDirs = readdirSync(path.join(ARTICLE_PATH, topic), { withFileTypes: true })
            .filter((dir) => dir.isDirectory())
        for (const articleDir of articleDirs) {
            const articleCode = articleDir.name
            const code = `${topic}/${articleCode}`
            const configPath = getArticleConfigPath(code)
            if (!existsSync(configPath)) continue
            const config = readConfig(configPath);
            const chapterObj = findChapter(code)
            const importance =
                !config.importance || config.importance === '-' ?
                    0 : config.importance as number
            articles.push({
                code: code,
                article: articleCode,
                topic: topic,
                chapter: chapterObj?.code ?? null,
                valid: existsSync(getArticleMdxPath(code)),
                title: config.title ?? articleCode,
                authors: config.authors ?? [],
                contributors: config.contributors ?? [],
                prerequisites: config.prerequisites ?? [],
                description: config.description ?? "????",
                coming: config.coming ?? false,
                importance: importance,
            });
        }
    }
    return articles;
})()

export function getArticles() {
    return articles
}

export function getArticle(code: string) {
    for (const article of articles) {
        if (article.code === code) return article
    }
    throw Error(`Article ${code} doesn't exist`)
}