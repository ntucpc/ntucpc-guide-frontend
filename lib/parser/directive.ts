/**
 * @fileoverview Parse 'remark-directive' processed markdown directives.
 */

import { visit } from 'unist-util-visit'

/**
 * Returns directive label if it exists for a given node.
 * Also remove that label node.
 */
function parseDirectiveLabel(node: any)
{
    if (node.children.length == 0) return;
    let firstChild = node.children[0];
    if (firstChild.data === undefined ||
        firstChild.data.directiveLabel !== true)
        return;
    let directiveLabel = firstChild.children[0].value;

    // remove this label children
    node.children = node.children.slice(1);
    return directiveLabel;
}


export default function myRemarkDirective() {
    /**
     * @param {import('mdast').Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return function (tree: any): undefined {
        visit(tree, function (node) {
            if (node.type === 'containerDirective') {
                // direvtive label will be parsed as paragraph, so extract it
                const directiveLabel = parseDirectiveLabel(node);

                // change directive into react js element
                const data = node.data || (node.data = {});
                if (['success', 'info', 'warning', 'danger'].includes(node.name))
                    data.hName = "Info";
                else if (['spoiler'].includes(node.name))
                    data.hName = "Spoiler";
                else if (['lemma', 'theorem', 'definition'].includes(node.name))
                    data.hName = "Theorem";
                data.hProperties = { "type": node.name, "id": directiveLabel };
            }
        })
    }
}