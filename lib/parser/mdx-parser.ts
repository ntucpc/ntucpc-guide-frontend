/* eslint-disable @typescript-eslint/no-explicit-any */
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { escapeMathMode } from "./util"
import path from "path"
import remarkGfm from "remark-gfm"
import remarkDirective from "remark-directive"
import remarkBreaks from "remark-breaks"
import { remarkNormalDirective } from "./directive"
import { remarkTheorem } from "./theorem"
import rehypeRewrite from "rehype-rewrite"
import { RefcodeParameter, remarkRefcode } from "./refcode"
import { remarkFigure } from "./figure"
import { remarkImport } from "./import"
import { readFile } from "fs/promises"
import { remarkProof } from "./proof"

export type MdxParserPluginParameter = {
    getFigurePath?: (directory: string, name: string) => string
    refcodeParam?: RefcodeParameter
}

export async function parseMdx(
    mdxPath: string,
    maxRecursiveDepth: number = 1,
    extraPlugins: any[] = [],
    {
        getFigurePath = (directory, name) => {
            return path
                .join("/", directory, "figure", name)
                .replace(new RegExp("^/public"), "")
        },
        refcodeParam = {},
    }: MdxParserPluginParameter = {}
): Promise<Map<string, MDXRemoteSerializeResult>> {
    if (maxRecursiveDepth < 0) {
        throw new Error("Recursive depth limit exceeded")
    }

    let mdxRaw = await readFile(mdxPath, { encoding: "utf-8" })

    // remove HTML comment prior to mdx process since mdx happens to not support it
    // https://github.com/stevemao/html-comment-regex
    const HTMLCommentRegex = /<!--([\s\S]*?)-->/g
    mdxRaw = mdxRaw.replaceAll(HTMLCommentRegex, "")
    const directory = path.dirname(mdxPath)

    mdxRaw = escapeMathMode(mdxRaw)
    const importList: string[] = []

    const mdxContent = await serialize(mdxRaw, {
        mdxOptions: {
            remarkPlugins: [
                remarkDirective,
                remarkNormalDirective,
                remarkTheorem,
                remarkProof,
                remarkBreaks,
                [remarkRefcode, directory, mdxPath, refcodeParam],
                [remarkFigure, directory, getFigurePath],
                remarkGfm,
                ...extraPlugins,
                [remarkImport, importList],
            ],
            rehypePlugins: [
                [
                    rehypeRewrite,
                    {
                        // Rewrite elements to start from upper case to fit the constraint of React
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
                                        "reference",
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
    })

    const mdxMapping: Map<string, MDXRemoteSerializeResult> = new Map()
    mdxMapping.set(mdxPath, mdxContent)
    for (const importPath of importList) {
        const ret = await parseMdx(
            importPath,
            maxRecursiveDepth - 1,
            extraPlugins,
            { getFigurePath, refcodeParam }
        )
        ret.forEach((value, key) => {
            mdxMapping.set(key, value)
        })
    }

    return mdxMapping
}
