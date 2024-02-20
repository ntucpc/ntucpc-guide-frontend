import { readFile } from 'fs/promises';
import path from 'path';

import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

/* Plugins to render MDX */
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import myRemarkDirective from 'lib/parser/directive';
import myRemarkRefcode from 'lib/parser/refcode';
import myRemarkProblem from 'lib/parser/problem';
import myRemarkFigure from 'lib/parser/figure';
import rehypeMathjax from 'rehype-mathjax/browser';
import rehypeRewrite from 'rehype-rewrite';

export type MdxPathType = {
    dir: string;
    file: string;
};

export default async function compileMdx(
    mdx_path: MdxPathType
): Promise<Map<string, MDXRemoteSerializeResult>> {
    const mdx_fullpath = path.join(mdx_path.dir, mdx_path.file);
    const mdx_raw = await readFile(mdx_fullpath, { encoding: "utf-8" });

    // remove HTML comment prior to mdx process since mdx happens to not support it
    // https://github.com/stevemao/html-comment-regex
    const HTMLCommentRegex = /<!--([\s\S]*?)-->/g;
    const crude = mdx_raw.replaceAll(HTMLCommentRegex, "");

    let submdx_paths: MdxPathType[] = [];
    const mdx_content = await serialize(
        crude,
        {
            mdxOptions: {
                remarkPlugins: [
                    [myRemarkProblem, submdx_paths],
                    remarkDirective,    
                    myRemarkDirective,
                    remarkBreaks,
                    remarkMath,         
                    [myRemarkFigure, mdx_path.dir],
                    [myRemarkRefcode, mdx_path.dir],
                ],
                rehypePlugins: [
                    [rehypeMathjax, {}],
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
    const submdx_contents = await Promise.all(submdx_paths.map(mdx_path => compileMdx(mdx_path)));
    for(const submdx_content of submdx_contents) {
        submdx_content.forEach((value, key, map) => {
            contents_mapping.set(key, value);
        });
    }
    return contents_mapping;
}
