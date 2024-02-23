import { readFile } from 'fs/promises';
import path from 'path';

import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

/* Plugins to render MDX */
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import myRemarkDirective from 'lib/parser/directive';
import myRemarkRefcode from 'lib/parser/refcode';
import myRemarkProblem from 'lib/parser/problem';
import myRemarkFigure from 'lib/parser/figure';
import rehypeRewrite from 'rehype-rewrite';

export type MdxPathType = {
    dir: string;
    file: string;
};


function escapeMathMode(content: string) {
    enum math {
        none,
        inline,
        display
    }
    let result = "";
    let mathMode = math.none;

    let toggleDisplayMode = () => {
        if (mathMode == math.display)
            mathMode = math.none;
        else if (mathMode == math.none)
            mathMode = math.display;
        else throw Error("Display math mode should not lie inside inline math mode.");
    };
    let toggleInlineMode = () => {
        if (mathMode == math.inline)
            mathMode = math.none;
        else if (mathMode == math.none)
            mathMode = math.inline;
    };

    for (let i = 0; i < content.length;) {
        switch (content[i]) {
            case '$':
                if (content.substring(i, i + 2) == '$$') {
                    toggleDisplayMode();
                    i += 2;
                    result += "$$";
                } else {
                    toggleInlineMode();
                    i += 1;
                    result += "$";
                }
                break;

            case '\\':
                if (mathMode != math.none) {
                    if (content.substring(i, i + 3) == '\\\\]') {
                        toggleDisplayMode();
                        result += content.substring(i, i + 3);
                        i += 3;
                    } else {
                        result += "\\\\";
                        i += 1;
                    }
                } else {
                    if (content.substring(i, i + 3) == '\\\\[') {
                        toggleDisplayMode();
                        result += content.substring(i, i + 3);
                        i += 3;
                    } else {
                        result += content[i];
                        result += content[i + 1];
                        i += 2;
                    }
                }
                break;

            case '}':
            case '{':
            case '_':
                if (mathMode != math.none)
                    result += "\\" + content[i];
                else
                    result += content[i];
                i += 1;
                break;

            default:
                result += content[i];
                i += 1;
        }
    }
    console.log(result);
    console.log(content);
    return result;
}

export default async function collectMdx(
    mdx_path: MdxPathType,
    recurse_depth: number = 1
): Promise<Map<string, MDXRemoteSerializeResult>> {
    const mdx_fullpath = path.join(mdx_path.dir, mdx_path.file);
    const mdx_raw = await readFile(mdx_fullpath, { encoding: "utf-8" });

    // remove HTML comment prior to mdx process since mdx happens to not support it
    // https://github.com/stevemao/html-comment-regex
    const HTMLCommentRegex = /<!--([\s\S]*?)-->/g;
    const crude = mdx_raw.replaceAll(HTMLCommentRegex, "");

    const impure = escapeMathMode(crude);

    let submdx_paths: MdxPathType[] = [];
    const mdx_content = await serialize(
        impure,
        {
            mdxOptions: {
                remarkPlugins: [
                    [myRemarkProblem, submdx_paths, recurse_depth],
                    remarkDirective,
                    myRemarkDirective,
                    remarkBreaks,
                    [myRemarkFigure, mdx_path.dir],
                    [myRemarkRefcode, mdx_path.dir],
                ],
                rehypePlugins: [
                    [rehypeRewrite, { // Rewrite elements to start from upper case to fit the constraint of React
                        rewrite: (node: any) => {
                            if (node.type == 'mdxJsxFlowElement') {
                                if (['figure', 'problem', 'refcode', 'reference'].includes(node.name)) {
                                    const first = node.name[0].toUpperCase();
                                    node.name = first + node.name.slice(1);
                                }
                            }
                        }
                    }],
                ],
                format: 'mdx',
            }
        }
    );
    let contents_mapping: Map<string, MDXRemoteSerializeResult> = new Map();
    contents_mapping.set(mdx_fullpath, mdx_content);
    const submdx_contents = await Promise.all(submdx_paths.map(mdx_path => collectMdx(mdx_path, recurse_depth + 1)));
    for (const submdx_content of submdx_contents) {
        submdx_content.forEach((value, key, map) => {
            contents_mapping.set(key, value);
        });
    }
    return contents_mapping;
}
