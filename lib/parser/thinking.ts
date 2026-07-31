import { visit } from 'unist-util-visit'

export function remarkThinking() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (tree: any) {
        visit(tree, function(node) {
            if (node.type != "containerDirective") return
            const data = node.data || (node.data = {})
            if (node.name === "thinking")
                data.hName = "Thinking"
            else if (node.name === "thinking-answer")
                data.hName = "ThinkingAnswer"
            else return
            data.hProperties = { "type": node.name }
        })
    }
}