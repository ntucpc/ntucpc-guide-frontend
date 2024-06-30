import path from 'path';

import getEnvironmentVariable from 'lib/environment';
import { Dirent, existsSync, readdirSync, readFileSync } from 'fs';
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';

const ARTICLE_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "content");
const CHAPTER_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "chapters");

export type Article = {
    code: string; // Guide/welcome
    topic: string; // Guide
    article: string; // welcome
    title: string;
    authors: string[];
    contributors: string[];
    description: string[];
    prerequisites: string[];
};

const articles = (() => {
    const topicDirs = readdirSync(ARTICLE_PATH, {withFileTypes: true})
            .filter((dir) => dir.isDirectory());
    const articles: Article[] = []
    for (const topicDir of topicDirs) {
        const topic = topicDir.name;
        const articleDirs = readdirSync(path.join(ARTICLE_PATH, topic), {withFileTypes: true})
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