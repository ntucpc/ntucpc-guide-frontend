import { ContentBody, Layout } from "@/components/layout";
import { ToCButton, ToCEntry, ToCSection, ToCSubsection } from "@/components/table-of-contents";
import { getStructure } from "@/lib/structure";
import { parseStructure } from "@/lib/structure/client";
import { Article, StructureData, Topic } from "@/lib/structure/type";
import { H1Title, H2Title, H3Title, HyperRef, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type Props = {
    structure: StructureData
};

export const getStaticProps: GetStaticProps<{ props: Props }> = async ({ params }) => {
    const props = {
        structure: getStructure()
    }
    return { props: { props } };
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {

    const structure = parseStructure(props.structure)
    const expandSetter: Dispatch<SetStateAction<boolean>>[] = []

    const sections: ReactNode[] = []
    props.structure.chapters.forEach((chapter, i) => {
        const [expand, setExpand] = useState(true)
        expandSetter.push(setExpand)
        const toC: ReactNode[] = [];
        let number = 0;

        const topics: [Topic, Article[]][] = []
        chapter.contents.forEach((content) => {
            const topicObject = structure.getArticleTopic(content)
            if (!topicObject) {
                console.log(`Warning: invalid content ${content} in chapter ${chapter.code}`)
                return
            }
            if (topics.length === 0 || topicObject !== topics.at(-1)![0])
                topics.push([topicObject, []])
            topics.at(-1)![1].push(structure.getExistArticle(content))
        })

        topics.forEach(([topic, articles]) => {
            const subsection: ReactNode[] = []
            const [subexpand, setSubexpand] = useState(false)
            expandSetter.push(setSubexpand)
            articles.forEach((article) => {
                let url: string | undefined = `/${article.code}`
                if (article.article === null || article.coming)
                    url = undefined
                subsection.push(<ToCEntry key={number++} text={article.title}
                    url={url} />)
            })
            toC.push(<ToCSubsection
                expand={subexpand}
                toggleExpand={() => { setSubexpand(!subexpand) }}
                key={number++}
                title={topic.title}>
                {subsection}
            </ToCSubsection>)
        })
        sections.push(<ToCSection key={i} title={chapter.title} expand={expand}
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