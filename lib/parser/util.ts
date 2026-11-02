/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Preprocess raw MDX source before handing it to the MDX parser:
 * strip HTML comments (MDX does not support them) and escape math mode.
 */
export function preprocessMdx(content: string) {
    // https://github.com/stevemao/html-comment-regex
    const HTMLCommentRegex = /<!--([\s\S]*?)-->/g
    return escapeMathMode(content.replaceAll(HTMLCommentRegex, ""))
}

export function escapeMathMode(content: string) {
    enum math {
        none,
        inline,
        display,
    }
    let result = ""
    let mathMode = math.none

    const toggleDisplayMode = () => {
        if (mathMode == math.display) mathMode = math.none
        else if (mathMode == math.none) mathMode = math.display
        else
            throw Error(
                "Display math mode should not lie inside inline math mode."
            )
    }
    const toggleInlineMode = () => {
        if (mathMode == math.inline) mathMode = math.none
        else if (mathMode == math.none) mathMode = math.inline
    }

    for (let i = 0; i < content.length; ) {
        switch (content[i]) {
            case "$":
                if (content.substring(i, i + 2) == "$$") {
                    toggleDisplayMode()
                    i += 2
                    result += "$$"
                } else {
                    toggleInlineMode()
                    i += 1
                    result += "$"
                }
                break

            case "\\":
                if (mathMode != math.none) {
                    if (content.substring(i, i + 3) == "\\\\]") {
                        toggleDisplayMode()
                        result += content.substring(i, i + 3)
                        i += 3
                    } else {
                        result += "\\\\"
                        i += 1
                    }
                } else {
                    if (content.substring(i, i + 3) == "\\\\[") {
                        toggleDisplayMode()
                        result += content.substring(i, i + 3)
                        i += 3
                    } else {
                        result += content[i]
                        result += content[i + 1]
                        i += 2
                    }
                }
                break

            case "<":
            case ">":
            case "}":
            case "{":
            case "_":
                if (mathMode != math.none) result += "\\" + content[i]
                else result += content[i]
                i += 1
                break

            default:
                result += content[i]
                i += 1
        }
    }
    return result
}

/**
 * Returns directive label if it exists for a given node.
 * Also remove that label node.
 */
export function parseDirectiveLabel(node: any) {
    if (node.children.length == 0) return
    const firstChild = node.children[0]
    if (
        firstChild.data === undefined ||
        firstChild.data.directiveLabel !== true
    )
        return
    const directiveLabel = firstChild.children[0].value

    return directiveLabel
}

export function removeDirectiveLabel(node: any) {
    if (parseDirectiveLabel(node) !== undefined)
        node.children = node.children.slice(1)
}

export function getAttribute(node: any, key: string): string | undefined {
    let found = undefined
    node.attributes.forEach((attribute: any) => {
        if (attribute.name === key) {
            found = attribute.value
            return
        }
    })
    return found
}

export function pushAttribute(
    attribute: Array<any>,
    name: string,
    value: string
) {
    attribute.push({
        type: "mdxJsxAttribute",
        name: `${name}`,
        value: `${value}`,
    })
}

export function setAttribute(node: any, attributes: { [key: string]: string }) {
    const attribute = (node.attributes = Array<any>())
    Object.keys(attributes).forEach((key) => {
        pushAttribute(attribute, key, attributes[key])
    })
}
