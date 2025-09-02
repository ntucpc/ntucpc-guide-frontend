/**
 * A data structure representing an article.
 * 
 * After the coming feature is added, there should not be any non-existing article
 * referred by chapters or topics.
 */
export type Article = {
    code: string // full article code, e.g., Introductoin/welcome
    article: string // article code, e.g., welcome
    topic: string // topic code, e.g., Introduction
    chapter: string | null // chapter code, e.g. I, null if the article doesn't belong to any chapter
    valid: boolean // whether the article has .mdx, deprecated
    // article settings
    title: string // default: ""
    authors: string[] // default: []
    contributors: string[] // default: []
    prerequisites: string[] // default: []
    description: string[] // default: "????"
    coming: boolean // default: false, should the article be shown as coming soon in tables of contents
    importance: number // default: 0
}

export type Topic = {
    code: string // topic code
    title: string // title
    contents: string[] // in full article code
    description: string // default: "????"
}
export type TopicGroup = {
    single: boolean
    title: string // "" if single
    topics: string[] // in topic code
}

export type Chapter = {
    code: string
    // Chapter ${number}. ${title}
    number: string
    title: string
    contents: string[] // in full article code
    icon: string // icon svg name, default: "nothing"
    iconColor: string // icon color, default: ""
    description: string // summary displayed in toc, default: "????"
}

export type StructureData = {
    articles: Article[]
    topics: Topic[]
    topicGroups: TopicGroup[]
    chapters: Chapter[]
}