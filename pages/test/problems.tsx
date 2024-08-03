import { ContentBody, Layout } from "@/components/layout";
import { VirtualArticle, getArticles, getVirtualArticle } from "@/lib/articles";
import { findChapter, getChapters, getFullChapterStructure } from "@/lib/chapters";
import { Problem, ProblemOccur, getProblemOccurs, getProblems } from "@/lib/problems";
import { getFullTopicStructure, getTopic, getTopicGroups } from "@/lib/topics";
import { H1Title, HyperRef, HyperRefBlank, Table, TableBody, TableCell, TableHead, TableRow, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ReactNode, useState } from "react";

type ProblemProps = {
    problem: Problem
    occurs: ProblemOccur[]
}
type Props = {
    problems: ProblemProps[]
}

export const getStaticProps: GetStaticProps<{props: Props}> = async ({ params }) => {
    const problemOccurs = await getProblemOccurs()
    const problems: ProblemProps[] = getProblems().map((problem) => {return {
        problem: problem,
        occurs: problemOccurs.get(problem.code)!
    }})

    const props = {
        problems: problems
    }
    return { props: { props } }
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {

    let number = 0
    return <Layout title="題目">
        <ContentBody maxWidth="fit">
            <H1Title>
                題目
            </H1Title>

            <div className="overflow-x-auto">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Path</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell>出現在哪</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.problems.map((problemProps) => {
                                const problem = problemProps.problem
                                const occurs: ReactNode[] = []
                                let index = 0
                                problemProps.occurs.forEach((occur) => {
                                    occurs.push(<HyperRefBlank key={index++}
                                        href={`/${occur.virtualArticle.code}`}>
                                        {occur.virtualArticle.articleDisplayTitle}({occur.difficulty})
                                    </HyperRefBlank>)
                                    occurs.push(<span key={index++}>、</span>)
                                })
                                if (occurs.length > 0) occurs.pop()

                                return <TableRow key={problem.code}>
                                    <TableCell>{++number}</TableCell>
                                    <TableCell>{problem.code}</TableCell>
                                    <TableCell>{problem.name}</TableCell>
                                    <TableCell>{problem.url ? <HyperRefBlank href={problem.url}>{problem.source}</HyperRefBlank> : <>{problem.source}</>}</TableCell>
                                    <TableCell className="text-nowrap">
                                        {occurs}
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </ContentBody>
    </Layout>
};