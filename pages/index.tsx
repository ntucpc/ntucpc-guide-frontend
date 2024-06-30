import { Layout } from '@/components/layout';
import { getArticle } from '@/lib/articles';
import { getTopic } from '@/lib/topics';
import { HyperRef, Paragraph } from '@/ntucpc-website-common-lib/components/basic';
import { WrappedLink } from '@/ntucpc-website-common-lib/components/common';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBookOpenReader, faHandshake, faQuestionCircle, faStairs, faStar, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ReactNode } from 'react';

type ButtonLinkProps = {
    text: string;
    color: string;
    url: string;
};

function ButtonLink({ text, color, url }: ButtonLinkProps) {
    return <div className={`items-center justify-center`}>
        <WrappedLink href={url}
            className={`px-4 py-3 bg-${color}-500 text-white hover:bg-${color}-600
                             transition duration-150 ease-out hover:ease-in`}>
            {text}
        </WrappedLink>
    </div>
}

type FeatureProps = {
    icon: IconDefinition;
    title: string;
};

function Feature({ icon, title }: FeatureProps) {
    return <div className="items-center text-center w-1/2 sm:w-1/4 my-3">
        <div className="text-8xl text-indigo-500">
            <FontAwesomeIcon icon={icon} />
        </div>
        <div className="mt-3 text-xl">{title}</div>
    </div>
}

type SpecialTitleProps = {
    children: ReactNode;
}
function SpecialTitle({ children }: SpecialTitleProps) {
    return <div className="text-center font-semibold text-3xl mb-5 mt-7">{children}</div>;
}

type ArticleProps = {
    text: string;
    code: string;
}
type Props = {
    guideContents: ArticleProps[]
}
export const getStaticProps: GetStaticProps<{ props: Props }> = async ({ params }) => {
    const guideTopic = getTopic("Guide");
    const articles: ArticleProps[] = [];
    if (guideTopic) {
        for (const content of guideTopic.contents) {
            const article = getArticle(`Guide/${content}`);
            const articleTitle = article?.title ?? content;
            articles.push({ text: articleTitle, code: `Guide/${content}` });
        }
    }
    const props = {
        guideContents: articles
    }
    return { props: { props } };
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {
    const guideContents = []
    for (const content of props.guideContents) {
        guideContents.push(<div className="text-nowrap mx-3">
            <HyperRef href={`/${content.code}`}>{content.text}</HyperRef>
        </div>)
    }

    return (<Layout>

        <div className="my-8">
            <img src="/banner2.png" className="w-full max-w-xl mx-auto" />
        </div>

        <div className="text-center my-8 text-3xl">
            這是一個標語但我想不到要寫什麼！
        </div>

        <div className="flex justify-evenly h-20 items-center">
            <ButtonLink text="章節目錄" color="rose" url="/chapters" />
            <ButtonLink text="主題目錄" color="lime" url="/topics" />
        </div>

        <div className="m-5 flex flex-wrap justify-evenly">
            <Feature icon={faHandshake} title="新手友善" />
            <Feature icon={faBookOpenReader} title="適合自學" />
            <Feature icon={faStar} title="專業團隊" />
            <Feature icon={faStairs} title="由淺入深" />
        </div>

        <SpecialTitle>網站簡介</SpecialTitle>

        <div className="text-center">
            不知道怎麼開始嗎？看看網站簡介吧！
        </div>

        <div className="flex flex-wrap justify-center my-4">
            {guideContents}
        </div>

        <SpecialTitle>團隊成員</SpecialTitle>

        <Paragraph>
            喔不，這裡還在施工，你是不是需要這個
        </Paragraph>
        <ButtonLink text="全部東西" color="orange" url="/all" />
    </Layout>);
};