/**
 * Topics or chapters.
 */
export type SidebarCategory = {
    id: string
    title: string
    short: string
    sections: SidebarSection[]
}

/**
 * Category topic: a section is a topic
 * Category chapter: a section is a chapter
 */
export type SidebarSection = {
    id: string
    title: string
    groups: SidebarGroup[]
}

/**
 * Category topic: a group is articles in the topic of the same chapter
 * Category chapter: a group is articles in the chapter of the same topic
 */
export type SidebarGroup = {
    id: string
    title: string
    items: SidebarItem[]
}

export type SidebarItem = {
    id: string // article code
    title: string
    url: string
}

export type SidebarClientProps = {
    categories: SidebarCategory[]
    chapterMapping: Record<string, string>
}