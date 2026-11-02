/* eslint-disable @typescript-eslint/no-explicit-any */
import { visit } from "unist-util-visit"

export function remarkProof() {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.type !== "containerDirective") return
            const type: string = node.name
            if (!["proof"].includes(type)) return

            const expanded = node.attributes.expanded ?? "false"
            const data = node.data || (node.data = {})

            data.hName = "Proof"
            data.hProperties = {
                expanded: expanded,
            }
        })
    }
}
