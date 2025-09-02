import { ImportanceTag } from "@/components/common";
import { ContentBody, Layout } from "@/components/layout";
import { SectionEntry, SectionEntryProps } from "@/components/table-of-contents";
import { getStructure } from "@/lib/structure";
import { getChapters } from "@/lib/structure/chapters";
import { parseStructure } from "@/lib/structure/client";
import { Article, StructureData } from "@/lib/structure/type";
import { H1Title } from "@/ntucpc-website-common-lib/components/basic";
import { getGAId } from "@/ntucpc-website-common-lib/lib/environments";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getChapters().map(chapter => ({
        params: { chapter: chapter.code }
    }));
    return {
        paths,
        fallback: false,
    };
}

type Props = {
    structure: StructureData
    gaId: string
    code: string
};

export const getStaticProps: GetStaticProps<{ props: Props }> = async ({ params }) => {
    if (!params) {
        throw Error("param doesn't exist in [chapter]");
    }
    const props = {
        structure: getStructure(),
        gaId: getGAId(),
        code: params.chapter as string
    }
    return { props: { props } };
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {
    const structure = parseStructure(props.structure)
    const chapterObject = structure.getChapter(props.code)!
    const chapterNumber = chapterObject.number
    const chapterTitle = chapterObject.title
    const topics: SectionEntryProps[] = []
    chapterObject.contents.forEach(articleCode => {
        const article = structure.getExistArticle(articleCode)
        const topicCode = article.topic
        if (topics.length == 0 || topics.at(-1)!.url !== `/${topicCode}`) {
            const topic = structure.getTopic(topicCode)!
            topics.push({ url: `/${topicCode}`, title: topic.title, description: topic.description, articles: [] })
        }
        topics.at(-1)!.articles.push(article)
    })
    return <Layout title={`Chapter ${chapterNumber}. ${chapterTitle}`} gaId={props.gaId}>
        <ContentBody>
            <H1Title>
                <div className="text-xl font-medium text-gray-500">
                    Chapter {`${chapterNumber}`}.
                </div>
                {`${chapterTitle}`}
            </H1Title>
            <div className="text-gray-500">
                {chapterObject.description}
            </div>
            <div className="mt-6">
                {topics.map(props => <SectionEntry key={props.url} {...props} />)}
            </div>
        </ContentBody>
    </Layout>
}