import { ImportanceTag } from "@/components/common";
import { ContentBody, Layout } from "@/components/layout";
import { SectionEntry, SectionEntryProps } from "@/components/table-of-contents";
import { getStructure } from "@/lib/structure";
import { getChapters } from "@/lib/structure/chapters";
import { parseStructure } from "@/lib/structure/client";
import { getTopics } from "@/lib/structure/topics";
import { Article, StructureData } from "@/lib/structure/type";
import { H1Title } from "@/ntucpc-website-common-lib/components/basic";
import { getGAId } from "@/ntucpc-website-common-lib/lib/environments";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getTopics().map(topic => ({
        params: { topic: topic.code }
    }))
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
        code: params.topic as string
    }
    return { props: { props } };
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {
    const structure = parseStructure(props.structure)
    const topicObject = structure.getTopic(props.code)!
    const topicTitle = topicObject.title
    const chapters: SectionEntryProps[] = []
    const alone: Article[] = [] // no chapter, put at end
    topicObject.contents.forEach(articleCode => {
        const article = structure.getExistArticle(articleCode)
        const chapterCode = article.chapter
        const url = `/chapter/${chapterCode}`
        if (chapterCode) {
            if (chapters.length == 0 || chapters.at(-1)!.url !== url) {
                const chapter = structure.getChapter(chapterCode)!
                chapters.push({ url: url, title: `${chapter.number}. ${chapter.title}`, description: chapter.description, articles: [] })
            }
            chapters.at(-1)!.articles.push(article)
        }
        else alone.push(article)
    })
    if (alone.length > 0)
        chapters.push({ url: "", title: "沒有章節", description: "這些文章屬於的章節還沒決定 :(", articles: alone })
    return <Layout title={`${topicTitle}`} gaId={props.gaId}>
        <ContentBody>
            <H1Title>
                {`${topicTitle}`}
            </H1Title>
            <div className="text-gray-500">
                {topicObject.description}
            </div>
            <div className="mt-6">
                {chapters.map(props => <SectionEntry key={props.url} {...props} />)}
            </div>
        </ContentBody>
    </Layout>
}