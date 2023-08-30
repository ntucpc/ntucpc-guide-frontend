import path from 'path';
import { readdir } from 'fs/promises'

import getEnvironmentVariable from 'lib/environment';

/* Remember to use for in then for of */
export interface ArticleDirectory {
    [chapter: string]: string[];
};

const ARTICLE_PATH = path.join(process.cwd(), getEnvironmentVariable('CONTENTS_RELATIVE_PATH'));

/*
 * Return the entries of articles in ./contents
 * 'chapter' is an optional argument specifying sections under it.
 */
export async function getArticles(): Promise<ArticleDirectory>;
export async function getArticles(chapter: string): Promise<string[]>;
export async function getArticles(chapter?: string): Promise<ArticleDirectory | string[]> {
    if (typeof chapter === 'undefined') {
        const ret: ArticleDirectory = {};
        try {
            const chapters = await readdir(ARTICLE_PATH);
            // Recursively invoke getArticles
            for (const chapter of chapters)
                ret[chapter] = await getArticles(chapter);
        } catch (err) {
            console.error(err);
        }
        return ret;
    }
    else {
        try {
            const sections = await readdir(path.join(ARTICLE_PATH, chapter), { withFileTypes: true });
            // Only returns directory (filters out config.json and other files)
            return sections.filter(dir => dir.isDirectory()).map(dir => dir.name);
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}