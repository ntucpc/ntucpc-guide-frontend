"use client"

import { ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faAngleDoubleRight,
    faAngleRight,
    faDownLeftAndUpRightToCenter,
    faUpRightAndDownLeftFromCenter,
    faXmark,
} from "@fortawesome/free-solid-svg-icons"
import {
    SidebarCategory,
    SidebarSection,
    SidebarGroup,
    SidebarClientProps,
} from "./types"

function ScrollSection({ children }: { children: ReactNode }) {
    return (
        <div
            className={`flex-grow overflow-y-auto mt-2 pr-2
                        scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin 
                        scrollbar-thumb-zinc-200 scrollbar-track-transparent`}
        >
            {children}
        </div>
    )
}

function SidebarGroupComponent({
    group,
    folded,
    toggleFold,
    activeArticle,
}: {
    group: SidebarGroup
    folded: boolean
    toggleFold: () => void
    activeArticle: string
}) {
    return (
        <div className="mb-1">
            <div
                className="flex items-center gap-2 py-1.5 px-2 text-sm font-bold text-gray-700 select-none cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
                onClick={toggleFold}
            >
                <FontAwesomeIcon
                    icon={faAngleRight}
                    className={`text-[10px] text-gray-400 transition-transform duration-200 ${
                        folded ? "" : "rotate-90"
                    }`}
                />
                <div className="truncate">{group.title}</div>
            </div>
            <ul
                className={`pl-4 space-y-0.5 mt-0.5 border-l border-gray-100 ml-3.5 ${
                    folded ? "hidden" : "block"
                }`}
            >
                {group.items.map((item) => {
                    const isActive = activeArticle === item.id
                    return (
                        <li key={item.id} className="select-none">
                            {!item.coming ? (
                                <Link
                                    href={item.url}
                                    className={`block py-1.5 px-3 text-sm rounded-md transition-all duration-200 ${
                                        isActive
                                            ? "text-indigo-600 bg-indigo-50 font-medium border-l-2 border-indigo-600 -ml-[1px]"
                                            : "text-gray-500 hover:text-indigo-500 hover:bg-gray-50"
                                    }`}
                                >
                                    {item.title}
                                </Link>
                            ) : (
                                <div className="flex justify-between items-center py-1.5 px-3 text-sm text-gray-300">
                                    <span>{item.title}</span>
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                                        待續
                                    </span>
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

function SidebarSectionComponent({
    section,
    folding,
    activeArticle,
}: {
    section: SidebarSection
    folding: {
        isFolded: (sid: string, gid: string) => boolean
        toggle: (sid: string, gid: string) => void
    }
    activeArticle: string
}) {
    return (
        <div className="flex flex-col h-[calc(100vh-180px)]">
            <ScrollSection>
                {section.groups.map((group) => (
                    <SidebarGroupComponent
                        key={group.id}
                        group={group}
                        folded={folding.isFolded(section.id, group.id)}
                        toggleFold={() => folding.toggle(section.id, group.id)}
                        activeArticle={activeArticle}
                    />
                ))}
            </ScrollSection>
        </div>
    )
}

function SidebarCategorySections({
    category,
    setSelectedSection,
}: {
    category: SidebarCategory
    setSelectedSection: (section: string) => void
}) {
    return (
        <ScrollSection>
            <div className="space-y-1">
                {category.sections.map((section) => (
                    <div
                        key={section.id}
                        className="px-3 py-2 text-sm text-gray-600 font-medium rounded-md hover:bg-gray-50 hover:text-indigo-600 cursor-pointer transition-colors"
                        onClick={() => setSelectedSection(section.id)}
                    >
                        {section.title}
                    </div>
                ))}
            </div>
        </ScrollSection>
    )
}

const CATEGORY_CHAPTER = 0
const CATEGORY_TOPIC = 1

export function SidebarClient(props: SidebarClientProps) {
    const params = useParams()
    const activeTopic = params?.topic as string
    const [activeArticle, setActiveArticle] = useState<string>(
        (activeTopic + "/" + params?.article) as string
    )
    const activeChapter = props.chapterMapping[activeArticle]

    const [category, setCategory] = useState<number>(CATEGORY_CHAPTER)
    const [selectedSection, setSelectedSection] = useState<(string | null)[]>([
        activeChapter,
        activeTopic,
    ])

    const [defaultFolded, setDefaultFolded] = useState<boolean>(false)
    const [sectionFolded, setSectionFolded] = useState<
        Map<string, Set<string>>[]
    >([new Map(), new Map()])

    const isFolded = (cat: number, section: string, group: string) => {
        if (!sectionFolded[cat].has(section)) return defaultFolded
        return sectionFolded[cat].get(section)!.has(group)
            ? !defaultFolded
            : defaultFolded
    }

    const toggleFolded = (cat: number, section: string, group: string) => {
        const newFolded = new Set(sectionFolded[cat].get(section) || [])
        if (newFolded.has(group)) newFolded.delete(group)
        else newFolded.add(group)
        const newArray = [...sectionFolded]
        newArray[cat].set(section, newFolded)
        setSectionFolded(newArray)
    }

    const updateDefaultFolded = (folded: boolean) => {
        setSectionFolded([new Map(), new Map()])
        setDefaultFolded(folded)
    }

    useEffect(() => {
        const activeTopic = params?.topic as string
        const activeArticle = (activeTopic + "/" + params?.article) as string
        const activeChapter = props.chapterMapping[activeArticle]
        const newSelectedSection = [activeChapter, activeTopic]
        setActiveArticle(activeArticle)
        setSelectedSection(newSelectedSection)
    }, [params, props.chapterMapping])

    const [displaySidebar, setDisplaySidebar] = useState<"default" | boolean>(
        "default"
    )

    useEffect(() => {
        setDisplaySidebar("default")
    }, [params])

    const curCategory = props.categories[category]
    const curSelectedSection = selectedSection[category]

    return (
        <>
            {/* Toggle Bar - Shown when sidebar is manually hidden or on mobile by default */}
            <div
                className={`fixed bg-white shadow-sm w-full z-[999] select-none cursor-pointer border-b 
                ${
                    displaySidebar === true
                        ? "hidden"
                        : displaySidebar === false
                        ? "block"
                        : "xl:hidden"
                }`}
                onClick={() => setDisplaySidebar(true)}
            >
                <div className="flex justify-center w-full">
                    <div className="xl:flex items-start gap-10 w-full max-w-[100rem]">
                        <div className="flex-grow">
                            <div className="w-full max-w-4xl px-4 py-3 text-indigo-600 font-bold text-sm flex items-center gap-2">
                                <FontAwesomeIcon icon={faAngleDoubleRight} />{" "}
                                展開目錄
                            </div>
                        </div>

                        <div className="hidden xl:block w-80 shrink-0" />
                    </div>
                </div>
            </div>

            {/* Sidebar Main Container */}
            <aside
                className={`fixed bg-white xl:sticky top-16 w-full sm:max-w-[20rem] xl:max-w-none xl:w-80 shrink-0 z-[999] 
                ${
                    displaySidebar === true
                        ? "block"
                        : displaySidebar === false
                        ? "hidden"
                        : "hidden xl:block"
                } 
                h-[calc(100vh-64px)] border-r border-gray-100 p-4`}
            >
                {/* Top Action Bar */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
                        {[
                            { id: CATEGORY_CHAPTER, label: "章節" },
                            { id: CATEGORY_TOPIC, label: "主題" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setCategory(tab.id)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                                    category === tab.id
                                        ? "bg-white text-indigo-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 text-gray-400">
                        <button
                            onClick={() => updateDefaultFolded(false)}
                            title="全部展開"
                            className="hover:text-indigo-500 transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={faUpRightAndDownLeftFromCenter}
                                className="text-sm"
                            />
                        </button>
                        <button
                            onClick={() => updateDefaultFolded(true)}
                            title="全部收合"
                            className="hover:text-indigo-500 transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={faDownLeftAndUpRightToCenter}
                                className="text-sm"
                            />
                        </button>
                        <button
                            onClick={() => setDisplaySidebar(false)}
                            title="隱藏"
                            className="hover:text-rose-500 transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={faXmark}
                                className="text-base"
                            />
                        </button>
                    </div>
                </div>

                {/* Breadcrumb / Category Title */}
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2 px-1">
                    {curSelectedSection ? (
                        <div
                            className="flex items-center gap-1 cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={() => {
                                const newSelected = [...selectedSection]
                                newSelected[category] = null
                                setSelectedSection(newSelected)
                            }}
                        >
                            <span>{curCategory.title}</span>
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="text-[8px]"
                            />
                            <span className="text-gray-800">
                                {
                                    curCategory.sections.find(
                                        (s) => s.id === curSelectedSection
                                    )?.title
                                }
                            </span>
                        </div>
                    ) : (
                        <span className="text-gray-800">
                            {curCategory.title}
                        </span>
                    )}
                </div>

                {/* Content List */}
                {curSelectedSection ? (
                    <SidebarSectionComponent
                        section={
                            curCategory.sections.find(
                                (sec) => sec.id === curSelectedSection
                            )!
                        }
                        folding={{
                            isFolded: (sid, gid) =>
                                isFolded(category, sid, gid),
                            toggle: (sid, gid) =>
                                toggleFolded(category, sid, gid),
                        }}
                        activeArticle={activeArticle}
                    />
                ) : (
                    <SidebarCategorySections
                        category={curCategory}
                        setSelectedSection={(sid) => {
                            const newSelected = [...selectedSection]
                            newSelected[category] = sid
                            setSelectedSection(newSelected)
                        }}
                    />
                )}
            </aside>
        </>
    )
}
