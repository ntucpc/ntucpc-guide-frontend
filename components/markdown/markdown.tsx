import { readFile } from "fs/promises"
import path from "path"
import { escapeMathMode } from "@/ntucpc-website-common-lib/mdx-parser/util"
import remarkDirective from "remark-directive"
import { remarkNormalDirective } from "@/ntucpc-website-common-lib/mdx-parser/directive"
import { remarkTheorem } from "@/ntucpc-website-common-lib/mdx-parser/theorem"
import { remarkProof } from "@/ntucpc-website-common-lib/mdx-parser/proof"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import rehypeRewrite from 'rehype-rewrite'
import { compileMDX } from "next-mdx-remote/rsc"
import { getCommonLibComponents } from "@/ntucpc-website-common-lib/components"
import { ContentReference } from "./content-reference"
import { remarkContentReference } from "@/lib/parser/content-reference"
import { remarkProblem } from "@/lib/parser/problem"
import { Problem } from "./problem"
import { remarkRefcode } from "@/ntucpc-website-common-lib/mdx-parser/refcode"
import { getGuideRoot, getPublicRoot } from "@/lib/environment"
import { remarkFigure } from "@/ntucpc-website-common-lib/mdx-parser/figure"

export async function ArticleMarkdown({ source, depthLimit }: { source: string, depthLimit: number }) {
    if (depthLimit < 0) {
        throw new Error("Nested markdown depth limit exceeded")
    }
    let mdxRaw = await readFile(source, { encoding: "utf-8" })

    // remove HTML comment prior to mdx process since mdx happens to not support it
    // https://github.com/stevemao/html-comment-regex
    const HTMLCommentRegex = /<!--([\s\S]*?)-->/g
    mdxRaw = mdxRaw.replaceAll(HTMLCommentRegex, "")
    const directory = path.dirname(source)

    mdxRaw = escapeMathMode(mdxRaw)
    const getFigurePath = (directory: string, name: string) => {
        return path.join("/", directory.replace(getGuideRoot(), getPublicRoot()), "figure", name)
    }
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
                    [remarkRefcode, directory, source, {refcodeIndent: 4, refcodeIndentWarning: true}],
                    [remarkFigure, directory, getFigurePath],
                    remarkGfm,
                    remarkContentReference,
                    remarkProblem,
                ],
                rehypePlugins: [
                    [rehypeRewrite, { // Rewrite elements to start from upper case to fit the constraint of React
                        rewrite: (node: any) => {
                            if (node.type == 'mdxJsxFlowElement' || node.type == 'mdxJsxTextElement') {
                                if (['figure', 'problem', 'refcode'].includes(node.name)) {
                                    const first = node.name[0].toUpperCase()
                                    node.name = first + node.name.slice(1)
                                }
                            }
                        }
                    }],
                ],
                format: 'mdx',
            },
        },
        components: {
            ...getCommonLibComponents(),
            ContentReference: ContentReference,
            Problem: Problem(depthLimit - 1, ArticleMarkdown)
        }
    })
    return <>
        {content}
    </>
}