import { IconWrapper } from "@/components/icon";
import { ContentBody, Layout } from "@/components/layout";
import { getStructure } from "@/lib/structure";
import { parseStructure } from "@/lib/structure/client";
import { Article, Chapter, StructureData, Topic } from "@/lib/structure/type";
import { H1Title, H2Title, H3Title, HyperRef, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common";
import { getGAId } from "@/ntucpc-website-common-lib/lib/environments";
import { faAngleRight, faDoorOpen, faMinus, faPlus, faSeedling, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type ArticleInfo = {
    code: string
    title: string
}
type ChapterContent = {
    topic: string
    articles: ArticleInfo[]
}
type ChapterEntryProps = {
    code: string
    number: string
    title: string
    description: string
    icon: string
    iconColor: string
    list: ChapterContent[]
}
function ChapterEntry(props: ChapterEntryProps) {
    const transitionStyle = "transition duration-200"
    const router = useRouter()
    return <div className={`relative hover:bg-indigo-50 rounded-lg group ${transitionStyle}`}>
        <Link
            href={`/chapter/${props.code}`}
            className="absolute inset-0 z-1 pointer-events-auto"
        />
        <div className={`relative pointer-events-none flex flex-row gap-4 p-2 rounded-lg ${transitionStyle} my-3`}>
            <div className={`hidden sm:flex text-8xl text-gray-600 group-hover:text-${props.iconColor} ${transitionStyle}`}>
                <IconWrapper iconName={props.icon} />
            </div>
            <div className="flex-1">

                <div className="flex sm:hidden gap-2 items-center">
                    <div className="flex-1">
                        <div className="text-gray-500 text-md font-medium">
                            Chapter {props.number}.
                        </div>
                        <div className={`text-3xl font-bold group-hover:text-indigo-700 ${transitionStyle}`}>
                            {props.title}
                        </div>
                    </div>
                    <div className={`text-5xl items-center text-gray-600 group-hover:text-${props.iconColor} ${transitionStyle}`}>
                        <IconWrapper iconName={props.icon} />
                    </div>
                </div>
                <div className="hidden sm:block text-gray-500 text-md font-medium">
                    Chapter {props.number}.
                </div>
                <div className={`hidden sm:block text-3xl font-bold group-hover:text-indigo-700 ${transitionStyle}`}>
                    {props.title}
                </div>

                <div className="text-sm mt-1 text-gray-500">
                    {props.description}
                </div>
                <div className="mt-1">
                    {
                        props.list.map((sub, index) => {
                            return <div key={index} className="text-sm flex text-gray-700 mt-0.5 flex-col sm:flex-row items-start">
                                <div className="flex-shrink-0 flex flex-row gap-x-2 items-center min-w-28">
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <span className="font-medium">
                                        {sub.topic}
                                    </span>
                                </div>
                                <div className="flex-grow flex flex-row gap-x-4 flex-wrap ml-4">
                                    {sub.articles.map((article, index) => (
                                        <span key={index} className="whitespace-nowrap">
                                            {article.code ?
                                                <Link href={`/${article.code}`} className={`hover:text-indigo-500 ${transitionStyle} pointer-events-auto`}>
                                                    {article.title}
                                                </Link> :
                                                <span className="text-gray-400">{article.title}</span>}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        })
                    }
                </div>
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

    return (<Layout title="章節目錄" gaId={props.gaId}>
        <ContentBody>
            <H1Title>
                章節目錄
            </H1Title>

            {
                props.structure.chapters.map((chapter) => {
                    let number = chapter.number
                    let title = chapter.title
                    const list: ChapterContent[] = []
                    chapter.contents.forEach(article => {
                        const topic = structure.getArticleTopicTitle(article)
                        const isComing = structure.getExistArticle(article).coming
                        if (list.length == 0 || topic != list.at(-1)?.topic)
                            list.push({ topic: topic, articles: [] })
                        list.at(-1)?.articles.push({ code: isComing ? "" : article, title: structure.getArticleTitle(article) })
                    })

                    return <ChapterEntry
                        key={chapter.code}
                        code={chapter.code}
                        number={number}
                        title={title}
                        description={chapter.description}
                        icon={chapter.icon}
                        iconColor={chapter.iconColor}
                        list={list}
                    />
                })
            }
        </ContentBody>
    </Layout>);
};