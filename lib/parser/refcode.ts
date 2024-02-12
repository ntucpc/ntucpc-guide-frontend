/**
 * @fileoverview Include reference code.
 * Include line range is parsed in this file.
 */

import path from 'path';
import { readFileSync } from 'fs';
import { visit } from 'unist-util-visit';
import { getValueByName, pushAttribute } from 'lib/parser/common';

export function myRemarkRefcode(directory: string) {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.name === 'refcode') {

                if (node.attributes === undefined)
                    throw new Error(`Error parsing reference code: no source`);

                const finalDirectory = (node.data !== undefined && node.data.overrideDirectory) ?
                    node.data.overrideDirectory : directory;

                const source = getValueByName(node.attributes, 'src');
                const lines = readFileSync(path.join(finalDirectory, 'refcode', source), { encoding: "utf-8" }).split("\n");

                const start = +getValueByName(node.attributes, 'start') || 1;
                const end = +getValueByName(node.attributes, 'end') || lines.length;
                const result = lines.slice(start - 1, end).join('\n');

                // TODO: fix this ugly syntax
                const attribute = (node.attributes = Array<any>());
                pushAttribute(attribute, 'code', result);
            }
        })
    }
}
