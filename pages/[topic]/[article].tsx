import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Article, Topic, TopicGroup, Chapter, StructureData } from '@/lib/structure/type'
import { getArticle, getArticleMdxPath, getArticles } from '@/lib/structure/articles';
import { getTopic, getTopics } from '@/lib/structure/topics';
import { findChapter, getChapters } from '@/lib/structure/chapters';
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
import { ReactNode, useEffect, useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Section, remarkSection } from '@/lib/parser/section';
import { useRouter } from 'next/router';
import { WrappedLink } from '@/ntucpc-website-common-lib/components/common';
import { getGuideRoot, getPublicRoot } from '@/lib/environment';
import { reloadMathJax, reloadHighlightJs } from '@/ntucpc-website-common-lib/scripts/reload';
import { getStructure } from '@/lib/structure';
import { Structure, parseStructure } from '@/lib/structure/client';

export type ArticleProps = {
    mdxPath: string
    code: string
    structure: StructureData
    content: [string, MDXRemoteSerializeResult][]
    sections: Section[]
};

export const getStaticPaths: GetStaticPaths = async () => {
    const filteredArticles = getArticles().filter(article =>
        process.env.NODE_ENV === "development" || !article.coming)
    const paths = filteredArticles.map(article => ({
        params: { topic: article.topic, article: article.article }
    }));
    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<{ props: ArticleProps }> = async ({ params }) => {
    if (!params) {
        throw Error("param doesn't exist in [article]");
    }
    const topic = params.topic as string
    const article = params.article as string
    const code = `${topic}/${article}`
    const mdxPath = getArticleMdxPath(code)
    const sections: Section[] = [];
    const content = await parseMdx(
        mdxPath,
        1,
        [remarkProblem, remarkContentReference, [remarkSection, sections]],
        {
            getFigurePath: (directory, name) => {
                return path.join("/", directory.replace(getGuideRoot(), getPublicRoot()), "figure", name)
            },
            refcodeParam: {
                refcodeIndent: 4,
                refcodeIndentWarning: true
            }
        }
    );

    const props = {
        mdxPath: mdxPath,
        code: code,
        structure: getStructure(),
        content: Array.from(content.entries()),
        sections: sections
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
    const structure = parseStructure(props.structure)

    const article = structure.getExistArticle(props.code)
    const prereqs = []
    let first = true
    let number = 0
    for (const prereq of article.prerequisites) {
        if (!first) prereqs.push("、")
        else first = false
        prereqs.push(<HyperRefBlank href={`/${prereq}`} key={number++}>
            {structure.getArticleTitle(prereq)}</HyperRefBlank>)
    }
    // const article = props.virtualArticle.article!

    return <div className="mb-8">
        <div className="text-xl">{structure.getArticleChapterTitle(props.code)}</div>
        <div className="text-2xl text-gray-500 pt-1">{structure.getArticleTopicTitle(props.code)}</div>
        <div className="text-5xl mt-1 mb-4">{article.title}</div>

        <InformationItem name="作者" icon={faUserPen}>{article.authors.join("、")}</InformationItem>
        {
            article.contributors.length > 0 ?
                <InformationItem name="協作者" icon={faUserGroup} >{article.contributors.join("、")}</InformationItem>
                : <></>
        }
        {
            prereqs.length > 0 ?
                <InformationItem name="先備知識" icon={faBook} >{prereqs} </InformationItem>
                : <></>
        }

    </div>;
}

type ArticleFooterLinkProps = {
    side: "left" | "right"
    code: string | undefined
    structure: Structure
}
function ArticleFooterLink({ side, code, structure }: ArticleFooterLinkProps) {
    return <div className={`flex sm:w-64 ${side === "left" ? "justify-start" : "justify-end"}`}>
        {code ?
            <WrappedLink href={`/${code}`}
                className="text-indigo-500 block p-3 rounded-xl color-animation hover:text-indigo-700 hover:bg-indigo-100">
                <div className={`flex items-center ${side === "left" ? "justify-start" : "justify-end"}`}>
                    {side === "left" ? <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> : <></>}
                    <div className="max-sm:hidden">
                        {structure.getArticleTopicTitle(code)} /<br /> {structure.getArticleTitle(code)}
                    </div>
                    {side === "right" ? <FontAwesomeIcon icon={faChevronRight} className="ml-2" /> : <></>}
                </div>
            </WrappedLink>
            : <div className="p-3 text-gray-500">
                <FontAwesomeIcon icon={side === "left" ? faChevronLeft : faChevronRight} />
            </div>}
    </div>
}
function ArticleFooter(props: ArticleProps) {
    const structure = parseStructure(props.structure)
    const chapter = structure.getArticleChapter(props.code)
    let previousArticle: string | undefined = undefined
    let nextArticle: string | undefined = undefined
    const chapterObject = structure.getChapter(chapter)
    if (chapterObject) {
        let last: string | undefined = undefined
        for (const content of chapterObject.contents) {
            if (structure.getArticle(content)?.coming ?? true) continue
            if (last === props.code) nextArticle = content
            if (content === props.code) previousArticle = last
            last = content
        }
    }
    // console.log("test", previousArticle, nextArticle);
    return <div className="flex mt-20 justify-between items-center">
        <ArticleFooterLink side="left" code={previousArticle} structure={structure} />
        <div className="font-semibold p-3 text-nowrap">
            {structure.getExistArticle(props.code).title}
        </div>
        <ArticleFooterLink side="right" code={nextArticle} structure={structure} />
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
        reloadHighlightJs()
        reloadMathJax()
    }
    useEffect(() => {
        router.events.on("routeChangeComplete", reload);
        return () => {
            router.events.off("routeChangeComplete", reload);
        }
    }, [router]);
    const structure = parseStructure(props.structure)
    return (<>
        <Layout sidebar={true} title={structure.getArticleTitle(props.code)}>
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