/* Include metadata and description of 'Problem', add 'overrideDirectory' in data for figures */
import path from 'path';
import { readFileSync } from 'fs';
import { visit } from 'unist-util-visit';
import { fromMarkdown } from 'mdast-util-from-markdown'
import { mdxJsxFromMarkdown } from 'mdast-util-mdx-jsx'
import * as acorn from 'acorn'
import { mdxJsx } from 'micromark-extension-mdx-jsx'
import { getValueByName, pushAttribute } from 'lib/parser/common';

// const PROBLEMS_PATH = path.join(process.cwd(), getEnvironmentVariable('PROBLEMS_RELATIVE_PATH'));
const PROBLEMS_PATH = path.join('public/guide/problems');

function myRemarkProblem() {
    return async function (tree: any) {
        visit(tree, function (node) {
            if (node.name === 'problem') {

                if (node.attributes === undefined)
                    throw new Error(`Error parsing problem: no source`);

                let directory = getValueByName(node.attributes, 'src'),
                    difficulty = getValueByName(node.attributes, 'difficulty'),
                    solution = getValueByName(node.attributes, 'solution');

                const metadata = JSON.parse(readFileSync(path.join(PROBLEMS_PATH, directory, 'config.json'), { encoding: "utf-8" }));

                // TODO: fully support MDX
                const statement = readFileSync(path.join(PROBLEMS_PATH, directory, 'description.mdx'), { encoding: "utf-8" });
                let subtree = fromMarkdown(statement, {
                    extensions: [mdxJsx({ acorn, addResult: true })],
                    mdastExtensions: [mdxJsxFromMarkdown()]
                });

                visit(subtree, function (subnode) {
                    if (subnode.data === undefined)
                        subnode.data = {};
                    subnode.data.overrideDirectory = path.join(PROBLEMS_PATH, directory);
                })
                node.children = subtree.children;

                // TODO: fix this ugly syntax
                const attribute = (node.attributes = Array<any>());
                pushAttribute(attribute, 'url', metadata.url);
                pushAttribute(attribute, 'src', metadata.source);
                pushAttribute(attribute, 'name', metadata.name);
                pushAttribute(attribute, 'difficulty', difficulty);
            }
        })
    }
}

export default myRemarkProblem;