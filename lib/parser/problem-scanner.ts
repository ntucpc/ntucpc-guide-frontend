import { visit } from "unist-util-visit"
import {
    getAttribute,
} from "@/ntucpc-website-common-lib/mdx-parser/util"
import { ProblemOccur, getProblem } from "../problems"

/**
 * Scan included problems in an article
 */
export function remarkProblemScan(
    addOccur: (problemCode: string, occur: ProblemOccur) => void,
    article: string
) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.name !== "problem") return

            const source = getAttribute(node, "src")!
            if (!getProblem(source)) return
            const difficulty = getAttribute(node, "difficulty") ?? "?"
            addOccur(source, {
                article: article,
                difficulty: difficulty,
            })
        })
    }
}
