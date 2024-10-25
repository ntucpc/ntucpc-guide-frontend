import { ContentBody, Layout } from "@/components/layout";
import { Problem, ProblemOccur, getProblemOccurs, getProblems } from "@/lib/problems";
import { getStructure } from "@/lib/structure";
import { parseStructure } from "@/lib/structure/client";
import { StructureData } from "@/lib/structure/type";
import { H1Title, HyperRef, HyperRefBlank, Table, TableBody, TableCell, TableHead, TableRow, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { getGAId } from "@/ntucpc-website-common-lib/lib/environments";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ReactNode, useState } from "react";

type ProblemProps = {
    problem: Problem
    occurs: ProblemOccur[]
}
type Props = {
    problems: ProblemProps[]
    structure: StructureData
    gaId: string
}

export const getStaticProps: GetStaticProps<{props: Props}> = async ({ params }) => {
    const problemOccurs = await getProblemOccurs()
    const problems: ProblemProps[] = getProblems().map((problem) => {return {
        problem: problem,
        occurs: problemOccurs.get(problem.code)!
    }})

    const props = {
        problems: problems,
        structure: getStructure(),
        gaId: getGAId()
    }
    return { props: { props } }
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {

    const structure = parseStructure(props.structure)
    let number = 0
    return <Layout title="題目" gaId={props.gaId}>
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
                                        href={`/${occur.article}`}>
                                        {structure.getArticleTitle(occur.article)}({occur.difficulty})
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