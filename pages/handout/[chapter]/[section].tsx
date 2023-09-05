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

/* Plugins to render MDX */
import remarkComment from 'remark-comment';
import remarkMath from 'remark-math';
import myRehypeMathJax from 'rehype-mathjax/svg';
import remarkBreaks from 'remark-breaks';

import { getArticles } from 'lib/contents_handler'
import getEnvironmentVariable from 'lib/environment';


type Article = {
    chapter: string,
    title: string,
    content: MDXRemoteSerializeResult,
};
type ArticleStructure = {
    chapter: string,
    section: string,
};

const ARTICLE_PATH = path.join(process.cwd(), getEnvironmentVariable('CONTENTS_RELATIVE_PATH'));

export const getStaticPaths: GetStaticPaths = async () => {
    const articles = await getArticles();

    const entries: ArticleStructure[] = [];
    for (const chapter in articles)
        for (const section of articles[chapter])
            entries.push({ chapter, section });

    const paths = entries.map(entry => ({ params: entry }));

    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<{article: Article}> = async ({ params }) => {
    const {chapter, section} = (params as ArticleStructure);

    const raw = await readFile(path.join(ARTICLE_PATH, chapter, section, `${section}.mdx`), { encoding: "utf-8" });
    const content = await serialize(
        raw,
        {
            mdxOptions: {
                remarkPlugins: [remarkComment, remarkMath, remarkBreaks],
                rehypePlugins: [[myRehypeMathJax, { chtml: { fontURL: getEnvironmentVariable('MATHJAX_FONTURL') }}] ],
                format: 'mdx',
            }
        }
    );
    const article: Article = {
        chapter,
        title: section,
        content,
    };
    return { props: { article }};
}

export default function Page({ article }: InferGetServerSidePropsType<typeof getStaticProps>) {
    return (<>
        <h1>{article.title}</h1>
        <MDXRemote {...article.content} />
        <h4><Link href={`../${article.chapter}`}>回到章節</Link></h4>
    </>);
}