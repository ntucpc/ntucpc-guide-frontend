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

import { getSections, getAdjacentSections, SectionType, getSectionByName } from 'lib/contents-handler';
import getEnvironmentVariable from 'lib/environment';
import ArticleFooter from 'components/article-footer';
import ArticleHeader from 'components/article-header';
import collectMdx from 'lib/mdx-reader';
import { Alert, Typography } from '@mui/material';
import { MarkdownContextType } from 'components/markdown/types';
import Submdx from 'components/submdx';


type Article = {
    mdx_path: string;
    section: SectionType;
    contents_mapping: [string, MDXRemoteSerializeResult][];
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
    
    const sectionObj = getSectionByName(chapter, section);

    const content = await collectMdx({
        dir: path.join(ARTICLE_PATH, chapter, section),
        file: `${section}.mdx`,
    });

    const article: Article = {
        mdx_path: path.join(ARTICLE_PATH, chapter, section, `${section}.mdx`),
        section: sectionObj,
        contents_mapping: Array.from(content.entries()),
        adjacent_sections: getAdjacentSections(sectionObj)
    };
    return { props: { article } };
}

export default function Page({ article }: InferGetServerSidePropsType<typeof getStaticProps>) {
    const section = article.section;
    const contents_mapping = new Map(article.contents_mapping);
    const markdown_context: MarkdownContextType = {
        mdx_path: article.mdx_path,
        contents_mapping,
    };
    return (<>
        <MathJaxJS />
        <ArticleHeader section={section}/>
        <Submdx context={markdown_context} />
        <ArticleFooter
            section={section}
            {...article.adjacent_sections}
        />
    </>);
}