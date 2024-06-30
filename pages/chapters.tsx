import { ContentBody, Layout } from "@/components/layout";
import { getArticle, getArticles } from "@/lib/articles";
import { getChapters } from "@/lib/chapters";
import { getTopic, getTopics } from "@/lib/topics";
import { H1Title, H2Title, HyperRef, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common";
import { GetStaticProps, InferGetStaticPropsType } from "next";

type ContentProps = {
    topic: string,
    title: string,
    code: string
};
type ChapterProps = {
    title: string,
    contents: ContentProps[]
};
type Props = {
    chapters: ChapterProps[]
};

export const getStaticProps: GetStaticProps<{ props: Props }> = async ({ params }) => {
    // console.log(getChapters())
    // console.log(getArticles())
    // console.log(getTopics())

    const chapters: ChapterProps[] = []
    for (const chapter of getChapters()) {
        const contents = []
        for (const content of chapter.contents) {
            const topicName = content.split("/")[0];
            const topic = getTopic(topicName);
            contents.push({
                topic: topic?.title ?? topicName,
                title: getArticle(content)?.title ?? content,
                code: content
            });
        }
        const obj: ChapterProps = {
            title: `${chapter.title}`,
            contents: contents
        };
        chapters.push(obj);
    }

    const props = {
        chapters: chapters
    }
    return { props: { props } };
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (<Layout>
        <ContentBody>
            <H1Title>
                章節目錄
            </H1Title>

            {props.chapters.map((obj, i) => {
                return <div key={i}>
                    <H2Title>{obj.title}</H2Title>
                    <UnorderedList>
                        {obj.contents.map((content, j) => {
                            return <li key={j}>
                                <HyperRef href={`/${content.code}`} target="_self">{`${content.topic} - ${content.title}`}</HyperRef>
                            </li>
                        })}
                    </UnorderedList>
                </div>
            })}
        </ContentBody>
    </Layout>);
};