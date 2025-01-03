import { ContentBody, Layout } from "@/components/layout";
import { ToCButton, ToCEntry, ToCSection, ToCSubsection } from "@/components/table-of-contents";
import { getStructure } from "@/lib/structure";
import { parseStructure } from "@/lib/structure/client";
import { StructureData } from "@/lib/structure/type";
import { H1Title, H2Title, HyperRef, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { getGAId } from "@/ntucpc-website-common-lib/lib/environments";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

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
    const expandSetter: Dispatch<SetStateAction<boolean>>[] = []

    const sections: ReactNode[] = []
    props.structure.topicGroups.forEach((topicGroup, i) => {
        const [expand, setExpand] = useState(true)
        expandSetter.push(setExpand)
        const toC: ReactNode[] = [];
        let number = 0;
        topicGroup.topics.forEach((topic) => {
            const topicObject = structure.getTopic(topic)
            if (!topicObject) {
                console.log(`Warning: invalid topic ${topic} in topic table`)
            }
            const subsection: ReactNode[] = []
            for (const article of topicObject!.contents) {
                const articleObject = structure.getArticle(article)
                let url: string | undefined = `/${article}`
                if (!articleObject || articleObject.coming)
                    url = undefined
                subsection.push(<ToCEntry key={number++} text={articleObject!.title} url={url} />);
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
                title={topicObject!.title}>
                {subsection}
            </ToCSubsection>)
        })
        const title = topicGroup.single ? structure.getTopicTitle(topicGroup.topics[0]) : topicGroup.title;
        sections.push(<ToCSection key={i} title={title} expand={expand}
            toggleExpand={() => { setExpand(!expand) }}>
            {toC}
        </ToCSection>)
    })

    return (<Layout title="主題目錄" gaId={props.gaId}>
        <ContentBody>
            <H1Title>
                主題目錄
            </H1Title>

            <div className="flex justify-start">
                <ToCButton text="全部展開" icon={faPlus} onClick={() => {
                    for (const setExpand of expandSetter) {
                        setExpand(true);
                    }
                }} />
                <ToCButton text="全部收合" icon={faMinus} onClick={() => {
                    for (const setExpand of expandSetter) {
                        setExpand(false);
                    }
                }} />
            </div>

            {sections}

        </ContentBody>
    </Layout>);
};