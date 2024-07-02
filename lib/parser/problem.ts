import { visit } from 'unist-util-visit'
import { getAttribute, parseDirectiveLabel, pushAttribute, removeDirectiveLabel, setAttribute } from '@/ntucpc-website-common-lib/mdx-parser/util';
import path from 'path';
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';
import { existsSync } from 'fs';
import { getGuideRoot } from '../environment';

const PROBLEMS_PATH = path.join(getGuideRoot(), "problems");

/**
 * Problem attributes:
 * - url: url of online judge problem, defined in problem config (url)
 * - src: name of source, defined in problem config (src)
 * - name: problem name, defined in problem config (name)
 * - difficulty: difficulty, defined in the problem tag
 * - expanded: whether to expand the solution by default, true if the difficulty is 0
 * - descriptionMdx: description mdx file path, undefined if the file doesn't exist
 * - solution: solution name, defined in the problem tag
 * - solutionMdx: solution mdx file path, undefined if no solutoin
 * - importMdx (many): descriptionMdx and solutionMdx, for import mdx, used by remarkImport
 */
export function remarkProblem() {
    return function(tree: any) {
        visit(tree, function (node) {
            if (node.name !== "problem") return;
            
            const source = getAttribute(node, "src")!;
            const directory = path.join(PROBLEMS_PATH, source);
            const difficulty = getAttribute(node, "difficulty") ?? "?";
            const solution = getAttribute(node, "solution");

            const problemConfig = readConfig(directory);
            
            if(!/^([0-5]|\?)$/.test(difficulty)) {
                throw new Error(`Error parsing problem: illegal difficulty "${difficulty}"`);
            }

            const expanded = solution === undefined ? false : (difficulty === "0");
            const importPath: string[] = [];
            const descriptionPath = path.join(directory, "description.mdx");
            const solutionPath = solution === undefined ? undefined : path.join(directory, `${solution}.mdx`);
            const attributes: {[key: string]: string} = {
                "url": problemConfig["url"],
                "src": problemConfig["source"],
                "name": problemConfig["name"],
                "expanded": String(expanded),
                "difficulty": difficulty,
            };
            if(existsSync(descriptionPath)){
                importPath.push(descriptionPath);
                attributes["descriptionMdx"] = descriptionPath;
            }
            if(solution !== undefined && existsSync(solutionPath!)){
                importPath.push(solutionPath!);
                attributes["solution"] = solution;
                attributes["solutionMdx"] = solutionPath!;
            }
            setAttribute(node, attributes);
            for (const path of importPath)
                pushAttribute(node.attributes, "importMdx", path);
        });
    }
}