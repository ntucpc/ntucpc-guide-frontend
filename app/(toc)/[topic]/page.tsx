import { SimpleMarkdown } from "@/components/markdown/markdown"
import { SectionEntry } from "@/components/table-of-contents"
import { getTopicArticleGroups } from "@/lib/structure"
import { getChapter } from "@/lib/structure/chapters"
import { getTopic, getTopics } from "@/lib/structure/topics"
import { ArticleGroup } from "@/lib/structure/type"
import { composeMetadata } from "@/lib/util"

type TopicProps = {
    params: Promise<{ topic: string }>
}

export async function generateMetadata(props: TopicProps) {
    const params = await props.params
    const topic = getTopic(params.topic)
    return composeMetadata(topic.title)
}

export async function generateStaticParams() {
    return getTopics().map((topic) => ({
        topic: topic.code,
    }))
}

function TopicSection({ group }: { group: ArticleGroup }) {
    const chapter =
        group.code === "unknown" ? undefined : getChapter(group.code)
    return (
        <SectionEntry
            url={chapter ? `/chapter/${chapter.code}` : ""}
            title={
                chapter
                    ? `Chapter ${chapter.number}. ${chapter.title}`
                    : "其他文章"
            }
            description={
                chapter
                    ? `${chapter.description}`
                    : "這些文章目前不屬於任何特定的章節。"
            }
            articles={group.articles}
        />
    )
}

export default async function TopicPage(props: TopicProps) {
    const params = await props.params
    const topic = getTopic(params.topic)
    const groups = getTopicArticleGroups(topic)

    return (
        <div className="pb-20">
            {/* Header Section */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                    {topic.title}
                </h1>

                <div className="mt-4 text-gray-500 text-lg max-w-3xl leading-relaxed italic">
                    <SimpleMarkdown text={topic.description} />
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
                {groups.map((group) => (
                    <TopicSection key={group.code} group={group} />
                ))}
            </div>
        </div>
    )
}
