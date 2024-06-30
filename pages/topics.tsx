import { Layout } from "@/components/layout";
import { getArticle } from "@/lib/articles";
import { getTopics } from "@/lib/topics";
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
type Props = {
    topics: TopicProps[]
};

export const getStaticProps: GetStaticProps<{props: Props}> = async ({ params }) => {

    const topics: TopicProps[] = []
    for (const topic of getTopics()) {
        const contents = []
        for (const content of topic.contents) {
            const contentCode = `${topic.code}/${content}`
            contents.push({
                title: getArticle(contentCode)?.title ?? contentCode,
                code: contentCode
            });
        }
        const obj: TopicProps = {
            title: `${topic.title}`,
            contents: contents
        };
        topics.push(obj);
    }

    const props = {
        topics: topics
    }
    return { props: { props } };
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (<Layout>
        <H1Title>
            主題目錄
        </H1Title>

        {props.topics.map((obj, i) => {
            return <div key={i}>
                <H2Title>{obj.title}</H2Title>
                <UnorderedList>
                    {obj.contents.map((content, j) => {
                        return <li key={j}>
                            <HyperRef href={`/${content.code}`}>{`${content.title}`}</HyperRef>
                        </li>
                    })}
                </UnorderedList>
            </div>
        })}
    </Layout>);
};