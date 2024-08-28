import { ContentBody, Layout } from "@/components/layout";
import { ToCButton, ToCEntry, ToCSection, ToCSubsection } from "@/components/table-of-contents";
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

    const expandSetter: Dispatch<SetStateAction<boolean>>[] = []

    const sections: ReactNode[] = []
    props.chapters.forEach((virtualChapter, i) => {
        const [expand, setExpand] = useState(true)
        expandSetter.push(setExpand)
        const toC: ReactNode[] = [];
        let number = 0;
        virtualChapter.topics.forEach((virtualTopic) => {
            const subsection: ReactNode[] = []
            const [subexpand, setSubexpand] = useState(false)
            expandSetter.push(setSubexpand)
            virtualTopic.articles.forEach((virtualArticle) => {
                let url: string | undefined = `/${virtualArticle.code}`
                if (virtualArticle.article === null || virtualArticle.article.coming)
                    url = undefined
                subsection.push(<ToCEntry key={number++} text={virtualArticle.articleDisplayTitle}
                    url={url} />)
            })
            toC.push(<ToCSubsection
                expand={subexpand}
                toggleExpand={() => { setSubexpand(!subexpand) }}
                key={number++}
                title={virtualTopic.displayTitle}>
                {subsection}
            </ToCSubsection>)
        })
        sections.push(<ToCSection key={i} title={virtualChapter.displayTitle} expand={expand}
            toggleExpand={() => { setExpand(!expand) }}>
            {toC}
        </ToCSection>)
    })

    return (<Layout title="章節目錄">
        <ContentBody>
            <H1Title>
                章節目錄
            </H1Title>

            <div className="flex justify-start">
                <ToCButton text="全部展開" onClick={() => {
                    for (const setExpand of expandSetter) {
                        setExpand(true)
                    }
                }} />
                <ToCButton text="全部收合" onClick={() => {
                    for (const setExpand of expandSetter) {
                        setExpand(false)
                    }
                }} />
            </div>

            {sections}
        </ContentBody>
    </Layout>);
};