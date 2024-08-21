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

export function remarkSection(sections: Section[]) {
    return function(tree: any) {
        const currentNumber = [0, 0, 0, 0, 0, 0];
        visit(tree, function (node) {
            if (node.type != "heading") return;
            node.type = "mdxJsxFlowElement";
            const text = node.children[0].value;
            const depth = node.depth - 1;
            node.name = `h${depth + 1}`;
            for (let i = depth + 1; i < 6; i++) currentNumber[i] = 0;
            currentNumber[depth]++;
            const code = currentNumber.slice(0, depth + 1).join(".");
            setAttribute(node, {anchorId: `${code}`})
            sections.push({text: text, depth: depth, code: code});
        });
    }
}