import { Article, getVirtualArticle } from "@/lib/articles"
import { Chapter } from "@/lib/chapters"
import { Topic, VirtualTopic } from "@/lib/topics"
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common"
import { reloadMathJax } from "@/ntucpc-website-common-lib/scripts/reload"
import { ArticleProps } from "@/pages/[topic]/[article]"
import { faAnglesRight, faArrowLeft, faChevronLeft, faChevronRight, faX, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction, use, useEffect, useState } from "react"

type SidebarTabProps = {
    text: string,
    onClick: MouseEventHandler<HTMLDivElement>,
    active: boolean
}

type SidebarEntryProps = {
    children: ReactNode,
    effect: string | (() => (void)),
    active: boolean
}

type SidebarSectionProps = {
    text: string
}

type SidebarTitleProps = {
    text: string
    left?: (() => (void)) | undefined
    right?: (() => (void)) | undefined
    page?: boolean
}

type SidebarTableButtonProps = {
    effect: () => (void)
    children: ReactNode
}

type SidebarPageButtonProps = {
    effect: (() => (void)) | undefined
    children: ReactNode
}

enum Tab {
    Article,
    Chapter,
    Topic
}

function SidebarTab(props: SidebarTabProps) {
    return <div className={`cursor-pointer text-nowrap px-3 py-2 font-semibold
                hover:bg-indigo-100 hover:text-indigo-600 select-none
                ${props.active ? "bg-indigo-100 text-indigo-600" : ""}`} onClick={props.onClick}>
        {props.text}
    </div>
}

function SidebarTableButton(props: SidebarTableButtonProps) {
    return <div className="mb-1">
        <span className="px-2 py-1 text-indigo-600 font-semibold select-none hover:bg-indigo-100 cursor-pointer" onClick={props.effect}>
            {props.children}
        </span>
    </div>
}

function SidebarPageButton(props: SidebarPageButtonProps) {
    return <span className={`px-2 rounded ${props.effect ? "text-indigo-500 hover:text-indigo-700 hover:bg-indigo-100 cursor-pointer"
        : "text-gray-500"} select-none`}
        onClick={props.effect}>{props.children}</span>
}

function SidebarTitle(props: SidebarTitleProps) {
    return <div className={`text-lg font-semibold mb-3 flex justify-between ${!props.page ? "pl-2" : ""}`}>
        {props.page ? <SidebarPageButton effect={props.left}><FontAwesomeIcon icon={faChevronLeft} /></SidebarPageButton> : <></>}
        {props.text}
        {props.page ? <SidebarPageButton effect={props.right}><FontAwesomeIcon icon={faChevronRight} /></SidebarPageButton> : <></>}
    </div>
}

function SidebarSection(props: SidebarSectionProps) {
    return <div className="font-semibold mb-2 mt-3">{props.text}</div>;
}

function SidebarEntry(props: SidebarEntryProps) {
    return <div className={`w-full border-l-4 hover:border-indigo-600 hover:bg-indigo-100 hover:text-indigo-600 hover:font-semibold
            ${props.active ? "border-indigo-600 bg-indigo-100 text-indigo-600 font-semibold" : 
                "border-gray-200"}`}>
        {typeof props.effect === "string" ? 
            <WrappedLink className="pl-2 py-2 block" href={props.effect}>{props.children}</WrappedLink> :
            <div className="pl-2 py-2 cursor-pointer" onClick={props.effect}>{props.children}</div>
        }
    </div>
}

export function Sidebar(props: ArticleProps) {
    const allTopics: VirtualTopic[] = []
    props.topicStructure.forEach((virtualTopicGroup) => {
        virtualTopicGroup.topics.forEach((virtualTopic) => 
            allTopics.push(virtualTopic) 
        )
    })
    const [displayTab, setDisplayTab] = useState(Tab.Article)
    const [displaySidebar, setDisplaySidebar] = useState(false)
    const articleChapter = props.chapterStructure.find(
            (chapter) => chapter.code === props.virtualArticle.chapterCode)
    const articleTopic = allTopics.find(
            (topic) => topic.code === props.virtualArticle.topicCode)
    const [activeChapter, setActiveChapter] =
        useState(articleChapter)
    const [activeTopic, setActiveTopic] =
        useState(articleTopic)

    const router = useRouter()
    const resetActive = () => {
        setActiveChapter(articleChapter)
        setActiveTopic(articleTopic)
    }
    useEffect(() => {
        router.events.on("routeChangeComplete", resetActive);
        return () => {
            router.events.off("routeChangeComplete", resetActive);
        }
    }, [router])

    useEffect(() => {
        reloadMathJax(true)
    }, [displayTab, displaySidebar, activeChapter, activeTopic])

    const chapterToC = (() => {
        const toC: ReactNode[] = []
        let num = 0
        if (activeChapter) {
            const index = props.chapterStructure.findIndex((chapter) => chapter.code === activeChapter.code)
            const previousChapter = index > 0 ? props.chapterStructure[index - 1] : undefined
            const nextChapter = index + 1 < props.chapterStructure.length ? props.chapterStructure[index + 1] : undefined

            toC.push(<SidebarTableButton key={num++} effect={() => { setActiveChapter(undefined) }}>章節目錄</SidebarTableButton>)

            toC.push(<SidebarTitle key={num++} text={activeChapter.displayTitle}
                page={true} 
                left={previousChapter ? () => { setActiveChapter(previousChapter) } : undefined}
                right={nextChapter ? () => {setActiveChapter(nextChapter)} : undefined} />)
            
            activeChapter.topics.forEach((virtualTopic) =>{
                toC.push(<SidebarSection key={num++} text={virtualTopic.displayTitle} />)
                virtualTopic.articles.forEach((virtualArticle) => {
                    toC.push(<SidebarEntry key={num++} effect={`/${virtualArticle.code}`}
                                active={virtualArticle.code === props.virtualArticle.code}
                                >{virtualArticle.articleDisplayTitle}</SidebarEntry>)
                })
            })
        }
        else {
            toC.push(<SidebarTableButton key={num++} effect={() => {setActiveChapter(articleChapter)}}>
                <FontAwesomeIcon icon={faChevronLeft}/> {articleChapter?.displayTitle}
            </SidebarTableButton>)
            toC.push(<SidebarTitle key={num++} text="章節目錄" />)

            props.chapterStructure.forEach((chapter) => {
                toC.push(<SidebarEntry key={num++} effect={() => {setActiveChapter(chapter)}}
                        active={chapter.code === props.virtualArticle.chapterCode}>
                    {chapter.displayTitle}
                </SidebarEntry>)
            })
        }
        return toC;
    })();
    const topicToC = (() => {
        const toC: ReactNode[] = [];
        let num = 0
        if (activeTopic) {
            toC.push(<SidebarTableButton key={num++} effect={() => { setActiveTopic(undefined) }}>主題目錄</SidebarTableButton>)
            toC.push(<SidebarTitle key={num++} text={activeTopic.displayTitle} />)
            activeTopic.articles.forEach((virtualArticle) => {
                toC.push(<SidebarEntry key={num++} effect={`/${virtualArticle.code}`}
                    active={virtualArticle.code === props.virtualArticle.code}>
                    {virtualArticle.articleDisplayTitle}
                </SidebarEntry>)
            })
        }
        else {
            toC.push(<SidebarTableButton key={num++} effect={() => {setActiveTopic(articleTopic)}}>
                <FontAwesomeIcon icon={faChevronLeft}/> {articleTopic?.displayTitle}
            </SidebarTableButton>)
            toC.push(<SidebarTitle key={num++} text="主題目錄" />)
            let lastGroup = false
            props.topicStructure.forEach((topicGroup) => {
                if (topicGroup.single) {
                    if (lastGroup) {
                        toC.push(<SidebarSection key={num++} text="" />)
                        lastGroup = false
                    }
                    const topic = topicGroup.topics[0]!
                    toC.push(<SidebarEntry key={num++} effect={() => {setActiveTopic(topic)}}
                    active={topic.code === props.virtualArticle.topicCode}>
                        {topic.displayTitle}
                    </SidebarEntry>)
                }
                else {
                    lastGroup = true
                    toC.push(<SidebarSection key={num++} text={topicGroup.title}/>)
                    topicGroup.topics.forEach((topic) => {
                        toC.push(<SidebarEntry key={num++} effect={() => { setActiveTopic(topic) }}
                            active={topic.code === props.virtualArticle.topicCode}>
                            {topic.displayTitle}
                        </SidebarEntry>)
                    })
                }
            })
        }
        return toC;
    })();
    const articleToC = (() => {
        const toC = [];
        let num = 0;
        toC.push(<SidebarTitle key={num++} text={props.virtualArticle.articleDisplayTitle} />)
        for (const section of props.sections) {
            if (section.depth >= 3) continue;

            toC.push(<SidebarEntry key={num++} effect={`#section-${section.code}`} active={false}>
                <div className={section.depth == 2 ? "ml-3" : ""}>{section.text}</div>
            </SidebarEntry>);
        }
        return toC;
    })();
    let toC: ReactNode[] = [];
    switch(displayTab) {
        case Tab.Article:
            toC = articleToC;
            break;
        case Tab.Chapter:
            toC = chapterToC;
            break;
        case Tab.Topic:
            toC = topicToC;
            break;
    }

    return <aside className="print:hidden">
        <div className={`fixed w-full lg:hidden text-black bg-slate-50 z-30 p-3 cursor-pointer ${displaySidebar ? "" : ""}`}
            onClick={() => { setDisplaySidebar(true) }}>
            <FontAwesomeIcon className="mr-1" icon={faAnglesRight} /> 打開目錄
        </div>
        <div className={`${displaySidebar ? "" : "hidden"} lg:hidden
                fixed inset-0 bg-gray-900 bg-opacity-50 z-40`}
                onClick={ () => setDisplaySidebar(false) }/>
        <div className={`fixed text-black z-50 w-72 h-screen pb-40 overflow-y-scroll bg-slate-50 ${displaySidebar ? "" : "max-lg:hidden"}`}>
            <div className={`absolute z-50 p-3 flex items-center 
                    justify-center cursor-pointer lg:hidden ${displaySidebar ? "" : "hidden"}`}
                onClick={() => { setDisplaySidebar(false) }}>
                <FontAwesomeIcon className="text-lg" icon={faXmark} />
            </div>
            <div className="m-5">
                <div className="flex justify-evenly mt-8 mb-5">
                    <SidebarTab text="本文" onClick={() => setDisplayTab(Tab.Article)} active={displayTab === Tab.Article} />
                    <SidebarTab text="章節" onClick={() => setDisplayTab(Tab.Chapter)} active={displayTab === Tab.Chapter} />
                    <SidebarTab text="主題" onClick={() => setDisplayTab(Tab.Topic)} active={displayTab === Tab.Topic} />
                </div>
                <div>
                    {toC}
                </div>
            </div>
        </div>
    </aside>
}