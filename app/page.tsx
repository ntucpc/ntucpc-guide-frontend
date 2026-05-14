import { ContentBody, PageFooter } from '@/components/layout';
import { NavBar } from '@/components/navbar';
import { Contributor, getContributors, getSpecialThanks } from '@/lib/contributors';
import { HyperRefBlank, PARAGRAPH_SEP, Paragraph, UnorderedList } from '@/ntucpc-website-common-lib/components/basic';
import { WrappedLink } from '@/ntucpc-website-common-lib/components/common';
import { ReactNode } from 'react';
import { getPublicRoot } from '@/lib/environment';
import { getTopic } from '@/lib/structure/topics';
import { getArticle } from '@/lib/structure/articles';

type ButtonLinkProps = {
    text: string;
    color: string;
    url: string;
};

function ButtonLink({ text, color, url }: ButtonLinkProps) {
    return <div className={`items-center justify-center select-none`}>
        <WrappedLink href={url}
            className={`px-4 py-3 bg-${color}-500 font-semibold text-white rounded-full hover:bg-${color}-600 color-animation`}>
            {text}
        </WrappedLink>
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
    const photoUrl = `/${publicRoot}/contributors/photos/${contributor.code}.png`.replace(/\/+/g, '/');
    return <div className="h-fit w-full max-w-[25rem] md:w-[25rem] md:max-w-[46%] border m-3 p-4 md:flex items-center">
        <div className="md:mr-3 flex-shrink-0">
            <img src={photoUrl}
                className="w-20 rounded-full max-md:mx-auto max-md:mb-2" />
        </div>
        <div>
            <div className="flex items-end flex-nowrap">
                <div className="font-semibold text-lg text-nowrap">{contributor.name}</div>
                <div className="ml-2 text-sm text-gray-500 text-nowrap">/ {contributor.handle}</div>
            </div>
            <div className="mt-2 text-start">
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

export default function HomePage() {
    const guideTopic = getTopic("Guide");
    const guideContents: { text: string, code: string }[] = [];
    if (guideTopic) {
        for (const content of guideTopic.contents) {
            const article = getArticle(content);
            const articleTitle = article?.title ?? content;
            guideContents.push({ text: articleTitle, code: content });
        }
    }

    const contributors = getContributors();
    const publicRoot = getPublicRoot();
    const specialThanks = getSpecialThanks();
    const isDev = process.env.NODE_ENV === "development";

    return (
        <>
            <NavBar />
            <div className="bg-slate-100 py-8 items-center bg-home bg-no-repeat bg-center bg-auto">
                <div className="max-w-4xl mx-auto font-sans px-4">
                    <div className="my-8">
                        <img src="/banner2.png" className="w-full max-w-xl mx-auto" />
                    </div>

                    <div className="my-8 text-xl text-slate-700 font-medium leading-normal flex flex-wrap justify-center text-center">
                        <div className="text-nowrap">由專業選手們撰寫的自學講義，</div>
                        <div className="text-nowrap">帶領新手從零成為程式競賽高手！</div>
                    </div>

                    <div className="flex justify-evenly h-20 items-center">
                        <ButtonLink text="章節目錄" color="indigo" url="/chapters" />
                        <ButtonLink text="主題目錄" color="indigo" url="/topics" />
                    </div>
                </div>
            </div>
            <ContentBody>

                <SpecialTitle>網站簡介</SpecialTitle>

                <div className="text-center">
                    <p className={`${PARAGRAPH_SEP}`}>
                        NTUCPC Guide 是由專業程式競賽選手編寫的講義，提供適合新手自學、由淺入深的程式競賽學習資源。
                    </p>

                    <p>
                        不知道怎麼開始嗎？看看網站簡介吧！
                    </p>
                </div>

                <div className="flex flex-wrap justify-center my-4">
                    {guideContents.map((content, idx) => (
                        <div className="text-nowrap mx-1" key={idx}>
                            <WrappedLink className="block py-1 px-2 rounded-lg text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700 color-animation" 
                            href={`/${content.code}`}>{content.text}</WrappedLink>
                        </div>
                    ))}
                </div>

                <SpecialTitle>團隊成員</SpecialTitle>

                <div className="flex flex-wrap justify-evenly items-center">
                    {contributors.map((contributor, index) => {
                        return <ContributorCard key={index} contributor={contributor} publicRoot={publicRoot} />
                    })}
                </div>

                <SpecialTitle>致謝</SpecialTitle>

                <div className="my-3 text-center">
                    NTUCPC Guide 受到來自許多人與其他網站的啟發，特別感謝 <HyperRefBlank href="https://usaco.guide/">USACO Guide</HyperRefBlank> 和 <HyperRefBlank href="https://oi-wiki.org/">OI Wiki</HyperRefBlank> 給了我們很多啟發，也感謝所有在網路上公開程式競賽資源的人們。
                </div>

                {
                    specialThanks.map((group, index) =>
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
                    isDev && (
                        <>
                            <Paragraph>
                                You are in development mode!<br />
                                （Production 不會有這按鈕，請放心）
                            </Paragraph>
                            <div className="flex justify-start gap-4">
                                <ButtonLink text="全部東西" color="orange" url="/test/all" />
                                <ButtonLink text="題目" color="indigo" url="/test/problems" />
                            </div>
                        </>
                    )
                }
            </ContentBody>
            <PageFooter />
        </>
    );
}
