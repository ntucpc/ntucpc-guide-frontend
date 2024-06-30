import { Article } from "@/lib/articles"
import { Chapter } from "@/lib/chapters"
import { Topic } from "@/lib/topics"
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common"
import { ArticleProps } from "@/pages/[topic]/[article]"
import { faAnglesRight, faX, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction, useState } from "react"

type SidebarTabProps = {
    text: string,
    onClick: MouseEventHandler<HTMLDivElement>,
    active: boolean
}

type SidebarEntryProps = {
    children: ReactNode,
    href: string,
    active: boolean
}

enum Tab {
    Article,
    Chapter,
    Topic
}

function SidebarTab(props: SidebarTabProps) {
    return <div className={`cursor-pointer text-nowrap mx-1 px-3 py-2 border border-gray-500
                hover:bg-gray-200 ${props.active ? "bg-gray-200" : ""}`} onClick={props.onClick}>
        {props.text}
    </div>
}

function SidebarEntry(props: SidebarEntryProps) {
    return <div className={`w-full border-l-4 hover:border-indigo-400 ${props.active ? "border-indigo-400" : "border-gray-200"}`}>
        <WrappedLink className="px-1 py-2 block" href={props.href}>{props.children}</WrappedLink>
    </div>
}

export function Sidebar(props: ArticleProps) {
    const [displayTab, setDisplayTab] = useState(Tab.Article);
    const [displaySidebar, setDisplaySidebar] = useState(false);

    const chapterToC = (() => {
        const toC = [];
        let num = 0;
        for (const article of props.chapterArticles) {
            toC.push(<SidebarEntry key={num++} href={`/${article.code}`} active={article.code === props.article.code}>{article.title}</SidebarEntry>)
        }
        return toC;
    })();
    const topicToC = (() => {
        const toC = [];
        let num = 0;
        for (const article of props.topicArticles) {
            toC.push(<SidebarEntry key={num++} href={`/${article.code}`} active={article.code === props.article.code}>{article.title}</SidebarEntry>)
        }
        return toC;
    })();
    const articleToC = (() => {
        const toC = [];
        let num = 0;
        for (const section of props.sections) {
            if (section.depth >= 3) continue;

            toC.push(<SidebarEntry key={num++} href={`#section-${section.code}`} active={false}>
                <div className={section.depth == 2 ? "ml-3" : ""}>{section.text}</div>
            </SidebarEntry>);
        }
        return toC;
    })();
    let title: string;
    let toC: ReactNode[] = [];
    switch(displayTab) {
        case Tab.Article:
            title = props.article.title;
            toC = articleToC;
            break;
        case Tab.Chapter:
            title = props.chapter?.title ?? "Chapter ???";
            toC = chapterToC;
            break;
        case Tab.Topic:
            title = props.topic?.title ?? props.topicName;
            toC = topicToC;
            break;
    }

    return <>
        <div className={`fixed w-full lg:hidden text-black bg-slate-50 z-40 p-3 cursor-pointer ${displaySidebar ? "" : ""}`}
                onClick={() => {setDisplaySidebar(true)}}>
            <FontAwesomeIcon className="mr-1" icon={faAnglesRight}/> 打開目錄
        </div>
        <aside className={`fixed text-black z-50 w-60 h-screen pb-40 overflow-y-auto bg-slate-50 ${displaySidebar ? "" : "max-lg:hidden"}`}>
            <div className="m-5">
                <div className="flex justify-center">
                    <SidebarTab text="本文" onClick={() => setDisplayTab(Tab.Article)} active={displayTab === Tab.Article} />
                    <SidebarTab text="章節" onClick={() => setDisplayTab(Tab.Chapter)} active={displayTab === Tab.Chapter} />
                    <SidebarTab text="主題" onClick={() => setDisplayTab(Tab.Topic)} active={displayTab === Tab.Topic} />
                </div>
                <div>
                    <div className="text-lg font-semibold mt-5 mb-3">
                        {title}
                    </div>

                    {toC}
                </div>
            </div>
        </aside>
        <div className={`fixed left-60 top-20 z-50 w-10 h-10 flex items-center justify-center cursor-pointer lg:hidden ${displaySidebar ? "" : "hidden"}`}
                onClick={() => {setDisplaySidebar(false)}}>
            <FontAwesomeIcon className="text-lg" icon={faXmark} />
        </div>
    </>
}