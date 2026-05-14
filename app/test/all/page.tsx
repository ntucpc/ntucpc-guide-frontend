import { getArticles } from "@/lib/structure/articles";
import { getChapters } from "@/lib/structure/chapters";
import { getTopic, getTopicGroups } from "@/lib/structure/topics";
import { getStructure } from "@/lib/structure";
import AllTestPageClient from "./AllTestClient";
import { composeMetadata } from "@/lib/util";

export const metadata = composeMetadata("全部東西")

export default async function AllTestPage() {
    const articles = getArticles().map((article) => {
        return {
            code: article.code,
            chapterIndex: (() => {
                const index = getChapters().findIndex((chapter) => chapter.code === article.chapter)
                if (index === -1) return [-1, -1]
                const chapter = getChapters()[index]
                const subIndex = chapter.contents.findIndex((content) => content === article.code)
                return [index, subIndex]
            })() as [number, number],
            topicIndex: (() => {
                let index = 0
                let ok = false
                getTopicGroups().forEach((topicGroup) => {
                    topicGroup.topics.forEach((topicCode) => {
                        if (topicCode === article.topic) ok = true
                        if (ok) return
                        index++
                    })
                })
                if (!ok) return [-1, -1]
                const topic = getTopic(article.topic)
                const subIndex = topic.contents.findIndex((content) => content === article.code)
                return [index, subIndex]
            })() as [number, number]
        }
    })

    const structure = getStructure()

    return <AllTestPageClient articles={articles} structure={structure} />
}
