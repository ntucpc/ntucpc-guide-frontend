import { readFile } from 'fs/promises';
import path from 'path';

import type {
    InferGetServerSidePropsType,
    GetStaticPaths,
    GetStaticProps,
} from 'next';
import Link from 'next/link';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Root, RootContent } from 'hast';
import { Code } from 'mdast';

/* Plugins to render MDX */
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive'
import myRemarkDirective from 'lib/parser/directive';
import myRemarkRefcode from 'lib/parser/refcode'
import myRemarkProblem from 'lib/parser/problem';
import myRemarkFigure from 'lib/parser/figure';
import rehypeMathjax from 'rehype-mathjax/browser';
import rehypeRewrite from 'rehype-rewrite';
import makeMarkdownComponents from 'components/markdown';
import MathJaxJS from 'components/mathjax';

import remarkParse from 'remark-parse';

import { getSections, getAdjacentSections, SectionType, getSectionByName } from 'lib/contents_handler';
import getEnvironmentVariable from 'lib/environment';
import ArticleFooter from 'components/article-footer';
import ArticleHeader from 'components/article-header';


type Article = {
    section: SectionType;
    content: MDXRemoteSerializeResult;
    adjacent_sections: {prev?: SectionType, next?: SectionType};
};
type ArticleStructure = {
    chapter: string;
    section: string;
};

const ARTICLE_PATH = path.join(getEnvironmentVariable('CONTENTS_RELATIVE_PATH'));

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getSections().map(section => ({params: section}));

    return {
        paths,
        fallback: false,
    };
}


export const getStaticProps: GetStaticProps<{ article: Article }> = async ({ params }) => {
    const {chapter, section} = params as ArticleStructure;
    // const { chapter, section } = (params as ArticleStructure);
    const sectionObj = getSectionByName(chapter, section);

    const raw = await readFile(path.join(ARTICLE_PATH, chapter, section, `${section}.mdx`), { encoding: "utf-8" });

    // remove HTML comment prior to mdx process since mdx happens to not support it
    // https://github.com/stevemao/html-comment-regex
    const HTMLCommentRegex = /<!--([\s\S]*?)-->/g;
    const crude = raw.replaceAll(HTMLCommentRegex, "");

    const content = await serialize(
        crude,
        {
            mdxOptions: {
                remarkPlugins: [
                    myRemarkProblem,
                    remarkDirective,    
                    myRemarkDirective,
                    remarkBreaks,
                    remarkMath,         
                    [myRemarkFigure, path.join(ARTICLE_PATH, chapter, section)],
                    [myRemarkRefcode, path.join(ARTICLE_PATH, chapter, section)],
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

    const article: Article = {
        section: sectionObj,
        content,
        adjacent_sections: getAdjacentSections(sectionObj)
    };
    return { props: { article } };
}

export default function Page({ article }: InferGetServerSidePropsType<typeof getStaticProps>) {
    const section = article.section;
    const components = makeMarkdownComponents({
        chapter: section.chapter,
        title: section.section,
    });
    return (<>
        <MathJaxJS />
        <ArticleHeader section={section}/>
        <MDXRemote {...article.content} components={components} />
        <ArticleFooter
            section={section}
            {...article.adjacent_sections}
        />
    </>);
}