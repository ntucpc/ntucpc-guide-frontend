import { ContentBody, Layout } from "@/components/layout";
import { ToCButton, ToCEntry, ToCSection, ToCSubsectionTitle } from "@/components/table-of-contents";
import { getArticle } from "@/lib/articles";
import { getTopic, getTopicGroups, getTopics } from "@/lib/topics";
import { H1Title, H2Title, HyperRef, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Dispatch, SetStateAction, useState } from "react";

type ContentProps = {
    title: string,
    code: string
};
type TopicProps = {
    title: string,
    contents: ContentProps[]
};
type TopicGroupProps = {
    single: boolean,
    title: string,
    topics: TopicProps[]
};
type Props = {
    topicGroups: TopicGroupProps[]
};

export const getStaticProps: GetStaticProps<{ props: Props }> = async ({ params }) => {

    const topicGroups: TopicGroupProps[] = []
    for (const topicGroup of getTopicGroups()) {
        topicGroups.push({
            single: topicGroup.single,
            title: topicGroup.title,
            topics: topicGroup.topics.map((topicName) => {
                const topic = getTopic(topicName);
                return {
                    title: topic?.title ?? topicName,
                    contents: topic?.contents.map((articleName) => {
                        const articleCode = `${topicName}/${articleName}`;
                        const article = getArticle(articleCode);
                        return {
                            title: article?.title ?? articleName,
                            code: articleCode
                        }
                    }) ?? []
                }
            })
        });
    }

    const props = {
        topicGroups: topicGroups
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
                const toC = [];
                let number = 0;
                for (const topic of topicGroup.topics) {
                    if (!topicGroup.single)
                        toC.push(<ToCSubsectionTitle key={number++} text={topic.title} />);
                    for (const article of topic.contents) {
                        toC.push(<ToCEntry key={number++} text={article.title} url={`/${article.code}`} />);
                    }
                }
                const title = topicGroup.single ? topicGroup.topics[0].title : topicGroup.title;
                return <ToCSection key={i} title={title} expand={expandStates[i][0]}
                        toggleExpand={() => {expandStates[i][1](!expandStates[i][0])}}>
                    {toC}
                </ToCSection>
            })}
        </ContentBody>
    </Layout>);
};