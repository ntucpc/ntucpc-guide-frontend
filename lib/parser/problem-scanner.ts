import { visit } from 'unist-util-visit'
import { getAttribute, parseDirectiveLabel, pushAttribute, removeDirectiveLabel, setAttribute } from '@/ntucpc-website-common-lib/mdx-parser/util';
import path from 'path';
import { getGuideRoot } from '../environment';
import { ProblemOccur, getProblem } from '../problems';
import { Article } from '../structure/type';

/**
 * Scan included problems in an article
 */
export function remarkProblemScan(addOccur: (problemCode: string, occur: ProblemOccur) => void, article: string) {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.name !== "problem") return;

            const source = getAttribute(node, "src")!;
            if (!getProblem(source)) return
            const difficulty = getAttribute(node, "difficulty") ?? "?";
            addOccur(source, {
                article: article,
                difficulty: difficulty
            })
        })
    }
}