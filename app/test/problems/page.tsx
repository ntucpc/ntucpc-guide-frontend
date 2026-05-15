import { ContentBody, PageFooter } from "@/components/layout"
import { NavBar } from "@/components/navbar"
import { getProblemOccurs, getProblems } from "@/lib/problems"
import { getStructure } from "@/lib/structure"
import { parseStructure } from "@/lib/structure/client"
import {
    H1Title,
    HyperRefBlank,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/ntucpc-website-common-lib/components/basic"
import { ReactNode } from "react"
import { composeMetadata } from "@/lib/util"

export const metadata = composeMetadata("題目")

export default async function ProblemsTestPage() {
    const problemOccurs = await getProblemOccurs()
    const problems = getProblems().map((problem) => {
        return {
            problem: problem,
            occurs: problemOccurs.get(problem.code)!,
        }
    })
    const structureData = getStructure()
    const structure = parseStructure(structureData)

    let number = 0
    return (
        <>
            <NavBar />
            <ContentBody maxWidth="fit">
                <H1Title>題目</H1Title>

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
                            {problems.map((p) => {
                                const problem = p.problem
                                const occurs: ReactNode[] = []
                                let index = 0
                                p.occurs.forEach((occur) => {
                                    occurs.push(
                                        <HyperRefBlank
                                            key={index++}
                                            href={`/${occur.article}`}
                                        >
                                            {structure.getArticleTitle(
                                                occur.article
                                            )}
                                            ({occur.difficulty})
                                        </HyperRefBlank>
                                    )
                                    occurs.push(<span key={index++}>、</span>)
                                })
                                if (occurs.length > 0) occurs.pop()

                                return (
                                    <TableRow key={problem.code}>
                                        <TableCell>{++number}</TableCell>
                                        <TableCell>{problem.code}</TableCell>
                                        <TableCell>{problem.name}</TableCell>
                                        <TableCell>
                                            {problem.url ? (
                                                <HyperRefBlank
                                                    href={problem.url}
                                                >
                                                    {problem.source}
                                                </HyperRefBlank>
                                            ) : (
                                                <>{problem.source}</>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-nowrap">
                                            {occurs}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
                <PageFooter />
            </ContentBody>
        </>
    )
}
