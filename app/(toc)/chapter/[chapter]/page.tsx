import { SimpleMarkdown } from "@/components/markdown/markdown"
import { SectionEntry } from "@/components/table-of-contents"
import { getChapterArticleGroups } from "@/lib/structure"
import { getChapter, getChapters } from "@/lib/structure/chapters"
import { getTopic } from "@/lib/structure/topics"
import { ArticleGroup } from "@/lib/structure/type"
import { composeMetadata } from "@/lib/util"
import { H1Title } from "@/ntucpc-website-common-lib/components/basic"
import { IconWrapper } from "@/components/icon"
import { Metadata } from "next"

type ChapterProps = {
    params: Promise<{ chapter: string }>
}

export async function generateMetadata(props: ChapterProps): Promise<Metadata> {
    const params = await props.params
    const chapter = getChapter(params.chapter)
    return composeMetadata(`Chapter ${chapter.number}. ${chapter.title}`)
}

export async function generateStaticParams() {
    return getChapters().map((chapter) => ({
        chapter: chapter.code,
    }))
}

function ChapterSection({ group }: { group: ArticleGroup }) {
    const topic = getTopic(group.code)
    return (
        <SectionEntry
            url={`/${group.code}`}
            title={topic.title}
            description={topic.description}
            articles={group.articles}
        />
    )
}

export default async function ChapterPage(props: ChapterProps) {
    const params = await props.params
    const chapter = getChapter(params.chapter)
    const groups = getChapterArticleGroups(chapter)

    return (
        <div className="pb-20">
            {/* Header Section */}
            <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                    {/* Chapter Icon */}
                    <div
                        className={`flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-3xl bg-gray-50 text-6xl text-${
                            chapter.iconColor || "indigo-500"
                        } shadow-sm border border-gray-100`}
                    >
                        <IconWrapper iconName={chapter.icon} />
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-bold text-indigo-500 tracking-widest uppercase bg-indigo-50 px-2 py-0.5 rounded">
                                Chapter {chapter.number}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            {chapter.title}
                        </h1>
                    </div>
                </div>

                <div className="text-gray-500 text-lg max-w-3xl leading-relaxed italic py-2">
                    <SimpleMarkdown text={chapter.description} />
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
                {groups.map((group) => (
                    <ChapterSection key={group.code} group={group} />
                ))}
            </div>
        </div>
    )
}
