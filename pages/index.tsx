import { ContentBody, Layout } from '@/components/layout';
import { getArticle } from '@/lib/articles';
import { Contributor, SpecialThanksGroup, getContributors, getSpecialThanks } from '@/lib/contributors';
import { getTopic } from '@/lib/topics';
import { HyperRef, HyperRefBlank, Paragraph, UnorderedList } from '@/ntucpc-website-common-lib/components/basic';
import { WrappedLink } from '@/ntucpc-website-common-lib/components/common';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBookOpenReader, faHandshake, faQuestionCircle, faStairs, faStar, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ReactNode } from 'react';
import path from 'path';
import { getGuideRoot, getPublicRoot } from '@/lib/environment';

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

type ContributorCardProps = {
    contributor: Contributor,
    publicRoot: string
}
function ContributorCard({ contributor, publicRoot }: ContributorCardProps) {
    return <div className="h-fit w-full max-w-[25rem] md:w-[25rem] md:max-w-[46%] border m-3 p-4 md:flex items-center">
        <div className="md:mr-3 flex-shrink-0">
            <img src={path.join("/", publicRoot,
                "contributors", "photos", `${contributor.code}.png`)}
                className="w-20 rounded-full max-md:mx-auto max-md:mb-2" />
        </div>
        <div>
            <div className="flex items-end flex-nowrap">
                <div className="font-semibold text-lg text-nowrap">{contributor.name}</div>
                <div className="ml-2 text-sm text-gray-500 text-nowrap">/ {contributor.handle}</div>
            </div>
            <div className="mt-2">
                <UnorderedList>
                    {contributor.experience.map((entry, index) => {
                        return <li key={index} className="text-start">{entry}</li>
                    })}
                </UnorderedList>
            </div>
        </div>
    </div>
}

type SpecialThanksMemberProps = {
    name: string
    handle: string
}
function SpecialThanksMember({name, handle}: SpecialThanksMemberProps) {
    return <div className="flex items-end flex-nowrap mx-2">
        <div className="text-nowrap">{name}</div>
        <div className="ml-1 text-sm text-gray-500 text-nowrap">/ {handle}</div>
    </div>
}

type ArticleProps = {
    text: string;
    code: string;
}
type Props = {
    guideContents: ArticleProps[],
    contributors: Contributor[],
    publicRoot: string,
    isDev: boolean,
    specialThanks: SpecialThanksGroup[]
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
        guideContents: articles,
        contributors: getContributors(),
        publicRoot: getPublicRoot(),
        isDev: process.env.NODE_ENV === "development",
        specialThanks: getSpecialThanks()
    }
    return { props: { props } };
}

export default function Pages({ props }: InferGetStaticPropsType<typeof getStaticProps>) {
    const guideContents = []
    let number = 0;
    for (const content of props.guideContents) {
        guideContents.push(<div className="text-nowrap mx-3" key={number++}>
            <HyperRef href={`/${content.code}`}>{content.text}</HyperRef>
        </div>)
    }

    return (<Layout>
        <div className="bg-slate-100 py-8 items-center bg-home bg-no-repeat bg-center bg-auto">
            <div className="max-w-4xl mx-auto font-sans px-4">
                <div className="my-8">
                    <img src="/banner2.png" className="w-full max-w-xl mx-auto" />
                </div>

                <div className="text-center my-8 text-2xl text-black leading-normal">
                    由專業選手們撰寫的自學講義，<br/>帶領新手從零成為程式競賽高手！
                </div>

                <div className="flex justify-evenly h-20 items-center">
                    <ButtonLink text="章節目錄" color="rose" url="/chapters" />
                    <ButtonLink text="主題目錄" color="lime" url="/topics" />
                </div>
            </div>
        </div>
        <div className="bg-indigo-50 py-4 items-center">
            <div className="max-w-4xl mx-auto font-sans px-4">

                <div className="m-5 flex flex-wrap justify-evenly text-black">
                    <Feature icon={faHandshake} title="新手友善" />
                    <Feature icon={faBookOpenReader} title="適合自學" />
                    <Feature icon={faStar} title="專業團隊" />
                    <Feature icon={faStairs} title="由淺入深" />
                </div>

            </div>
        </div>
        <ContentBody>

            <SpecialTitle>網站簡介</SpecialTitle>

            <div className="text-center">
                不知道怎麼開始嗎？看看網站簡介吧！
            </div>

            <div className="flex flex-wrap justify-center my-4">
                {guideContents}
            </div>

            <SpecialTitle>團隊成員</SpecialTitle>

            <div className="flex flex-wrap justify-evenly items-center">
                {props.contributors.map((contributor, index) => {
                    return <ContributorCard key={index} contributor={contributor} publicRoot={props.publicRoot} />
                })}
            </div>

            <SpecialTitle>致謝</SpecialTitle>

            <div className="my-3 text-center">
                NTUCPC Guide 受到來自許多人與其他網站的啟發，特別感謝 <HyperRefBlank href="https://usaco.guide/">USACO Guide</HyperRefBlank> 和 <HyperRefBlank href="https://oi-wiki.org/">OI Wiki</HyperRefBlank> 給了我們很多啟發，也感謝所有在網路上公開程式競賽資源的人們。
            </div>

            {
                props.specialThanks.map((group, index) =>
                    <div key={index}>
                        <div className="my-3 text-center">{group.text}</div>
                        <div className="flex flex-wrap justify-center">
                            {group.members.map(([name, handle], index) =>
                                <SpecialThanksMember name={name} handle={handle} key={index} />
                            )}
                        </div>
                    </div>
                )
            }

            {
                props.isDev ? <>
                    <Paragraph>
                        You are in development mode!<br />
                        （Production 不會有這按鈕，請放心）
                    </Paragraph>
                    <div className="flex justify-start">
                        <ButtonLink text="全部東西" color="orange" url="/test/all" />
                        <ButtonLink text="題目" color="teal" url="/test/problems" />
                    </div>
                </> : <></>
            }
        </ContentBody>
    </Layout>);
};