import { getTopicArticleGroups } from "@/lib/structure"
import { getChapter } from "@/lib/structure/chapters"
import { getTopics } from "@/lib/structure/topics"
import { Topic } from "@/lib/structure/type"
import { composeMetadata } from "@/lib/util"
import { H1Title } from "@/ntucpc-website-common-lib/components/basic"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

function TopicCard({ topic }: { topic: Topic }) {
    const groups = getTopicArticleGroups(topic)

    return (
        <div className="group bg-white overflow-hidden">
            <Link href={`/${topic.code}`} className="block group/header mb-4">
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-2xl font-extrabold text-gray-900 group-hover/header:text-indigo-700 transition-colors">
                        {topic.title}
                    </h2>
                    <span className="text-xs font-semibold text-gray-400 group-hover/header:text-indigo-600 flex items-center gap-1 transition-colors">
                        查看詳情{" "}
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className="text-[10px]"
                        />
                    </span>
                </div>

                <p className="text-gray-500 text-sm italic line-clamp-2">
                    {topic.description}
                </p>
            </Link>

            <div className="space-y-3">
                {groups.map((group) => {
                    const chapterTitle =
                        group.code === "unknown"
                            ? "其他"
                            : `Chapter ${getChapter(group.code).number}`
                    return (
                        <div
                            key={group.code}
                            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
                        >
                            <div className="flex items-center gap-2 min-w-[90px] shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    {chapterTitle}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 ml-3.5 sm:ml-0">
                                {group.articles.map((article, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center"
                                    >
                                        {!article.coming ? (
                                            <Link
                                                href={`/${article.code}`}
                                                className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                                            >
                                                {article.title}
                                            </Link>
                                        ) : (
                                            <span className="text-sm text-gray-300">
                                                {article.title}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export const metadata = composeMetadata("主題目錄")

export default function TopicsPage() {
    const topics = getTopics()

    return (
        <div className="pb-20">
            <div className="mb-12 border-b border-gray-100">
                <H1Title>主題目錄</H1Title>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
                {topics.map((topic) => (
                    <TopicCard key={topic.code} topic={topic} />
                ))}
            </div>
        </div>
    )
}
