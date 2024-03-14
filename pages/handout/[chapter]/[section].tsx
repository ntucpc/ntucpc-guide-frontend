import path from 'path';

import type {
    InferGetServerSidePropsType,
    GetStaticPaths,
    GetStaticProps,
} from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

/* Plugins to render MDX */
import MathJaxJS from 'components/mathjax';

import { getSections, getAdjacentSections, SectionType, getSectionByName } from 'lib/contents-handler';
import getEnvironmentVariable from 'lib/environment';
import ArticleFooter from 'components/article-footer';
import ArticleHeader from 'components/article-header';
import collectMdx from 'lib/mdx-reader';
import { MarkdownContextType } from 'components/markdown/types';
import Submdx from 'components/submdx';
import HightlightJsScript from 'components/highlightjs';


type Article = {
    mdx_path: string;
    section: SectionType;
    contents_mapping: [string, MDXRemoteSerializeResult][];
    adjacent_sections: {prev: SectionType | null, next: SectionType | null};
};
type ArticleStructure = {
    chapter: string;
    section: string;
};

const ARTICLE_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "content");

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getSections().map(section => ({params: {
        chapter: section.d_chapter?.id,
        section: section.d_section.id,
    }}));

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
        <HightlightJsScript />
        <MathJaxJS />
        <ArticleHeader section={section}/>
        <Submdx context={markdown_context} />
        <ArticleFooter
            section={section}
            {...article.adjacent_sections}
        />
    </>);
}