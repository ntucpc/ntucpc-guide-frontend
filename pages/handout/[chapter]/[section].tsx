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

/* Plugins to render MDX */
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive'
import myRemarkDirective from 'lib/directive_customize';
import rehypeMathjax from 'rehype-mathjax/browser';
import rehypeRewrite from 'rehype-rewrite';
import handlerBuilder from 'components/article';
import MathJaxJS from 'components/mathjax';

import { getArticles } from 'lib/contents_handler';
import getEnvironmentVariable from 'lib/environment';


type Article = {
    chapter: string,
    title: string,
    content: MDXRemoteSerializeResult,
};
type Components = ReturnType<typeof handlerBuilder>
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

export const getStaticProps: GetStaticProps<{ article: Article }> = async ({ params }) => {
    const { chapter, section } = (params as ArticleStructure);

    const raw = await readFile(path.join(ARTICLE_PATH, chapter, section, `${section}.mdx`), { encoding: "utf-8" });

    // remove HTML comment prior to mdx process since mdx happens to not support it
    // https://github.com/stevemao/html-comment-regex
    const HTMLCommentRegex = /<!--([\s\S]*?)-->/g;
    const crude = raw.replaceAll(HTMLCommentRegex, "");

    const content = await serialize(
        crude,
        {
            mdxOptions: {
                remarkPlugins: [remarkMath, remarkDirective, myRemarkDirective, remarkBreaks],
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
        chapter,
        title: section,
        content,
    };
    return { props: { article } };
}

export default function Page({ article }: InferGetServerSidePropsType<typeof getStaticProps>) {
    const components = handlerBuilder(article.chapter, article.title);
    return (<>
        <MathJaxJS />
        <h1>{article.title}</h1>
        <MDXRemote {...article.content} components={components} />
        <h4><Link href={`../${article.chapter}`}>回到章節</Link></h4>
    </>);
}