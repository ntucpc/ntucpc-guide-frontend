import { ContentBody } from "@/components/layout"
import { SimpleMarkdown } from "@/components/markdown/markdown"
import { SectionEntry } from "@/components/table-of-contents"
import { getTopicArticleGroups } from "@/lib/structure"
import { getChapter } from "@/lib/structure/chapters"
import { getTopic, getTopics } from "@/lib/structure/topics"
import { ArticleGroup } from "@/lib/structure/type"
import { composeMetadata } from "@/lib/util"
import { H1Title } from "@/ntucpc-website-common-lib/components/basic"

type TopicProps = {
    params: Promise<{ topic: string }>
}

export async function generateMetadata(props: TopicProps) {
    const params = await props.params;
    const topic = getTopic(params.topic)
    return composeMetadata(topic.title)
}

export async function generateStaticParams() {
    return getTopics().map(topic => ({
        topic: topic.code
    }))
}

function TopicSection({ group }: { group: ArticleGroup }) {
    const chapter = group.code === "unknown" ? undefined : getChapter(group.code)
    return <SectionEntry
        url={chapter ? `/chapter/${chapter.code}` : ""}
        title={chapter ? `${chapter.number}. ${chapter.title}` : "沒有章節"}
        description={chapter ? `${chapter.description}` : "這些文章屬於的章節還沒決定 :("}
        articles={group.articles}
    />
}

export default async function TopicPage(props: TopicProps) {
    const params = await props.params;
    const topic = getTopic(params.topic)
    const groups = getTopicArticleGroups(topic)
    return <ContentBody>
        <H1Title>
            {topic.title}
        </H1Title>
        <div className="text-gray-500">
            <SimpleMarkdown text={topic.description} />
        </div>
        <div className="mt-6">
            {groups.map(group => <TopicSection key={group.code} group={group} />)}
        </div>
    </ContentBody>
}