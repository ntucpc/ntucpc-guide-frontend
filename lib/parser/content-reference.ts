import { visit } from "unist-util-visit"
import {
    getAttribute,
    setAttribute,
} from "@/ntucpc-website-common-lib/mdx-parser/util"
import { getTopic } from "../structure/topics"
import { getArticle } from "../structure/articles"

export function remarkContentReference() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (tree: any) {
        visit(tree, function (node) {
            if (
                node.type != "mdxJsxFlowElement" &&
                node.type != "mdxJsxTextElement"
            )
                return
            if (node.name != "reference") return
            const type: string = getAttribute(node, "type")!
            if (type != "content") return
            const id: string = getAttribute(node, "id")!
            const mode = getAttribute(node, "mode") ?? "default"
            const topic = id.split("/")[0]
            const topicTitle = getTopic(topic)?.title ?? topic
            const articleTitle = getArticle(id)?.title ?? id
            setAttribute(node, {
                type: type,
                code: id,
                mode: mode,
                topicTitle: topicTitle,
                articleTitle: articleTitle,
            })
            node.name = "ContentReference"
        })
    }
}
