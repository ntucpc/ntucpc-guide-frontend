import path from 'path'

import { Dirent, existsSync, readdirSync, readFileSync } from 'fs'
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser'
import { getGuideRoot } from '../environment'
import { Chapter } from './type'

const ARTICLE_PATH = path.join(getGuideRoot(), "content")
const CHAPTER_PATH = path.join(getGuideRoot(), "chapters")

const chapters: Chapter[] = (() => {
    const config = readConfig(path.join(CHAPTER_PATH, "chapters.json"))
    const chapters: Chapter[] = []
    for (const chapter of config["chapters"]) {
        const chapterFilePath = path.join(CHAPTER_PATH, `${chapter}.json`)
        if (!existsSync(chapterFilePath)) {
            console.log(`Warning: invalid chapter ${chapter}`)
            continue
        }
        const chapterConfig = readConfig(chapterFilePath)
        chapters.push({
            code: chapter,
            ...chapterConfig
        })
    }
    return chapters
})()

export function getChapters() {
    return chapters
}

export function getChapter(code: string) {
    for (const chapter of chapters) {
        if (chapter.code === code) return chapter
    }
    throw Error(`Chapter ${code} doesn't exist`)
}

export function findChapter(content: string) {
    for (const chapter of chapters) {
        if (chapter.contents.includes(content)) {
            return chapter
        }
    }
    return undefined
}