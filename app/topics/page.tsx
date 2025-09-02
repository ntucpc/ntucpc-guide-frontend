import { ContentBody } from "@/components/layout";
import { getArticle } from "@/lib/structure/articles";
import { getTopics } from "@/lib/structure/topics";
import { Topic } from "@/lib/structure/type";
import { composeMetadata } from "@/lib/util";
import { H1Title } from "@/ntucpc-website-common-lib/components/basic";
import Link from "next/link";

function TopicEntryTitle({ topic }: { topic: Topic }) {
    return <div className={`text-3xl font-bold group-hover:text-indigo-700 color-animation`}>
        {topic.title}
    </div>
}

function TopicEntryDescription({ topic }: { topic: Topic }) {
    return <div className="text-sm mt-1 text-gray-500">
        {topic.description}
    </div>
}

function TopicEntryContent({ topic }: { topic: Topic }) {
    return topic.contents.map(articleCode => {
        const article = getArticle(articleCode)
        return <span key={article.code} className="whitespace-nowrap"> {!article.coming ?
            <Link href={`/${article.code}`} className={`hover:text-indigo-500 color-animation pointer-events-auto`}>
                {article.title}
            </Link> :
            <span className="text-gray-400">{article.title}</span>}
        </span>
    })
}

function TopicEntry({ topic }: { topic: Topic }) {
    return <div className={`md:w-1/2 relative group hover:bg-indigo-50 my-3 p-2 rounded-lg color-animation`}>
        <Link
            href={`/${topic.code}`}
            className="z-1 absolute inset-0 pointer-events-auto"
        />
        <div className="pointer-events-none relative">
            <TopicEntryTitle topic={topic} />
            <TopicEntryDescription topic={topic} />
            <div className="text-sm flex flex-row gap-x-4 flex-wrap mt-1 text-gray-700">
                <TopicEntryContent topic={topic} />
            </div>
        </div>
    </div>
}

function AllTopics() {
    const topics = getTopics()
    return <div className="md:flex md:flex-row md:flex-wrap">
        {topics.map((topic) => <TopicEntry key={topic.code} topic={topic} />)}
    </div>
}

export const metadata = composeMetadata("主題目錄")
export default function TopicsPage() {
    return <ContentBody>
        <H1Title>
            主題目錄
        </H1Title>
        <AllTopics />
    </ContentBody>
}