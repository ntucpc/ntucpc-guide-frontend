import { getTopic } from "@/lib/structure/topics"
import { Article, Chapter, Topic } from "@/lib/structure/type"
import { SITE_NAME } from "@/lib/site"
import { plainDescription } from "@/lib/util"

/** Page title of an article, with its topic so that articles sharing a name stay distinguishable */
export function articlePageTitle(article: Article): string {
    const topic = getTopic(article.topic)
    // e.g. Introduction/competitive_programming has the same title as its topic
    if (topic.title === article.title) return article.title
    return `${article.title} - ${topic.title}`
}

export function chapterPageTitle(chapter: Chapter): string {
    return `Chapter ${chapter.number}. ${chapter.title}`
}

/* Descriptions, falling back to a generated one when the guide data has none */

export function articleDescription(article: Article): string {
    const topic = getTopic(article.topic)
    return (
        plainDescription(article.description) ??
        `「${article.title}」是 ${SITE_NAME}「${topic.title}」主題的程式競賽教學文章。`
    )
}

export function topicDescription(topic: Topic): string {
    return (
        plainDescription(topic.description) ??
        `${SITE_NAME}「${topic.title}」主題的程式競賽教學文章列表。`
    )
}

export function chapterDescription(chapter: Chapter): string {
    return (
        plainDescription(chapter.description) ??
        `${SITE_NAME}「${chapterPageTitle(
            chapter
        )}」章節的程式競賽教學文章列表。`
    )
}
