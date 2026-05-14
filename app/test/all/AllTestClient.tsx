"use client"
import { ContentBody, PageFooter } from "@/components/layout";
import { NavBar } from "@/components/navbar";
import { parseStructure } from "@/lib/structure/client";
import { StructureData } from "@/lib/structure/type";
import { H1Title, HyperRef, Table, TableBody, TableCell, TableHead, TableRow } from "@/ntucpc-website-common-lib/components/basic";
import { useState } from "react";

type ArticleProps = {
    code: string
    chapterIndex: [number, number]
    topicIndex: [number, number]
}

type Props = {
    articles: ArticleProps[]
    structure: StructureData
}

export default function AllTestPage({ articles, structure: structureData }: Props) {
    const structure = parseStructure(structureData)
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
    
    const sortedArticles = [...articles].sort((a, b) => compKey(getSortKey(a), getSortKey(b)))

    let number = 0
    return (
        <>
            <NavBar />
            <ContentBody maxWidth="5xl">
                <H1Title>
                    全部東西
                </H1Title>

                <div className="mb-4">
                    排序模式：
                    <select 
                        value={sortBy} 
                        onChange={(event) => { setSortBy(event.target.value) }}
                        className="ml-2 p-1 border rounded"
                    >
                        <option value="chapter">章節</option>
                        <option value="topic">主題</option>
                    </select>
                </div>

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
                                sortedArticles.map((article) => {
                                    return <TableRow key={article.code}>
                                        <TableCell>{++number}</TableCell>
                                        <TableCell>{structure.getArticleChapterTitle(article.code)} ({article.chapterIndex.join(".")})</TableCell>
                                        <TableCell>{structure.getArticleTopicTitle(article.code)} ({article.topicIndex.join(".")})</TableCell>
                                        <TableCell><HyperRef href={`/${article.code}`}>{structure.getArticleTitle(article.code)}</HyperRef></TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
                <PageFooter />
            </ContentBody>
        </>
    )
}
