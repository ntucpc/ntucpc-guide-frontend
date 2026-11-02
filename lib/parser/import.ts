/* eslint-disable @typescript-eslint/no-explicit-any */
import { visit } from "unist-util-visit"
import { getAllAttribute } from "./util"

export function remarkImport(importList: string[]) {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.attributes === undefined) return
            // I don't know why some containerDirective has attributes = {}
            if (!Array.isArray(node.attributes)) return
            // console.log(node)
            // console.log(node.attributes);
            const importPath = getAllAttribute(node, "importMdx")
            importPath!.forEach((element) => {
                importList.push(element)
            })
        })
    }
}
