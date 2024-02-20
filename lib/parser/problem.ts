/* Include metadata and description of 'Problem', add 'overrideDirectory' in data for figures */
import path from 'path';
import { readFileSync } from 'fs';
import { visit } from 'unist-util-visit';
import { getValueByName, pushAttribute } from 'lib/parser/common';
import { MdxPathType } from 'lib/mdx-reader';

// const PROBLEMS_PATH = path.join(process.cwd(), getEnvironmentVariable('PROBLEMS_RELATIVE_PATH'));
const PROBLEMS_PATH = path.join('public/guide/problems');
const MAX_RECURSE_DEPTH = 2;

function myRemarkProblem(submdx_paths: MdxPathType[], recurse_depth: number) {
    return async function (tree: any) {
        visit(tree, function (node) {
            if (node.name === 'problem') {

                if (node.attributes === undefined)
                    throw new Error(`Error parsing problem: no source`);

                let directory = getValueByName(node.attributes, 'src');
                    // difficulty = getValueByName(node.attributes, 'difficulty'),
                    // solution = getValueByName(node.attributes, 'solution');

                const metadata = JSON.parse(readFileSync(path.join(PROBLEMS_PATH, directory, 'config.json'), { encoding: "utf-8" }));

                if(recurse_depth < MAX_RECURSE_DEPTH) {
                    submdx_paths.push({
                        dir: path.join(PROBLEMS_PATH, directory),
                        file: 'description.mdx',
                    });
                } else {
                    // too many nested layers
                    // TODO: add a link to problem page
                    return;
                }

                // TODO: fix this ugly syntax
                const attribute = (node.attributes = Array<any>());
                pushAttribute(attribute, 'url', metadata.url);
                pushAttribute(attribute, 'src', metadata.source);
                pushAttribute(attribute, 'name', metadata.name);
                pushAttribute(attribute, 'mdx_path', path.join(PROBLEMS_PATH, directory, 'description.mdx'));
                // pushAttribute(attribute, 'difficulty', difficulty);
            }
        })
    }
}

export default myRemarkProblem;