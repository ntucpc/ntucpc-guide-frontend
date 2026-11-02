/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path"
import { visit } from "unist-util-visit"
import { getAttribute, setAttribute } from "./util"
import { readFileSync } from "fs"

export type RefcodeParameter = {
    refcodeIndent?: number
    refcodeIndentWarning?: boolean
    checkIndentLanguages?: string[]
}

function checkCodeIndent(
    filename: string,
    code: string,
    lang: string,
    {
        refcodeIndent = 4,
        refcodeIndentWarning = false,
        checkIndentLanguages = ["cpp"],
    }: RefcodeParameter
): string {
    const space = " ".repeat(refcodeIndent)
    code = code.replaceAll("\t", space)
    if (!refcodeIndentWarning || !checkIndentLanguages.includes(lang))
        return code
    for (const line of code.split("\n")) {
        let spaceCount = 0
        while (spaceCount < line.length && line[spaceCount] === " ")
            spaceCount++
        if (
            spaceCount != 0 &&
            spaceCount < refcodeIndent &&
            spaceCount != line.length
        ) {
            console.log(`Warning: ${filename} has incorrect indentation`)
            return code
        }
    }
    return code
}

export function remarkRefcode(
    directory: string,
    mdxName: string,
    param: RefcodeParameter
) {
    const refcodeDirectory = path.join(directory, "refcode")
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.name == "refcode") {
                const source: string = getAttribute(node, "src")!
                const filename = path.join(refcodeDirectory, source)
                const lines = readFileSync(filename, {
                    encoding: "utf-8",
                }).split("\n")

                let start = getAttribute(node, "start") ?? 1
                start = +start
                let end = getAttribute(node, "end") ?? 99999
                end = +end
                const startFrom = getAttribute(node, "first-number") ?? "1"
                start--
                start = Math.max(0, start)
                end = Math.min(lines.length, end)
                let result = lines.slice(start, end).join("\n")
                const lang = source.split(".").pop() ?? "plaintext"
                result = checkCodeIndent(filename, result, lang, param)
                setAttribute(node, {
                    lang: lang,
                    lineno: "true",
                    code: result,
                    startFrom: startFrom,
                })
            } else if (node.type == "code") {
                let lang: string = node.lang ?? "plaintext"
                let lineno: string = "false"
                if (lang.endsWith("=")) {
                    lang = lang.slice(0, lang.length - 1)
                    lineno = "true"
                }
                node.type = "mdxJsxFlowElement"
                node.name = "refcode"
                checkCodeIndent(`code in ${mdxName}`, node.value, lang, param)
                setAttribute(node, {
                    lang: lang,
                    lineno: lineno,
                    code: node.value,
                    startFrom: "1",
                })
                node.children = []
                node.data = { _mdxExplicitJsx: true }
            }
        })
    }
}
