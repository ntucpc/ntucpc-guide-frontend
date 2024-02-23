/* Include 'Refcode' referenced local file */
import path from 'path';
import { readFileSync } from 'fs';
import { visit } from 'unist-util-visit';
import { getValueByName, pushAttribute } from 'lib/parser/common';

function myRemarkRefcode(directory: string) {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.name === 'refcode') {
                if (node.attributes === undefined)
                    throw new Error(`Error parsing reference code: no source`);
                
                let source = getValueByName(node.attributes, 'src');
                if (source === undefined)
                    throw new Error(`Error parsing reference code: no source`);
                const lines = readFileSync(path.join(directory, 'refcode', source), { encoding: "utf-8" }).split("\n");

                let start = (+getValueByName(node.attributes, 'start') - 1) || undefined;
                let end = (+getValueByName(node.attributes, 'end')) || undefined;
                const result = lines.slice(start, end).join('\n');

                // TODO: fix this ugly syntax
                const attribute = (node.attributes = Array<any>());
                pushAttribute(attribute, "lang", "cpp");
                pushAttribute(attribute, "lineno", true);
                pushAttribute(attribute, "code", result);
            } else if(node.type === "code") {
                let lang: string = node.lang ?? "cpp";
                let lineno: boolean = false;
                if(lang.endsWith("=")) {
                    lang = lang.slice(0, lang.length - 1);
                    lineno = true;
                }
                node.type = "mdxJsxFlowElement";
                node.name = "refcode";
                node.attributes = [
                    { type: "mdxJsxAttribute", name: "lang", value: lang },
                    { type: "mdxJsxAttribute", name: "lineno", value: lineno },
                    { type: "mdxJsxAttribute", name: "code", value: node.value },
                ];
                node.children = [];
                node.data = { _mdxExplicitJsx: true };
            }
        })
    }
}

export default myRemarkRefcode;