import { ContentBody, Layout } from "@/components/layout";
import { ToCButton, ToCEntry, ToCSection, ToCSubsectionTitle } from "@/components/table-of-contents";
import { getArticle, getArticles } from "@/lib/articles";
import { VirtualChapter, getChapters, getFullChapterStructure } from "@/lib/chapters";
import { getTopic, getTopics } from "@/lib/topics";
import { H1Title, H2Title, H3Title, HyperRef, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type Props = {
    chapters: VirtualChapter[]
};

export const getStaticProps: GetStaticProps<{ props: Props }> = async ({ params }) => {
    const props = {
        chapters: getFullChapterStructure()
    }
    return { props: { props } };
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {

    const expandStates: [boolean, Dispatch<SetStateAction<boolean>>][] = [];
    for (const chapter of props.chapters) {
        expandStates.push(useState(true));
    }

    return (<Layout title="章節目錄">
        <ContentBody>
            <H1Title>
                章節目錄
            </H1Title>

            <div className="flex justify-start">
                <ToCButton text="全部展開" onClick={() => {
                    for (const [expand, setExpand] of expandStates) {
                        setExpand(true);
                    }
                }}/>
                <ToCButton text="全部收合" onClick={() => {
                    for (const [expand, setExpand] of expandStates) {
                        setExpand(false);
                    }
                }}/>
            </div>

            {props.chapters.map((virtualChapter, i) => {
                const toC: ReactNode[] = [];
                let number = 0;
                virtualChapter.topics.forEach((virtualTopic) => {
                    toC.push(<ToCSubsectionTitle key={number++} text={virtualTopic.displayTitle}/>)
                    virtualTopic.articles.forEach((virtualArticle) => {
                        toC.push(<ToCEntry key={number++} text={virtualArticle.articleDisplayTitle} url={`/${virtualArticle.code}`}/>)
                    })
                })
                return <ToCSection key={i} title={virtualChapter.displayTitle} expand={expandStates[i][0]} 
                        toggleExpand={() => {expandStates[i][1](!expandStates[i][0])}}>
                    {toC}
                </ToCSection>
            })}
        </ContentBody>
    </Layout>);
};