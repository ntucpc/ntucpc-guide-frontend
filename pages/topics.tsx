import { ContentBody, Layout } from "@/components/layout";
import { ToCEntry, ToCSection } from "@/components/table-of-contents";
import { getArticle } from "@/lib/articles";
import { getTopic, getTopicGroups, getTopics } from "@/lib/topics";
import { H1Title, H2Title, HyperRef, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { GetStaticProps, InferGetStaticPropsType } from "next";

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

export const getStaticProps: GetStaticProps<{props: Props}> = async ({ params }) => {

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
    return (<Layout>
        <ContentBody>
            <H1Title>
                主題目錄
            </H1Title>

            {props.topicGroups.map((topicGroup, i) => {
                const toC = [];
                let number = 0;
                for (const topic of topicGroup.topics) {
                    if (!topicGroup.single)
                        toC.push(<ToCSection key={number++} text={topic.title}/>);
                    for (const article of topic.contents) {
                        toC.push(<ToCEntry key={number++} text={article.title} url={`/${article.code}`}/>);
                    }
                }
                return <div key={i}>
                    <H2Title>{topicGroup.single ? topicGroup.topics[0].title : topicGroup.title}</H2Title>
                    {toC}
                </div>
            })}
        </ContentBody>
    </Layout>);
};