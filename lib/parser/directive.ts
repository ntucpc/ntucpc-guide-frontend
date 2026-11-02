/* eslint-disable @typescript-eslint/no-explicit-any */
import { visit } from "unist-util-visit"
import { parseDirectiveLabel, removeDirectiveLabel } from "./util"

export function remarkNormalDirective() {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.type !== "containerDirective") return
            const directiveLabel = parseDirectiveLabel(node)

            const data = node.data || (node.data = {})
            if (["success", "info", "warning", "danger"].includes(node.name))
                data.hName = "Info"
            else if (["spoiler"].includes(node.name)) data.hName = "Spoiler"
            else return
            data.hProperties = { type: node.name, title: directiveLabel }
            removeDirectiveLabel(node)
        })
    }
}
