import { getArticle, getArticles } from "./articles"
import { getChapters } from "./chapters"
import { Structure } from "./client"
import { getTopicGroups, getTopics } from "./topics"
import { Article, ArticleGroup, Chapter, StructureData, Topic, TopicGroup } from "./type"

export function getStructure(): StructureData {
    return {
        articles: getArticles(),
        topics: getTopics(),
        topicGroups: getTopicGroups(),
        chapters: getChapters(),
    }
}

export function getChapterArticleGroups(chapter: Chapter): ArticleGroup[] {
    // make groups according to topics
    const groups: ArticleGroup[] = []
    let lastTopic = undefined
    for (const articleCode of chapter.contents) {
        const article = getArticle(articleCode)
        if (article.topic !== lastTopic) {
            lastTopic = article.topic
            groups.push({ code: lastTopic, articles: [] })
        }
        groups.at(-1)!.articles.push(article)
    }
    return groups
}

export function getTopicArticleGroups(topic: Topic) {
    const groups: ArticleGroup[] = []
    let lastChapter = undefined
    const unknownChapter = []
    for (const articleCode of topic.contents) {
        const article = getArticle(articleCode)
        if (!article.chapter) {
            unknownChapter.push(article)
            continue
        }
        if (article.chapter !== lastChapter) {
            lastChapter = article.chapter
            groups.push({ code: lastChapter, articles: []})
        }
        groups.at(-1)!.articles.push(article)
    }
    if (unknownChapter.length > 0) {
        groups.push({code: "unknown", articles: unknownChapter})
    }
    return groups
}