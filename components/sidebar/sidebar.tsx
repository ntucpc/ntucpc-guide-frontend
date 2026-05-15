import { getChapterArticleGroups, getTopicArticleGroups } from "@/lib/structure"
import { getChapter, getChapters } from "@/lib/structure/chapters"
import { Article, Chapter, Topic } from "@/lib/structure/type"
import {
    SidebarCategory,
    SidebarGroup,
    SidebarItem,
    SidebarSection,
} from "./types"
import { SidebarClient } from "./sidebar-client"
import { getTopic, getTopics } from "@/lib/structure/topics"

export function Sidebar() {
    const categories: SidebarCategory[] = []

    // Chapters
    const chapterSections: SidebarSection[] = []
    const chapterMapping = new Map<string, string>()
    getChapters().forEach((chapter: Chapter) => {
        const groups: SidebarGroup[] = []
        getChapterArticleGroups(chapter).forEach((group) => {
            const items: SidebarItem[] = []
            group.articles.forEach((article: Article) => {
                items.push({
                    id: article.code,
                    title: article.title,
                    url: "/" + article.code,
                    coming: article.coming,
                })
                chapterMapping.set(article.code, chapter.code)
            })
            groups.push({
                id: group.code,
                title: getTopic(group.code).title,
                items: items,
            })
        })
        chapterSections.push({
            id: chapter.code,
            title: chapter.number + ". " + chapter.title,
            groups: groups,
        })
    })
    categories.push({
        id: "chapter",
        title: "章節目錄",
        short: "章節",
        sections: chapterSections,
    })

    //Topic
    const topicSections: SidebarSection[] = []
    getTopics().forEach((topic: Topic) => {
        const groups: SidebarGroup[] = []
        getTopicArticleGroups(topic).forEach((group) => {
            const items: SidebarItem[] = []
            group.articles.forEach((article: Article) => {
                items.push({
                    id: article.code,
                    title: article.title,
                    url: "/" + article.code,
                    coming: article.coming,
                })
            })
            let groupTitle = "未知章節"
            if (group.code !== "unknown") {
                const chapter = getChapter(group.code)
                groupTitle = `${chapter.number}. ${chapter.title}`
            }
            groups.push({
                id: group.code,
                title: groupTitle,
                items: items,
            })
        })
        topicSections.push({
            id: topic.code,
            title: topic.title,
            groups: groups,
        })
    })
    categories.push({
        id: "topic",
        title: "主題目錄",
        short: "主題",
        sections: topicSections,
    })

    return (
        <SidebarClient
            categories={categories}
            chapterMapping={
                Object.fromEntries(chapterMapping) as Record<string, string>
            }
        />
    )
}
