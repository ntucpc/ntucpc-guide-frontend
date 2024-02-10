/* Include 'Refcode' referenced local file */
import path from 'path';
import { readFileSync } from 'fs';
import getEnvironmentVariable from 'lib/environment';
import { visit } from 'unist-util-visit';
import { getValueByName, pushAttribute } from 'lib/parser/common';

const ARTICLE_PATH = path.join(process.cwd(), getEnvironmentVariable('CONTENTS_RELATIVE_PATH'));

function myRemarkRefcode(chapter: string, section: string) {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.name === 'refcode') {

                if (node.attributes === undefined)
                    throw new Error(`Error parsing reference code: no source`);

                let source = getValueByName(node.attributes, 'src');
                const lines = readFileSync(path.join(ARTICLE_PATH, chapter, section, 'refcode', source), { encoding: "utf-8" }).split("\n");

                // TODO: fix undefined - 1 = NaN
                let start = +getValueByName(node.attributes, 'start'),
                    end = +getValueByName(node.attributes, 'end');
                const result = lines.slice(start - 1, end).join('\n');

                // TODO: fix this ugly syntax
                const attribute = (node.attributes = Array<any>());
                node.data._mdxExplicitJsx = false;
                pushAttribute(attribute, 'code', result);
            }
        })
    }
}

export default myRemarkRefcode;