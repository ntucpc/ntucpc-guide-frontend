import { visit } from "unist-util-visit"

export type Section = {
    text: string
    depth: number
    code: string
}

const BASE_DEPTH = 1

/**
 * A remark plugin to extract headings and assign IDs to them.
 *
 * @param sections An array to store the extracted sections.
 * @returns
 */
export function remarkSection(sections: Section[]) {
    return function (tree: any) {
        const currentPath: string[] = []
        visit(tree, "heading", function (node) {
            let text = ""
            visit(node, (n: any) => {
                if (n.type === "text" || n.type === "inlineCode") {
                    text += n.value
                }
            })

            const depth = node.depth - 1

            while (currentPath.length > depth) currentPath.pop()
            while (currentPath.length < depth) currentPath.push("")

            currentPath[depth] = text

            const code = currentPath.slice(BASE_DEPTH).join("-")

            // Assign ID to the heading node for anchor links
            if (!node.data) node.data = {}
            if (!node.data.hProperties) node.data.hProperties = {}

            // Standard id for CSS/HTML anchors
            node.data.hProperties.id = code
            // Custom refId for the heading component
            node.data.hProperties.refId = code

            sections.push({ text: text, depth: depth, code: code })
        })
    }
}
