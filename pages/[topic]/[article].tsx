import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Article, getArticle, getArticles } from '@/lib/articles';
import { Topic, getTopic } from '@/lib/topics';
import { Chapter, findChapter } from '@/lib/chapters';
import path from 'path';
import getEnvironmentVariable from '@/lib/environment';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { remarkProblem } from '@/lib/parser/problem';
import { parseMdx } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';
import { MarkdownContextType } from '@/components/markdown/types';
import Submdx from '@/components/submdx';
import HightlightJsScript from '@/ntucpc-website-common-lib/scripts/highlightjs';
import MathJaxJS from '@/ntucpc-website-common-lib/scripts/mathjax';
import { HyperRefBlank } from '@/ntucpc-website-common-lib/components/basic';
import { remarkContentReference } from '@/lib/parser/content-reference';
import { Layout } from '@/components/layout';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBook, faUserGroup, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';

type Prereq = {
    text: string;
    code: string;
};

type Props = {
    mdxPath: string,
    article: Article,
    topic: Topic | null,
    chapter: Chapter | null,
    content: [string, MDXRemoteSerializeResult][],
    prereqs: Prereq[]
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getArticles().map(article => ({
        params: {topic: article.topic, article: article.article}
    }));
    return {
        paths,
        fallback: false,
    };
}

const ARTICLE_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "content");

export const getStaticProps: GetStaticProps<{props: Props}> = async ({ params }) => {
    if (!params) {
        throw Error("param doesn't exist in [article]");
    }
    const topic = params.topic as string;
    const article = params.article as string;
    const code = `${topic}/${article}`;
    const articleObj = getArticle(code)!;
    const mdxPath = path.join(ARTICLE_PATH, topic, article, `${article}.mdx`);
    const content = await parseMdx(mdxPath, 1, [remarkProblem, remarkContentReference]);
    const prereqs: Prereq[] = []
    for (const prereq of articleObj.prerequisites) {
        const prereqArticle = getArticle(prereq);
        if (!prereqArticle){
            prereqs.push({text: prereq, code: prereq});
            continue;
        }
        const topicTitle = getTopic(prereqArticle.topic)?.title ?? prereqArticle.topic;
        prereqs.push({text: `${topicTitle}/${prereqArticle.title}`, code: prereq});
    }
    const props = {
        mdxPath: mdxPath,
        article: articleObj,
        topic: getTopic(articleObj.topic) ?? null,
        chapter: findChapter(code) ?? null,
        content: Array.from(content.entries()),
        prereqs: prereqs
    }
    return { props: { props } };
}

type InformatIonItemProps = {
    name: string;
    icon: IconDefinition;
    children: ReactNode
}
function InformationItem({name, children, icon}: InformatIonItemProps) {
    return <div className="flex my-2">
        <div className="w-7 text-center text-indigo-500"><FontAwesomeIcon icon={icon}/></div>
        <div className="ml-1">
            {name}：{children}
        </div>
    </div>;
}

function ArticleHeader(props: Props) {

    const prereqs = [];
    let first = true;
    for (const prereq of props.prereqs) {
        if (!first) prereqs.push("、");
        else first = false;
        prereqs.push(<HyperRefBlank href={`/${prereq.code}`}>{prereq.text}</HyperRefBlank>)
    }

    return <div className="mb-8">
    <div className="text-xl">{props.chapter?.title ?? "Chapter ???"}</div>
    <div className="text-2xl text-gray-500 pt-1">{props.topic?.title ?? props.article.topic}</div>
    <div className="text-5xl mt-1 mb-4">{props.article.title}</div>

    <InformationItem name="作者" icon={faUserPen}>{props.article.authors.join("、")}</InformationItem>
    {
        props.article.contributors.length > 0 ? 
            <InformationItem name="協作者" icon={faUserGroup} >{props.article.contributors.join("、")}</InformationItem>
            : <></>
    }
    {
        props.prereqs.length > 0 ? 
            <InformationItem name="先備知識" icon={faBook} >{prereqs} </InformationItem>
            : <></>
    }

    </div>;
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {
    // console.log(props);
    const markdown_context: MarkdownContextType = {
        mdx_path: props.mdxPath,
        contents_mapping: new Map(props.content),
    };
    return (<Layout>
        <ArticleHeader {...props} />
        <Submdx context={markdown_context}/>
        <HightlightJsScript />
        <MathJaxJS />
    </Layout>);
};