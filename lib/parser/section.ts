import { visit } from 'unist-util-visit'
import { getAttribute, parseDirectiveLabel, pushAttribute, removeDirectiveLabel, setAttribute } from '@/ntucpc-website-common-lib/mdx-parser/util';
import path from 'path';
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';
import { existsSync } from 'fs';

export type Section = {
    text: string,
    depth: number,
    code: string
};

const BASE_DEPTH = 1
export function remarkSection(sections: Section[]) {
    return function(tree: any) {
        const currentPath: String[] = []
        visit(tree, function (node) {
            if (node.type != "heading") return
            node.type = "mdxJsxFlowElement"
            const text = node.children[0].value
            const depth = node.depth - 1
            node.name = `h${depth + 1}`
            while (currentPath.length > depth)
                currentPath.pop()
            while (currentPath.length < depth)
                currentPath.push("")
            currentPath.push(text)
            const code = currentPath.slice(BASE_DEPTH).join("-")
            console.log("code", code)
            setAttribute(node, {refId: `${code}`})
            sections.push({text: text, depth: depth, code: code})
        })
        console.log(sections)
    }
}