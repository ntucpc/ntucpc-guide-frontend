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
import ArticleFooter, { ArticleFooterPropsType } from 'components/article-footer';
import ArticleHeader, { ArticleHeaderPropsType } from 'components/article-header';
import collectMdx from 'lib/mdx-reader';
import { MarkdownContextType } from 'components/markdown/types';
import Submdx from 'components/submdx';
import HightlightJsScript from 'components/highlightjs';

type ArticleProps = {
    mdx_path: string;
    contents_mapping: [string, MDXRemoteSerializeResult][];
    header_props: ArticleHeaderPropsType;
    footer_props: ArticleFooterPropsType;
};

const ARTICLE_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "content");

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getSections().map(section => ({params: {
        chapter: section.chapter.id,
        section: section.id,
    }}));
    return { paths, fallback: false, };
}


export const getStaticProps: GetStaticProps<{ props: ArticleProps }> = async ({ params }) => {
    if (!params)
        throw Error('param not exist in [section]');

    const chapter_id = params.chapter as string;
    const section_id = params.section as string;
    const section = getSectionByName(chapter_id, section_id);
    const content = await collectMdx({
        dir: path.join(ARTICLE_PATH, chapter_id, section_id),
        file: `${section_id}.mdx`,
    });
    const adj_sections = getAdjacentSections(section);

    const props: ArticleProps = {
        mdx_path: path.join(ARTICLE_PATH, chapter_id, section_id, `${section_id}.mdx`),
        contents_mapping: Array.from(content.entries()),
        header_props: {
            chapter: (({id, url}) => ({id, url}))(section.chapter),
            section: (({
                title, authors, contributors, prerequisites
            }) => ({
                title, authors, contributors, prerequisites
            }))(section),
            level: (({title}) => ({title}))(section.level),
        },
        footer_props: {
            chapter_url: section.chapter.url,
            prev_url: adj_sections.prev?.url ?? null,
            prev_title: adj_sections.prev?.title ?? null,
            next_url: adj_sections.next?.url ?? null,
            next_title: adj_sections.next?.title ?? null,
        },
    };
    return { props: { props } };
}

export default function Page({ props }: InferGetServerSidePropsType<typeof getStaticProps>) {
    const markdown_context: MarkdownContextType = {
        mdx_path: props.mdx_path,
        contents_mapping: new Map(props.contents_mapping),
    };
    return (<>
        <HightlightJsScript />
        <MathJaxJS />
        <ArticleHeader {...props.header_props} />
        <Submdx context={markdown_context} />
        <ArticleFooter {...props.footer_props} />
    </>);
}