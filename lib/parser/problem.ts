/* Include metadata and description of 'Problem', add 'overrideDirectory' in data for figures */
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { visit } from 'unist-util-visit';
import { getValueByName, pushAttribute } from 'lib/parser/common';
import { MdxPathType } from 'lib/mdx-reader';
import getEnvironmentVariable from 'lib/environment';

const PROBLEMS_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "problems");
const MAX_RECURSE_DEPTH = 2;

function myRemarkProblem(submdx_paths: MdxPathType[], recurse_depth: number) {
    return async function (tree: any) {
        visit(tree, function (node) {
            if (node.name === 'problem') {

                if (node.attributes === undefined)
                    throw new Error(`Error parsing problem: no source`);

                let directory = getValueByName(node.attributes, 'src');

                if (!directory)
                    throw new Error(`Error parsing problem: no source`);

                // difficulty = getValueByName(node.attributes, 'difficulty'),
                let solution = getValueByName(node.attributes, 'solution') ?? "";

                const metadata = JSON.parse(readFileSync(path.join(PROBLEMS_PATH, directory, 'config.json'), { encoding: "utf-8" }));
                
                // too many nested layers
                // TODO: add a link to problem page
                if(recurse_depth > MAX_RECURSE_DEPTH) return;
                
                // TODO: fix this ugly syntax
                const attribute = (node.attributes = Array<any>());
                pushAttribute(attribute, 'url', metadata.url);
                pushAttribute(attribute, 'src', metadata.source);
                pushAttribute(attribute, 'name', metadata.name);
                pushAttribute(attribute, 'solution', solution);
                // pushAttribute(attribute, 'difficulty', difficulty);
                
                const problem_dir = path.join(PROBLEMS_PATH, directory);
                const mdx_path = path.join(problem_dir, 'description.mdx');
                if(existsSync(mdx_path)) {
                    submdx_paths.push({
                        dir: problem_dir,
                        file: 'description.mdx',
                    });
                    pushAttribute(attribute, 'mdx_path', mdx_path);
                }
                const sol_path = path.join(problem_dir, `${solution}.mdx`);
                if(existsSync(sol_path)) {
                    submdx_paths.push({
                        dir: problem_dir,
                        file: `${solution}.mdx`,
                    });
                    pushAttribute(attribute, 'sol_path', sol_path);
                }
            }
        })
    }
}

export default myRemarkProblem;
