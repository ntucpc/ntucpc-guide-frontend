import { ContentBody, Layout } from "@/components/layout";
import { VirtualArticle, getArticles, getVirtualArticle } from "@/lib/articles";
import { findChapter, getChapters, getFullChapterStructure } from "@/lib/chapters";
import { getFullTopicStructure, getTopic, getTopicGroups } from "@/lib/topics";
import { H1Title, HyperRef, Table, TableBody, TableCell, TableHead, TableRow, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useState } from "react";

type ArticleProps = {
    code: string
    virtualArticle: VirtualArticle
    chapterIndex: [number, number]
    topicIndex: [number, number]
}
type Props = {
    articles: ArticleProps[]
}

export const getStaticProps: GetStaticProps<{props: Props}> = async ({ params }) => {
    
    const articles: ArticleProps[] = getArticles().map((article) => {
        const virtualArticle = getVirtualArticle(article.code)
        return {
            code: article.code,
            virtualArticle: virtualArticle,
            chapterIndex: (() => {
                const index = getChapters().findIndex((chapter) => chapter.code === virtualArticle.chapterCode)
                if (index === -1) return [-1, -1]
                const chapter = getChapters()[index]
                const subIndex = chapter.contents.findIndex((content) => content === article.code)
                return [index, subIndex]
            })(),
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
                const topic = getTopic(article.topic)
                if (!ok || !topic) return [-1, -1]
                const subIndex = topic.contents.findIndex((content) => content === article.article)
                return [index, subIndex]
            })()
        }
    })

    const props = {
        articles: articles
    }
    return { props: { props } }
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {

    const [sortBy, setSortBy] = useState("chapter")
    const getSortKey = (article: ArticleProps) => {
        if (sortBy === "chapter") return article.chapterIndex
        else if (sortBy === "topic") return article.topicIndex
        else throw Error()
    }
    const compKey = (a: [number, number], b: [number, number]) => {
        if (a[0] !== b[0]) return a[0] > b[0] ? 1 : -1
        return a[1] > b[1] ? 1 : -1
    }
    const articles = props.articles
    articles.sort((a, b) => compKey(getSortKey(a), getSortKey(b)))

    let number = 0
    return <Layout title="全部東西">
        <ContentBody maxWidth="5xl">
            <H1Title>
                全部東西
            </H1Title>

            排序模式：
            <select value={sortBy} onChange={(event) => { setSortBy(event.target.value) }}>
                <option value="chapter">章節</option>
                <option value="topic">主題</option>
            </select>

            <div className="overflow-x-auto">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> # </TableCell>
                            <TableCell> 章節 </TableCell>
                            <TableCell> 主題 </TableCell>
                            <TableCell> 標題 </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            articles.map((article) => {
                                return <TableRow key={article.code}>
                                    <TableCell>{++number}</TableCell>
                                    <TableCell>{article.virtualArticle.chapterDisplayTitle} ({article.chapterIndex.join(".")})</TableCell>
                                    <TableCell>{article.virtualArticle.topicDisplayTitle} ({article.topicIndex.join(".")})</TableCell>
                                    <TableCell><HyperRef href={`/${article.code}`}>{article.virtualArticle.article!.title}</HyperRef></TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </ContentBody>
    </Layout>
};