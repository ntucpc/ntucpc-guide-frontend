import { ContentBody, Layout } from "@/components/layout";
import { ToCButton, ToCEntry, ToCSection, ToCSubsectionTitle } from "@/components/table-of-contents";
import { getArticle } from "@/lib/articles";
import { VirtualTopicGroup, getFullTopicStructure, getTopic, getTopicGroups, getTopics } from "@/lib/topics";
import { H1Title, H2Title, HyperRef, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type Props = {
    topicGroups: VirtualTopicGroup[]
};

export const getStaticProps: GetStaticProps<{ props: Props }> = async ({ params }) => {
    const props = {
        topicGroups: getFullTopicStructure()
    }
    return { props: { props } };
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {

    const expandStates: [boolean, Dispatch<SetStateAction<boolean>>][] = [];
    for (const topicGroup of props.topicGroups) {
        expandStates.push(useState(true));
    }

    return (<Layout title="主題目錄">
        <ContentBody>
            <H1Title>
                主題目錄
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

            {props.topicGroups.map((topicGroup, i) => {
                const toC: ReactNode[] = [];
                let number = 0;
                topicGroup.topics.forEach((virtialTopic) => {
                    if (!topicGroup.single)
                        toC.push(<ToCSubsectionTitle key={number++} text={virtialTopic.displayTitle} />);
                    for (const article of virtialTopic.articles) {
                        toC.push(<ToCEntry key={number++} text={article.articleDisplayTitle} url={`/${article.code}`} />);
                    }
                })
                const title = topicGroup.single ? topicGroup.topics[0].displayTitle : topicGroup.title;
                return <ToCSection key={i} title={title} expand={expandStates[i][0]}
                        toggleExpand={() => {expandStates[i][1](!expandStates[i][0])}}>
                    {toC}
                </ToCSection>
            })}
        </ContentBody>
    </Layout>);
};