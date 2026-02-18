'use client'

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight, faAngleDown, faAngleRight, faArrowRightArrowLeft, faCircleMinus, faCirclePlus, faCross, faSquareMinus, faSquarePlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { SidebarCategory, SidebarSection, SidebarGroup, SidebarItem, SidebarClientProps } from "./types"

type GroupFoldProps = {
    isFolded: (section: string, group: string) => boolean
    toggleGroupFold: (sectionId: string, groupId: string) => void
}

function ScrollSection({ children }: {children: ReactNode}) {
    return <div className={`flex-grow overflow-y-scroll
                        scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin 
                        scrollbar-thumb-zinc-300 scrollbar-track-slate-50`}>
        {children}
    </div>
}

function SidebarGroupComponent({ group, folded, toggleFold, activeArticle }: { 
            group: SidebarGroup,
            folded: boolean,
            toggleFold: () => void,
            activeArticle: string
        }) {
    return (
        <div>
            <div className="flex items-center gap-1 font-bold mt-4 mb-2 text-gray-800 select-none cursor-pointer" onClick={toggleFold}>
                <FontAwesomeIcon icon={folded ? faAngleRight : faAngleDown} className="min-w-4" />
                <div>
                    {group.title}
                </div>
            </div>
            <ul className={`pl-2 ${folded ? "hidden" : "block"}`}>
                {group.items.map((item) => (
                    <li key={item.id} className="my-1 select-none">
                        {
                            !item.coming ?
                            <Link href={item.url} className={`${activeArticle === item.id ? "text-indigo-500" : "text-gray-600"} hover:text-indigo-500 transition duration-200`}>{item.title}</Link>
                            :
                            <div className="flex justify-between items-center"><span className="text-gray-400">{item.title}</span><span className="ml-3 text-gray-800 text-xs">敬請期待</span></div>
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}

function SidebarSectionComponent({ section, folding, activeArticle }: 
        { section: SidebarSection, folding: GroupFoldProps, activeArticle: string }) {
    return (
        <>
            <div className="text-2xl font-semibold flex-grow-0 flex-shrink-0 select-none mb-3">
                {section.title}
            </div>
            <ScrollSection>
                <div className="mr-1 mb-2">
                    {section.groups.map((group) => (
                        <SidebarGroupComponent key={group.id} group={group}
                            folded={folding.isFolded(section.id, group.id)}
                            toggleFold={() => folding.toggleGroupFold(section.id, group.id)}
                            activeArticle={activeArticle}
                        />
                    ))}
                </div>
            </ScrollSection>
        </>
    )
}

function SidebarCategorySections({ category, setSelectedSection }: { 
            category: SidebarCategory,
            setSelectedSection: (section: string) => void
        }) {
    return (
        <>
            <div className="text-2xl font-semibold flex-grow-0 flex-shrink-0 select-none mb-3">
                {category.title}
            </div>
            <ScrollSection>
                <div className="mb-2">
                    {category.sections.map((section) => (
                        <div key={section.id} 
                                className="text-gray-600 font-semibold my-2 cursor-pointer"
                                onClick={() => setSelectedSection(section.id)}>
                            {section.title}
                        </div>
                    ))}
                </div>
            </ScrollSection>
        </>
    )
}

function SidebarCategoryComponent({ 
        category, 
        selectedSection, 
        folding, 
        toggleButton, 
        setSelectedSection,
        pageSection,
        activeArticle
    }: { 
        category: SidebarCategory, 
        selectedSection: string | null, 
        folding: GroupFoldProps, 
        toggleButton: ReactNode,
        setSelectedSection: (section: string | null) => void,
        pageSection: string,
        activeArticle: string
    }) {
    
    const pageSectionObj = category.sections.find(section => section.id === pageSection)
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-row flex-grow-0">
                <div className="text-slate-500 font-semibold flex-shrink-0 flex-grow select-none">
                    {selectedSection ? 
                        <div className="cursor-pointer w-fit" onClick={() => setSelectedSection(null)}>
                            {category.title}
                        </div> : 
                        <div className="cursor-pointer w-fit" onClick={() => setSelectedSection(pageSection)}>
                            {pageSectionObj?.title}
                        </div>
                    }
                </div>
                <div className="flex-none select-none cursor-pointer">
                    {toggleButton}
                </div>
            </div>
            {
                selectedSection ?
                <SidebarSectionComponent 
                    section={category.sections.find((sec) => sec.id === selectedSection)!}
                    folding={folding}
                    activeArticle={activeArticle}
                /> : <SidebarCategorySections category={category} setSelectedSection={setSelectedSection} />
            }
        </div>
    )
}

function SidebarCategoryToggleButton({text, onClick}: {text: string, onClick: () => void}) {
    return <div onClick={onClick} className="flex flex-row items-center gap-1 text-sm font-semibold text-gray-700">
        <div>{text}</div>
        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
    </div>
}

const CATEGORY_CHAPTER = 0
const CATEGORY_TOPIC = 1

/**
 * The client component for the sidebar. The server component is in sidebar.tsx,
 * and is resposible for constructing an array containing the table of contents.
 * The component is expected not to be unmounted by navigation between article pages.
 * @param props 
 * @returns 
 */
export function SidebarClient(props: SidebarClientProps) {
    const params = useParams()
    const activeTopic = params?.topic as string
    // activeArticle should be full article code, in the form of topic/article
    const [activeArticle, setActiveArticle] = useState<string>(activeTopic + "/" + params?.article as string)
    const activeChapter = props.chapterMapping[activeArticle]
    const [category, setCategory] = useState<number>(CATEGORY_CHAPTER)
    const [selectedSection, setSelectedSection] = 
            useState<(string | null)[]>([activeChapter, activeTopic])

    const [defaultFolded, setDefaultFolded] = useState<boolean>(false)
    const [sectionFolded, setSectionFolded] = 
            useState<Map<string, Set<string>>[]>([
                new Map(),
                new Map(),
            ])
    const isFolded = (category: number, section: string, group: string) => {
        if (!sectionFolded[category].has(section)) return defaultFolded
        return sectionFolded[category].get(section)!.has(group) ? !defaultFolded : defaultFolded
    }
    const toggleFolded = (category: number, section: string, group: string) => {
        const newFolded = new Set(sectionFolded[category].get(section) || [])
        if (newFolded.has(group)) {
            newFolded.delete(group)
        } else {
            newFolded.add(group)
        }
        const newArray = [...sectionFolded]
        newArray[category].set(section, newFolded)
        setSectionFolded(newArray)
    }
    const updateDefaultFolded = (folded: boolean) => {
        setSectionFolded([new Map(), new Map()])
        setDefaultFolded(folded)
    }

    const [pageSection, setPageSection] = useState<string[]>([activeChapter, activeTopic])
    useEffect(() => {
        const activeTopic = params?.topic as string
        // activeArticle should be full article code, in the form of topic/article
        const activeArticle = activeTopic + "/" + params?.article as string
        const activeChapter = props.chapterMapping[activeArticle]
        const newSelectedSection = [activeChapter, activeTopic]
        setActiveArticle(activeArticle)
        setSelectedSection(newSelectedSection)
        setPageSection(newSelectedSection)
    }, [params])

    const [displaySidebar, setDisplaySidebar] = useState<"default" | boolean>("default")

    // Not sure why z-[999] is needed. If z-50 is used, MathJax formula will display over these elements.
    return <>
        <div className={`fixed bg-white shadow-sm w-full z-[999] select-none cursor-pointer ${displaySidebar === false ? "" : (displaySidebar === true ? "hidden" : "xl:hidden")}`} onClick={() => setDisplaySidebar(true)}>
            <div className="w-full max-w-4xl mx-auto px-4 py-2 z-50 text-slate-500 font-semibold text-sm">
                <FontAwesomeIcon icon={faAngleDoubleRight}/> 展開目錄
            </div>
        </div>
        <aside className={`fixed bg-white xl:sticky top-16 max-w-[20rem] w-full shrink-0 z-[999] ${displaySidebar === true ? "" : (displaySidebar === false ? "hidden" : "hidden xl:block")} h-[calc(100vh-64px)] p-2`}>
            <div className="flex items-center text-sm mb-2 text-slate-500 font-medium select-none">
                <div className="mr-3 cursor-pointer hover:text-indigo-500" onClick={() => updateDefaultFolded(false)}>
                    <FontAwesomeIcon icon={faCirclePlus}/> <span>展開</span>
                </div>
                <div className="cursor-pointer hover:text-indigo-500" onClick={() => updateDefaultFolded(true)}>
                    <FontAwesomeIcon icon={faCircleMinus}/> <span>收合</span>
                </div>
                <div className="ml-auto cursor-pointer hover:text-indigo-500" onClick={() => setDisplaySidebar(!displaySidebar)}>
                    <span>隱藏</span> <FontAwesomeIcon icon={faXmark}/>
                </div>
            </div>
            <SidebarCategoryComponent
                category={props.categories[category]}
                selectedSection={selectedSection[category]}
                folding={{
                    isFolded: (section, group) => isFolded(category, section, group),
                    toggleGroupFold: (sectionId, groupId) =>
                        toggleFolded(category, sectionId, groupId)
                }}
                toggleButton={<SidebarCategoryToggleButton 
                    text={props.categories[1 - category].short}
                    onClick={() => {
                        setCategory(1 - category)
                    }
                }/>}
                setSelectedSection={section => {
                    const newSelectedSection = [...selectedSection]
                    newSelectedSection[category] = section
                    setSelectedSection(newSelectedSection)
                }}
                pageSection={pageSection[category]}
                activeArticle={activeArticle}
            />
        </aside>
    </>

}