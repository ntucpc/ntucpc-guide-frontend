import { ContentBody, Layout } from "@/components/layout";
import { ToCEntry, ToCSection } from "@/components/table-of-contents";
import { getArticle, getArticles } from "@/lib/articles";
import { getChapters } from "@/lib/chapters";
import { getTopic, getTopics } from "@/lib/topics";
import { H1Title, H2Title, H3Title, HyperRef, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common";
import { GetStaticProps, InferGetStaticPropsType } from "next";

type ContentProps = {
    title: string,
    code: string
};
type TopicProps = {
    title: string,
    contents: ContentProps[]
};
type ChapterProps = {
    title: string,
    topics: TopicProps[]
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
        const topics: TopicProps[] = []
        let lastTopic = "";
        for (const content of chapter.contents) {
            const topicName = content.split("/")[0];
            const topic = getTopic(topicName);
            if (lastTopic !== topicName) {
                topics.push({title: topic?.title ?? topicName, contents: []});
                lastTopic = topicName;
            }
            topics.at(-1)!.contents.push({
                title: getArticle(content)?.title ?? content,
                code: content
            });
        }
        const obj: ChapterProps = {
            title: `${chapter.title}`,
            topics: topics
        };
        chapters.push(obj);
    }

    const props = {
        chapters: chapters
    }
    return { props: { props } };
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (<Layout title="章節目錄">
        <ContentBody>
            <H1Title>
                章節目錄
            </H1Title>

            {props.chapters.map((obj, i) => {
                const toC = [];
                let number = 0;
                for (const topic of obj.topics) {
                    toC.push(<ToCSection key={number++} text={topic.title} />);
                    for (const content of topic.contents) {
                        toC.push(<ToCEntry key={number++} text={content.title} url={`/${content.code}`} />);
                    }
                }
                return <div key={i}>
                    <H2Title>{obj.title}</H2Title>
                    {toC}
                </div>
            })}
        </ContentBody>
    </Layout>);
};