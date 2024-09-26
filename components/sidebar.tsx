import { Section } from "@/lib/parser/section"
import { Structure, parseStructure } from "@/lib/structure/client"
import { Article, Topic } from "@/lib/structure/type"
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common"
import { reloadMathJax } from "@/ntucpc-website-common-lib/scripts/reload"
import { ArticleProps } from "@/pages/[topic]/[article]"
import { faAngleDoubleDown, faAngleDoubleUp, faAnglesRight, faArrowLeft, faChevronLeft, faChevronRight, faCircleChevronDown, faCircleChevronUp, faX, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NextRouter, useRouter } from "next/router"
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction, use, useEffect, useState } from "react"

type SidebarTabProps = {
    text: string,
    onClick: MouseEventHandler<HTMLDivElement>,
    active: boolean
}

type SidebarEntryProps = {
    children: ReactNode,
    effect: string | (() => (void)),
    active: boolean,
    disable?: boolean
}

type SidebarSectionProps = {
    title: string
    children: ReactNode
    expand?: boolean
    toggleExpand?: () => void
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
    return <>
        <div className="mb-2 mt-3 flex flex-nowrap items-center select-none cursor-pointer" onClick={props.toggleExpand}>
            {props.expand === undefined ? <></> :
                <FontAwesomeIcon icon={props.expand ? faCircleChevronUp : faCircleChevronDown}
                    className={`mr-2 text-xs text-neutral-700`} />}
            <div className="font-semibold">{props.title}</div>
        </div>
        <div className={props.expand ? "" : "hidden"}>
            {props.children}
        </div>
    </>
}

function SidebarEntry(props: SidebarEntryProps) {
    let innerComponent: ReactNode
    if (props.disable)
        innerComponent = <div className="pl-2 py-2 text-neutral-500">
            {props.children}
        </div>
    else if (typeof props.effect === "string")
        innerComponent = <WrappedLink className="pl-2 py-2 block" href={props.effect}>
            {props.children}
        </WrappedLink>
    else
        innerComponent = <div className="pl-2 py-2 cursor-pointer" onClick={props.effect}>
            {props.children}
        </div>
    return <div className={`w-full border-l-4 
            ${!props.disable ? "hover:border-indigo-600 hover:bg-indigo-100 hover:text-indigo-600 hover:font-semibold" : ""}
            ${props.active ? "border-indigo-600 bg-indigo-100 text-indigo-600 font-semibold" :
            "border-gray-200"}`}>
        {innerComponent}
    </div>
}

type SidebarSmallButtonProps = {
    children: ReactNode
    effect: () => void
}
function SidebarSmallButton(props: SidebarSmallButtonProps) {
    return <div onClick={props.effect} className="select-none cursor-pointer text-xs mx-1 px-2 py-1 bg-indigo-500 hover:bg-indigo-800 text-white rounded-full">
        {props.children}
    </div>
}

type SectionProps = {
    children: ReactNode
}
function TitleSection({ children }: SectionProps) {
    return <div className="flex-shrink-0 mx-5">
        {children}
    </div>
}
function ScrollSection({ children }: SectionProps) {
    return <div className={`flex-grow overflow-y-scroll
                        scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin 
                        scrollbar-thumb-zinc-300 scrollbar-track-slate-50
                        pb-32 pr-2 ml-5`}>
        {children}
    </div>
}

type SectionInfo = {
    section: Section
    start: number
}

function makeChapterToC(structure: Structure, props: ArticleProps, router: NextRouter): ReactNode {
    const [activeChapter, setActiveChapter] =
        useState(structure.getArticle(props.code)?.chapter)
    const resetActive = () => {
        setActiveChapter(structure.getExistArticle(props.code).chapter)
    }
    useEffect(() => {
        router.events.on("routeChangeComplete", resetActive)
        return () => {
            router.events.off("routeChangeComplete", resetActive)
        }
    }, [router])
    useEffect(() => {
        reloadMathJax(true)
    }, [activeChapter])

    const chapters = props.structure.chapters

    const expandStates: Map<string, [boolean, Dispatch<SetStateAction<boolean>>]> = new Map()
    chapters.forEach((chapter) => {
        let lastTopic: string | undefined = undefined
        chapter.contents.forEach((fullArticleCode) => {
            const topic = structure.getExistArticle(fullArticleCode).topic
            if (lastTopic !== topic) {
                lastTopic = topic
                expandStates.set(`${chapter.code}/${topic}`, useState(true))
            }
        })
    })

    const toC: ReactNode[] = []
    let num = 0
    if (activeChapter) {
        const index = chapters.findIndex((chapter) => chapter.code === activeChapter)
        const previousChapter = index > 0 ? chapters[index - 1].code : undefined
        const nextChapter = index + 1 < chapters.length ? chapters[index + 1].code : undefined
        const chapterObj = structure.getChapter(activeChapter)!

        const expandSetter: Dispatch<SetStateAction<boolean>>[] = []
        type Subtopic = {
            topic: string
            articles: string[]
        }
        const subtopics: Subtopic[] = []
        chapterObj.contents.forEach((fullArticleCode) => {
            const article = structure.getExistArticle(fullArticleCode)
            if (subtopics.length === 0 || subtopics.at(-1)?.topic !== article?.topic)
                subtopics.push({topic: article.topic, articles: []})
            subtopics.at(-1)?.articles.push(fullArticleCode)
        })
        for (const subtopic of subtopics) {
            const section: ReactNode[] = []
            const [expand, setExpand] = expandStates.get(`${activeChapter}/${subtopic.topic}`)!
            expandSetter.push(setExpand)
            subtopic.articles.forEach((fullArticleCode) => {
                const articleObj = structure.getArticle(fullArticleCode)
                section.push(<SidebarEntry key={num++} effect={`/${fullArticleCode}`}
                    active={fullArticleCode === props.code}
                    disable={!articleObj || articleObj.coming}
                >{structure.getArticleTitle(fullArticleCode)}</SidebarEntry>)
            })
            toC.push(<SidebarSection key={num++} title={structure.getTopicTitle(subtopic.topic)} 
                    expand={expand} toggleExpand={() => { setExpand(!expand) }}>{section}</SidebarSection>)
        }
        return <>
            <TitleSection>
                <div className="flex justify-between items-end flex-nowrap">
                    <SidebarTableButton key={num++} effect={() => { setActiveChapter(undefined) }}>章節目錄</SidebarTableButton>

                    <div className="flex justify-center mb-1">
                        <SidebarSmallButton effect={() => { expandSetter.forEach((setExpand) => { setExpand(false) }) }}>
                            <FontAwesomeIcon icon={faAngleDoubleUp}/>
                        </SidebarSmallButton>
                        <SidebarSmallButton effect={() => { expandSetter.forEach((setExpand) => { setExpand(true) }) }}>
                            <FontAwesomeIcon icon={faAngleDoubleDown}/>
                        </SidebarSmallButton>
                    </div>
                </div>

                <SidebarTitle key={num++} text={structure.getChapterTitle(activeChapter)}
                    page={true}
                    left={previousChapter ? () => { setActiveChapter(previousChapter) } : undefined}
                    right={nextChapter ? () => { setActiveChapter(nextChapter) } : undefined} />
            </TitleSection>
            <ScrollSection>
                {toC}
            </ScrollSection>
        </>
    }
    else {
        props.structure.chapters.forEach((chapter) => {
            toC.push(<SidebarEntry key={num++} effect={() => { setActiveChapter(chapter.code) }}
                active={chapter.code === structure.getArticleChapter(props.code)}>
                {structure.getChapterTitle(chapter.code)}
            </SidebarEntry>)
        })
        return <>
            <TitleSection>
                <SidebarTableButton key={num++} effect={() => { setActiveChapter(structure.getArticleChapter(props.code)) }}>
                    <FontAwesomeIcon icon={faChevronLeft} /> {structure.getArticleChapterTitle(props.code)}
                </SidebarTableButton>
                <SidebarTitle key={num++} text="章節目錄" />
            </TitleSection>
            <ScrollSection>
                {toC}
            </ScrollSection>
        </>
    }
}

function makeTopicToC(structure: Structure, props: ArticleProps, router: NextRouter): ReactNode {
    const [activeTopic, setActiveTopic] =
        useState(structure.getArticle(props.code)?.topic)
    const resetActive = () => {
        setActiveTopic(structure.getExistArticle(props.code).topic)
    }
    useEffect(() => {
        router.events.on("routeChangeComplete", resetActive)
        return () => {
            router.events.off("routeChangeComplete", resetActive)
        }
    }, [router])
    useEffect(() => {
        reloadMathJax(true)
    }, [activeTopic])

    const toC: ReactNode[] = [];
    let num = 0
    if (activeTopic) {
        const topicObj = structure.getTopic(activeTopic)
        topicObj?.contents.forEach((fullArticleCode) => {
            const articleObj = structure.getArticle(fullArticleCode)
            toC.push(<SidebarEntry key={num++} effect={`/${fullArticleCode}`}
                active={fullArticleCode === props.code}
                disable={!articleObj || articleObj.coming}>
                {structure.getArticleTitle(fullArticleCode)}
            </SidebarEntry>)
        })
        return <>
            <TitleSection>
                <SidebarTableButton key={num++} effect={() => { setActiveTopic(undefined) }}>主題目錄</SidebarTableButton>
                <SidebarTitle key={num++} text={structure.getTopicTitle(activeTopic)} />
            </TitleSection>
            <ScrollSection>
                {toC}
            </ScrollSection>
        </>
    }
    else {
        let lastGroup = false
        props.structure.topicGroups.forEach((topicGroup) => {
            if (topicGroup.single) {
                if (lastGroup) { // a little bit ugly
                    toC.push(<SidebarSection key={num++} title=""><></></SidebarSection>)
                    lastGroup = false
                }
                const topic = topicGroup.topics[0]!
                toC.push(<SidebarEntry key={num++} effect={() => { setActiveTopic(topic) }}
                    active={topic === structure.getArticleTopic(props.code)!.code}>
                    {structure.getTopicTitle(topic)}
                </SidebarEntry>)
            }
            else {
                lastGroup = true
                const section: ReactNode[] = []
                topicGroup.topics.forEach((topic) => {
                    section.push(<SidebarEntry key={num++} effect={() => { setActiveTopic(topic) }}
                        active={topic === structure.getArticleTopic(props.code)?.code}>
                        {structure.getTopicTitle(topic)}
                    </SidebarEntry>)
                })
                toC.push(<SidebarSection key={num++} title={topicGroup.title}>{section}</SidebarSection>)
            }
        })
        return <>
            <TitleSection>
                <SidebarTableButton key={num++} effect={() => { setActiveTopic(structure.getArticleTopic(props.code)?.code) }}>
                    <FontAwesomeIcon icon={faChevronLeft} /> {structure.getArticleTopicTitle(props.code)}
                </SidebarTableButton>
                <SidebarTitle key={num++} text="主題目錄" />
            </TitleSection>
            <ScrollSection>
                {toC}
            </ScrollSection>
        </>
    }
}

function makeArticleToC(structure: Structure, props: ArticleProps, router: NextRouter): ReactNode  {
    const [currentSection, setCurrentSection] = useState("")
    const sections: SectionInfo[] = []
    const handleScroll = () => {
        const position = window.scrollY
        let temp = ""
        for (const section of sections) {
            if (position >= section.start)
                temp = section.section.code
        }
        if (temp !== currentSection) {
            setCurrentSection(temp)
        }
    }

    const recomputeSections = () => {
        sections.length = 0
        props.sections.forEach((section) => {
            if (section.depth >= 3) return
            const element = document.getElementById(`${section.code}`)!
            const position = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top
            sections.push({ section: section, start: position })
        })
    }

    // https://stackoverflow.com/questions/53158796/get-scroll-position-with-reactjs
    useEffect(() => {
        recomputeSections()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [props.sections, currentSection])

    const toC = [];
    let num = 0;
    for (const section of props.sections) {
        if (section.depth >= 3) continue;

        toC.push(<SidebarEntry key={num++} effect={`#${section.code}`}
            active={section.code === currentSection || currentSection.startsWith(`${section.code}-`)}>
            <div className={section.depth == 2 ? "ml-3" : ""}>{section.text}</div>
        </SidebarEntry>);
    }
    return <>
        <TitleSection>
            <SidebarTitle key={num++} text={structure.getArticleTitle(props.code)} />
        </TitleSection>
        <ScrollSection>
            {toC}
        </ScrollSection>
    </>
}

export function Sidebar(props: ArticleProps) {
    const [displayTab, setDisplayTab] = useState(Tab.Article)
    const [displaySidebar, setDisplaySidebar] = useState(false)
    const structure = parseStructure(props.structure)

    const router = useRouter()

    useEffect(() => {
        reloadMathJax(true)
    }, [displayTab, displaySidebar])

    let toC: ReactNode = <></>;
    const chapterToC = makeChapterToC(structure, props, router)
    const topicToC = makeTopicToC(structure, props, router)
    const articleToC = makeArticleToC(structure, props, router)
    switch (displayTab) {
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
            onClick={() => setDisplaySidebar(false)} />
        <div className={`fixed text-black z-50 w-72 h-screen pb-20 bg-slate-50 ${displaySidebar ? "" : "max-lg:hidden"}
                        `}>
            {/* Note that some of this are not supported by some browsers like FireFox */}
            <div className={`absolute z-50 p-3 flex items-center 
                    justify-center cursor-pointer lg:hidden ${displaySidebar ? "" : "hidden"}`}
                onClick={() => { setDisplaySidebar(false) }}>
                <FontAwesomeIcon className="text-lg" icon={faXmark} />
            </div>
            <div className="flex flex-col h-full">
                <div className="flex-shrink-0 flex justify-evenly mt-8 mb-5 mx-5">
                    <SidebarTab text="本文" onClick={() => setDisplayTab(Tab.Article)} active={displayTab === Tab.Article} />
                    <SidebarTab text="章節" onClick={() => setDisplayTab(Tab.Chapter)} active={displayTab === Tab.Chapter} />
                    <SidebarTab text="主題" onClick={() => setDisplayTab(Tab.Topic)} active={displayTab === Tab.Topic} />
                </div>
                {toC}
            </div>
        </div>
    </aside>
}