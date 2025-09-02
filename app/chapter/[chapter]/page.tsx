import { ContentBody } from "@/components/layout";
import { SectionEntry } from "@/components/table-of-contents";
import { getChapterArticleGroups } from "@/lib/structure";
import { getArticle } from "@/lib/structure/articles";
import { getChapter, getChapters } from "@/lib/structure/chapters";
import { getTopic } from "@/lib/structure/topics";
import { ArticleGroup } from "@/lib/structure/type";
import { composeMetadata } from "@/lib/util";
import { H1Title } from "@/ntucpc-website-common-lib/components/basic";
import { Metadata } from "next";

type ChapterProps = {
    params: { chapter: string }
}
export async function generateMetadata({ params }: ChapterProps): Promise<Metadata> {
    const chapter = getChapter(params.chapter)
    return composeMetadata(`Chapter ${chapter.number}. ${chapter.title}`)
}

export async function generateStaticParams() {
    return getChapters().map(chapter => ({
        chapter: chapter.code,
    }))
}

function ChapterSection({ group }: { group: ArticleGroup }) {
    const topic = getTopic(group.code)
    return <SectionEntry
        url={`/${group.code}`}
        title={topic.title}
        description={topic.description}
        articles={topic.contents.map(articleCode => getArticle(articleCode))}
    />
}

export default function ChapterPage({ params }: ChapterProps) {
    const chapter = getChapter(params.chapter)
    const groups = getChapterArticleGroups(chapter)
    return <ContentBody>
        <H1Title>
            <div className="text-xl font-medium text-gray-500">
                Chapter {`${chapter.number}`}.
            </div>
            {`${chapter.title}`}
        </H1Title>
        <div className="text-gray-500">
            {chapter.description}
        </div>
        <div className="mt-6">
            {groups.map(group => <ChapterSection key={group.code} group={group} />)}
        </div>
    </ContentBody>
}