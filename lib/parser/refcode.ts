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
                const lines = readFileSync(path.join(directory, 'refcode', source), { encoding: "utf-8" }).split("\n");
                
                let start = (+getValueByName(node.attributes, 'start') - 1) || undefined;
                let end = (+getValueByName(node.attributes, 'end')) || undefined;
                const result = lines.slice(start, end).join('\n');

                // TODO: fix this ugly syntax
                const attribute = (node.attributes = Array<any>());
                pushAttribute(attribute, 'code', result);
            }
        })
    }
}

export default myRemarkRefcode;