import { ContentBody, Layout } from "@/components/layout";
import { getStructure } from "@/lib/structure";
import { parseStructure } from "@/lib/structure/client";
import { StructureData } from "@/lib/structure/type";
import { H1Title, H2Title, HyperRef, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { getGAId } from "@/ntucpc-website-common-lib/lib/environments";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type ArticleInfo = {
    code: string | undefined
    title: string
}
type TopicEntryProps = {
    code: string
    title: string
    description: string
    groupTitle: string | undefined
    articles: ArticleInfo[]
}
function TopicEntry(props: TopicEntryProps) {
    const transitionStyle = "transition duration-200"
    return <div className={`md:w-1/2 relative group hover:bg-indigo-50 my-3 p-2 rounded-lg ${transitionStyle}`}>
        <Link
            href={`/${props.code}`}
            className="z-1 absolute inset-0 pointer-events-auto"
        />
        <div className="pointer-events-none relative">
            <div className={`text-3xl font-bold group-hover:text-indigo-700 ${transitionStyle}`}>
                {props.title}
            </div>
            <div className="text-sm mt-1 text-gray-500">
                {props.description}
            </div>
            <div className="text-sm flex flex-row gap-x-4 flex-wrap mt-1 text-gray-700">
                {props.articles.map((article) => {
                    return <span key={article.code} className="whitespace-nowrap">
                        {article.code ?
                            <Link href={`/${article.code}`} className={`hover:text-indigo-500 ${transitionStyle} pointer-events-auto`}>
                                {article.title}
                            </Link> :
                            <span className="text-gray-400">{article.title}</span>}
                    </span>
                })}
            </div>
        </div>
    </div>
}

type Props = {
    structure: StructureData
    gaId: string
};

export const getStaticProps: GetStaticProps<{ props: Props }> = async ({ params }) => {
    const props = {
        structure: getStructure(),
        gaId: getGAId()
    }
    return { props: { props } };
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {
    const structure = parseStructure(props.structure)

    const topics: TopicEntryProps[] = []
    props.structure.topicGroups.forEach((topicGroup) => {
        topicGroup.topics.forEach((topicCode) => {
            const topic = structure.getTopic(topicCode)!
            topics.push({
                code: topicCode,
                title: topic.title,
                groupTitle: topicGroup.single ? undefined : topicGroup.title,
                description: topic.description,
                articles: topic.contents.map((articleCode) => {
                    const article = structure.getExistArticle(articleCode)
                    return {
                        code: article.coming ? undefined : article.code,
                        title: article.title
                    }
                })
            })
        })
    })


    return (<Layout title="主題目錄" gaId={props.gaId}>
        <ContentBody>
            <H1Title>
                主題目錄
            </H1Title>

            <div className="md:flex md:flex-row md:flex-wrap">
                {
                    topics.map((topic) => <TopicEntry key={topic.code} {...topic} />)
                }
            </div>

        </ContentBody>
    </Layout>);
};