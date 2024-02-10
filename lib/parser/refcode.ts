/* Parse 'Refcode' processed markdown directives to ReactJS element */
import path from 'path';
import { readFileSync } from 'fs';
import getEnvironmentVariable from 'lib/environment';
import { visit } from 'unist-util-visit';

/**
 * Returns directive label if it exists for a given node.
 * Also remove that label node.
 */
function parseDirectiveLabel(node: any) {
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

// const ARTICLE_PATH = path.join(process.cwd(), getEnvironmentVariable('CONTENTS_RELATIVE_PATH'));
const ARTICLE_PATH = path.join(process.cwd(), getEnvironmentVariable('CONTENTS_RELATIVE_PATH'));
// const raw = await readFile(path.join(ARTICLE_PATH, chapter, section, `${section}.mdx`), { encoding: "utf-8" });

function myRemarkRefcode(chapter: string, section: string) {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.name === 'refcode') {
                if (node.attributes === undefined)
                    throw new Error(`Error parsing reference code: no source`);

                const getValueByName = (arr: Array<any>, prop: string): string => { return arr.find((element: any) => element.name === prop).value };

                let source = getValueByName(node.attributes, 'src');

                const lines = readFileSync(path.join(ARTICLE_PATH, chapter, section, 'refcode', source), { encoding: "utf-8" }).split("\n");

                // Let they be undefined as they may be, because the slice accepts undefined.
                let start = +getValueByName(node.attributes, 'start'),
                    end = +getValueByName(node.attributes, 'end');
                
                const result = lines.slice(start - 1, end).join('\n');
                const children = node.children || (node.children = []);
                console.log(result);

                children.push({type: 'code', value: `${result}`});

            }
        })
    }
}

export default myRemarkRefcode;