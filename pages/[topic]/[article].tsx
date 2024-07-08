import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Article, VirtualArticle, getArticle, getArticles, getVirtualArticle } from '@/lib/articles';
import { Topic, VirtualTopicGroup, getFullTopicStructure, getTopic } from '@/lib/topics';
import { Chapter, VirtualChapter, findChapter, getFullChapterStructure } from '@/lib/chapters';
import path from 'path';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { remarkProblem } from '@/lib/parser/problem';
import { parseMdx } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';
import { MarkdownContextType } from '@/components/markdown/types';
import Submdx from '@/components/submdx';
import HightlightJsScript from '@/ntucpc-website-common-lib/scripts/highlightjs';
import MathJaxJS from '@/ntucpc-website-common-lib/scripts/mathjax';
import { HyperRefBlank } from '@/ntucpc-website-common-lib/components/basic';
import { remarkContentReference } from '@/lib/parser/content-reference';
import { ContentBody, Layout } from '@/components/layout';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBook, faChevronLeft, faChevronRight, faUserGroup, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useEffect } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Section, remarkSection } from '@/lib/parser/section';
import { useRouter } from 'next/router';
import { WrappedLink } from '@/ntucpc-website-common-lib/components/common';
import { getGuideRoot, getPublicRoot } from '@/lib/environment';

type Prereq = {
    text: string;
    code: string;
};

export type ArticleProps = {
    // topicName: string,
    mdxPath: string
    // article: Article,
    // topic: Topic | null,
    // chapter: Chapter | null,
    content: [string, MDXRemoteSerializeResult][]
    prereqs: Prereq[]
    // topicArticles: Article[],
    // chapterArticles: [string, Article[]][],
    sections: Section[]
    previousArticle: VirtualArticle | null
    nextArticle: VirtualArticle | null
    virtualArticle: VirtualArticle
    topicStructure: VirtualTopicGroup[]
    chapterStructure: VirtualChapter[]
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getArticles().map(article => ({
        params: { topic: article.topic, article: article.article }
    }));
    return {
        paths,
        fallback: false,
    };
}

const ARTICLE_PATH = path.join(getGuideRoot(), "content");

export const getStaticProps: GetStaticProps<{ props: ArticleProps }> = async ({ params }) => {
    if (!params) {
        throw Error("param doesn't exist in [article]");
    }
    const topic = params.topic as string;
    const article = params.article as string;
    const code = `${topic}/${article}`;
    const articleObj = getArticle(code)!;
    const mdxPath = path.join(ARTICLE_PATH, topic, article, `${article}.mdx`);
    const sections: Section[] = [];
    const content = await parseMdx(
        mdxPath,
        1,
        [remarkProblem, remarkContentReference, [remarkSection, sections]],
        (directory, name) => {
            return path.join("/", directory.replace(getGuideRoot(), getPublicRoot()), "figure", name)
        }
    );
    const prereqs: Prereq[] = []
    for (const prereq of articleObj.prerequisites) {
        const virtualArticle = getVirtualArticle(prereq)
        prereqs.push({
            code: virtualArticle.code,
            text: virtualArticle.fullDisplayTitle
        })
    }
    const chapterObject = findChapter(code);
    let previousArticle: VirtualArticle | null = null;
    let nextArticle: VirtualArticle | null = null;
    if (chapterObject) {
        let lastArticle: VirtualArticle | undefined = undefined;
        for (const content of chapterObject.contents) {
            const current = getVirtualArticle(content);
            if (content === code) {
                previousArticle = lastArticle ?? null;
            }
            if (lastArticle?.code === code) {
                nextArticle = current;
            }
            lastArticle = current;
        }
    }

    const props = {
        mdxPath: mdxPath,
        content: Array.from(content.entries()),
        prereqs: prereqs,
        sections: sections,
        previousArticle: previousArticle,
        nextArticle: nextArticle,
        virtualArticle: getVirtualArticle(code),
        topicStructure: getFullTopicStructure(),
        chapterStructure: getFullChapterStructure()
    }
    return { props: { props } };
}

type InformatIonItemProps = {
    name: string;
    icon: IconDefinition;
    children: ReactNode
}
function InformationItem({ name, children, icon }: InformatIonItemProps) {
    return <div className="flex my-2">
        <div className="w-7 text-center text-indigo-500"><FontAwesomeIcon icon={icon} /></div>
        <div className="ml-1">
            {name}：{children}
        </div>
    </div>;
}

function ArticleHeader(props: ArticleProps) {

    const prereqs = [];
    let first = true;
    let number = 0;
    for (const prereq of props.prereqs) {
        if (!first) prereqs.push("、");
        else first = false;
        prereqs.push(<HyperRefBlank href={`/${prereq.code}`} key={number++}>{prereq.text}</HyperRefBlank>)
    }
    const article = props.virtualArticle.article!

    return <div className="mb-8">
        <div className="text-xl">{props.virtualArticle.chapterDisplayTitle}</div>
        <div className="text-2xl text-gray-500 pt-1">{props.virtualArticle.topicDisplayTitle}</div>
        <div className="text-5xl mt-1 mb-4">{props.virtualArticle.articleDisplayTitle}</div>

        <InformationItem name="作者" icon={faUserPen}>{article.authors.join("、")}</InformationItem>
        {
            article.contributors.length > 0 ?
                <InformationItem name="協作者" icon={faUserGroup} >{article.contributors.join("、")}</InformationItem>
                : <></>
        }
        {
            props.prereqs.length > 0 ?
                <InformationItem name="先備知識" icon={faBook} >{prereqs} </InformationItem>
                : <></>
        }

    </div>;
}

type ArticleFooterLinkProps = {
    side: "left" | "right",
    article: VirtualArticle | null
}
function ArticleFooterLink({side, article}: ArticleFooterLinkProps) {
    return <div className={`flex sm:w-64 ${side === "left" ? "justify-start" : "justify-end"}`}>
        {article ?
        <WrappedLink href={`/${article.code}`}
            className="text-indigo-500 block p-3 hover:text-indigo-700 hover:bg-indigo-100">
            <div className={`flex items-center ${side === "left" ? "justify-start" : "justify-end"}`}>
                {side === "left" ? <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> : <></>}
                <div className="max-sm:hidden">
                    {article.topicDisplayTitle} /<br/> {article.articleDisplayTitle}
                </div>
                {side === "right" ? <FontAwesomeIcon icon={faChevronRight} className="ml-2" /> : <></>}
            </div>
        </WrappedLink>
        : <div className="p-3 text-gray-500">
            <FontAwesomeIcon icon={side === "left" ? faChevronLeft : faChevronRight} />
        </div>}
    </div>
}
function ArticleFooter({previousArticle, nextArticle, virtualArticle}: ArticleProps) {
    // console.log("test", previousArticle, nextArticle);
    return <div className="flex mt-20 justify-between items-center">
        <ArticleFooterLink side="left" article={previousArticle}/>
        <div className="font-semibold p-3 text-nowrap">
            {virtualArticle.chapterDisplayTitle}
        </div>
        <ArticleFooterLink side="right" article={nextArticle}/>
    </div>
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {
    // console.log(props);
    const markdown_context: MarkdownContextType = {
        mdx_path: props.mdxPath,
        contents_mapping: new Map(props.content),
    };
    const router = useRouter();
    const reload = () => {
        console.log("reload MathJax and hljs");
        eval(`
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        hljs.highlightAll();
        hljs.initLineNumbersOnLoad({singleLine: true});
        `)
    }
    useEffect(() => {
        router.events.on("routeChangeComplete", reload);
        return () => {
            router.events.off("routeChangeComplete", reload);
        }
    }, [router]);
    return (<>
        <Layout sidebar={true} title={props.virtualArticle.articleDisplayTitle}>
            <Sidebar {...props} />
            <ContentBody sidebar={true}>
                <ArticleHeader {...props} />
                <Submdx context={markdown_context} />
                <ArticleFooter {...props} />
            </ContentBody>
        </Layout>
        <HightlightJsScript />
        <MathJaxJS />
    </>
    );
};