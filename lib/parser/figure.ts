/* eslint-disable @typescript-eslint/no-explicit-any */
import { visit } from "unist-util-visit"

export function remarkFigure(
    directory: string,
    getFigurePath: (directory: string, name: string) => string
) {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.name !== "figure") return
            for (const attribute of node.attributes) {
                if (attribute.name === "src") {
                    const figurePath = getFigurePath(directory, attribute.value)
                    attribute.value = figurePath
                }
            }
        })
    }
}
