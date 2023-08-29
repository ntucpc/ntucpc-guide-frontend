import { readdir, readFile } from 'fs/promises';
import path from 'path';

import type {
    InferGetServerSidePropsType,
    GetStaticPaths,
    GetStaticProps,
} from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';


type Article = {
    title: string,
    content: MDXRemoteSerializeResult,
};
type NameStructure = {
    params: {
        chapter: string,
        section: string,
    }
};

const ARTICLE_PATH = path.join(process.cwd(), "contents/content");

export const getStaticPaths: GetStaticPaths = async () => {
    const articles: NameStructure[] = [];
    try {
        const chapters = await readdir(ARTICLE_PATH);
        for (const chapter of chapters) {
            const sections = await readdir(path.join(ARTICLE_PATH, chapter));
            for (const section of sections)
                articles.push({ params: { chapter, section }});
        }
    } catch (err) {
        console.error(err);
    }

    return {
        paths: articles,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<{article: Article}> = async (context) => {
    const {chapter, section} = (context as NameStructure).params;

    const raw = await readFile(path.join(ARTICLE_PATH, chapter, section, `${section}.mdx`), { encoding: "utf-8" });
    const content = await serialize(raw);
    const article: Article = {
        title: section,
        content
    };
    return { props: { article }};
}

export default function Page({ article }: InferGetServerSidePropsType<typeof getStaticProps>) {
    return (<>
        <h1>{article.title}</h1>
        <MDXRemote {...article.content} />
    </>);
}