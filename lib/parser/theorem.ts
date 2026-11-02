/* eslint-disable @typescript-eslint/no-explicit-any */
import { visit } from "unist-util-visit"
import {
    getAttribute,
    parseDirectiveLabel,
    removeDirectiveLabel,
    setAttribute,
} from "./util"

const THEOREMS = [
    "lemma",
    "theorem",
    "definition",
    "corollary",
    "observation",
    "tips",
]

type TheoremObject = {
    number: string
    title: string
}

export function remarkTheorem() {
    return function (tree: any) {
        const theoremCounter: { [type: string]: number } = {}
        const idMap: { [type: string]: { [id: string]: TheoremObject } } = {}
        THEOREMS.forEach((type) => {
            theoremCounter[type] = 0
            idMap[type] = {}
        })
        visit(tree, function (node) {
            if (node.type !== "containerDirective") return
            const directiveLabel = parseDirectiveLabel(node)
            const type: string = node.name
            if (!THEOREMS.includes(type)) return
            removeDirectiveLabel(node)

            const id = node.attributes.id
            const data = node.data || (node.data = {})

            data.hName = "Theorem"
            theoremCounter[type]++
            const number = theoremCounter[type]
            idMap[type][id] = {
                number: number.toString(),
                title: directiveLabel,
            }

            data.hProperties = {
                type: node.name,
                title: directiveLabel,
                refId: id,
                number: number,
            }
        })
        visit(tree, function (node) {
            if (
                node.type != "mdxJsxFlowElement" &&
                node.type != "mdxJsxTextElement"
            )
                return
            if (node.name != "reference") return
            const type: string = getAttribute(node, "type")!
            if (!THEOREMS.includes(type)) return
            node.name = "TheoremReference"
            const id: string = getAttribute(node, "id")!
            const mode: string = getAttribute(node, "mode") ?? "default" // number, title, full
            setAttribute(node, {
                type: type,
                refId: id,
                number: idMap[type][id]?.number,
                title: idMap[type][id]?.title,
                mode: mode,
            })
        })
    }
}
