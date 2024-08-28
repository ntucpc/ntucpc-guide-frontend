import { ContentBody, Layout } from "@/components/layout";
import { ToCButton, ToCEntry, ToCSection, ToCSubsection } from "@/components/table-of-contents";
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

    const expandSetter: Dispatch<SetStateAction<boolean>>[] = []

    const sections: ReactNode[] = []
    props.topicGroups.forEach((topicGroup, i) => {
        const [expand, setExpand] = useState(true)
        expandSetter.push(setExpand)
        const toC: ReactNode[] = [];
        let number = 0;
        topicGroup.topics.forEach((virtialTopic) => {
            const subsection: ReactNode[] = []
            for (const article of virtialTopic.articles) {
                let url: string | undefined = `/${article.code}`
                if (article.article === null || article.article.coming)
                    url = undefined
                subsection.push(<ToCEntry key={number++} text={article.articleDisplayTitle} url={url} />);
            }
            if (topicGroup.single) {
                subsection.forEach((value) => toC.push(value))
                return
            }
            const [subexpand, setSubexpand] = useState(false)
            expandSetter.push(setSubexpand)
            toC.push(<ToCSubsection
                expand={subexpand}
                toggleExpand={() => { setSubexpand(!subexpand) }}
                key={number++}
                title={virtialTopic.displayTitle}>
                {subsection}
            </ToCSubsection>)
        })
        const title = topicGroup.single ? topicGroup.topics[0].displayTitle : topicGroup.title;
        sections.push(<ToCSection key={i} title={title} expand={expand}
            toggleExpand={() => { setExpand(!expand) }}>
            {toC}
        </ToCSection>)
    })

    return (<Layout title="主題目錄">
        <ContentBody>
            <H1Title>
                主題目錄
            </H1Title>

            <div className="flex justify-start">
                <ToCButton text="全部展開" onClick={() => {
                    for (const setExpand of expandSetter) {
                        setExpand(true);
                    }
                }} />
                <ToCButton text="全部收合" onClick={() => {
                    for (const setExpand of expandSetter) {
                        setExpand(false);
                    }
                }} />
            </div>

            {sections}

        </ContentBody>
    </Layout>);
};