import { readFile } from "fs/promises"
import path from "path"
import { preprocessMdx } from "@/lib/parser/util"
import remarkDirective from "remark-directive"
import { remarkNormalDirective } from "@/lib/parser/directive"
import { remarkTheorem } from "@/lib/parser/theorem"
import { remarkProof } from "@/lib/parser/proof"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import rehypeRewrite from "rehype-rewrite"
import { compileMDX, MDXRemote } from "next-mdx-remote/rsc"
import { getBasicComponents } from "@/components/basic"
import type { JSX, ReactElement } from "react"
import { Info } from "./info"
import { Spoiler } from "./spoiler"
import { Proof, Theorem, TheoremReference } from "./theorem"
import { Refcode } from "./refcode"
import { Figure } from "./figure"
import { ContentReference } from "./content-reference"
import { remarkContentReference } from "@/lib/parser/content-reference"
import { remarkProblem } from "@/lib/parser/problem"
import { Problem } from "./problem"
import { remarkRefcode } from "@/lib/parser/refcode"
import { getGuideRoot, getPublicRoot } from "@/lib/environment"
import { remarkFigure } from "@/lib/parser/figure"
import { remarkSection, Section } from "@/lib/parser/section"
import { remarkThinking } from "@/lib/parser/thinking"
import { Thinking, ThinkingAnswer } from "./thinking"

export async function getArticleContent(
    source: string,
    depthLimit: number
): Promise<{ content: ReactElement; headings: Section[] }> {
    if (depthLimit < 0) {
        throw new Error("Nested markdown depth limit exceeded")
    }
    const mdxRaw = preprocessMdx(await readFile(source, { encoding: "utf-8" }))
    const directory = path.dirname(source)
    const getFigurePath = (directory: string, name: string) => {
        return path.join(
            "/",
            directory.replace(getGuideRoot(), getPublicRoot()),
            "figure",
            name
        )
    }

    const headings: Section[] = []

    const { content } = await compileMDX({
        source: mdxRaw,
        options: {
            mdxOptions: {
                remarkPlugins: [
                    remarkDirective,
                    remarkNormalDirective,
                    remarkTheorem,
                    remarkProof,
                    remarkBreaks,
                    [
                        remarkRefcode,
                        directory,
                        source,
                        { refcodeIndent: 4, refcodeIndentWarning: true },
                    ],
                    [remarkFigure, directory, getFigurePath],
                    remarkGfm,
                    remarkContentReference,
                    remarkProblem,
                    [remarkSection, headings],
                    remarkThinking,
                ],
                rehypePlugins: [
                    [
                        rehypeRewrite,
                        {
                            // Rewrite elements to start from upper case to fit the constraint of React
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            rewrite: (node: any) => {
                                if (
                                    node.type == "mdxJsxFlowElement" ||
                                    node.type == "mdxJsxTextElement"
                                ) {
                                    if (
                                        [
                                            "figure",
                                            "problem",
                                            "refcode",
                                        ].includes(node.name)
                                    ) {
                                        const first = node.name[0].toUpperCase()
                                        node.name = first + node.name.slice(1)
                                    }
                                }
                            },
                        },
                    ],
                ],
                format: "mdx",
            },
        },
        components: {
            ...getBasicComponents(),
            Info: Info,
            Spoiler: Spoiler,
            Theorem: Theorem,
            Proof: Proof,
            TheoremReference: TheoremReference,
            Refcode: Refcode,
            Figure: Figure,
            ContentReference: ContentReference,
            Problem: Problem(depthLimit - 1, ArticleMarkdown),
            Thinking: Thinking,
            ThinkingAnswer: ThinkingAnswer,
        },
    })

    return { content, headings }
}

export async function ArticleMarkdown({
    source,
    depthLimit,
}: {
    source: string
    depthLimit: number
}): Promise<JSX.Element> {
    const { content } = await getArticleContent(source, depthLimit)
    return <>{content}</>
}

export async function SimpleMarkdown({ text }: { text: string }) {
    return <MDXRemote source={text} />
}
