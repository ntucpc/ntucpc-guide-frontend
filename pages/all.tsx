import { ContentBody, Layout } from "@/components/layout";
import { getArticles } from "@/lib/articles";
import { getTopic } from "@/lib/topics";
import { H1Title, HyperRef, UnorderedList } from "@/ntucpc-website-common-lib/components/basic";
import { GetStaticProps, InferGetStaticPropsType } from "next";

type ArticleProps = {
    code: string;
    title: string;
};
type Props = {
    articles: ArticleProps[];
};

export const getStaticProps: GetStaticProps<{props: Props}> = async ({ params }) => {

    const articles = getArticles().map((article) => ({
        code: article.code,
        title: `${getTopic(article.topic)?.title ?? article.topic} / ${article.title}`
    }));

    const props = {
        articles: articles
    }
    return { props: { props } };
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (<Layout>
        <ContentBody>
            <H1Title>
                全部東西
            </H1Title>

            <UnorderedList>
                {
                    props.articles.map((article, i) => {
                        return <li key={i}><HyperRef href={`/${article.code}`}>{article.title}</HyperRef></li>
                    })
                }
            </UnorderedList>
        </ContentBody>
    </Layout>);
};