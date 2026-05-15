import { Article } from "@/lib/structure/type"
import Link from "next/link"
import { ComingSoonTag, ImportanceTag } from "./common"
import { SimpleMarkdown } from "./markdown/markdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

function ArticleEntry(article: Article) {
    const transitionStyle = "transition-all duration-300"

    const Content = (
        <div className="relative pl-8 group pb-8">
            {/* Timeline Line */}
            <div
                className={`absolute left-[5px] top-0 bottom-0 w-[2px] bg-gray-100 group-hover:bg-indigo-100 ${transitionStyle}`}
            />

            {/* Timeline Dot */}
            <div
                className={`absolute left-0 top-2 w-[12px] h-[12px] rounded-full border-2 border-white ring-2 ring-gray-200 bg-white z-10 group-hover:ring-indigo-400 group-hover:bg-indigo-500 ${transitionStyle}`}
            />

            <div className="flex flex-col">
                <div
                    className={`text-xl font-bold ${
                        article.coming
                            ? "text-gray-400"
                            : "text-gray-900 group-hover:text-indigo-600"
                    } ${transitionStyle}`}
                >
                    {article.title}
                    {article.coming && (
                        <span className="ml-2 inline-block">
                            <ComingSoonTag />
                        </span>
                    )}
                </div>

                <div
                    className={`mt-2 text-sm text-gray-500 leading-relaxed ${
                        !article.coming && "group-hover:text-gray-600"
                    } ${transitionStyle}`}
                >
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                        <ImportanceTag importance={article.importance} />
                    </div>
                    <SimpleMarkdown text={article.description} />
                </div>
            </div>
        </div>
    )

    if (article.coming) {
        return <div className="block">{Content}</div>
    }

    return (
        <Link href={`/${article.code}`} className="block">
            {Content}
        </Link>
    )
}

export type SectionEntryProps = {
    url: string
    title: string
    description: string
    articles: Article[]
}

export function SectionEntry({
    url,
    title,
    description,
    articles,
}: SectionEntryProps) {
    return (
        <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Section Sidebar */}
            <div className="md:w-64 shrink-0">
                <div className="sticky top-24">
                    {url ? (
                        <Link
                            href={url}
                            className="group/link inline-flex items-center gap-2"
                        >
                            <h3 className="text-xl font-extrabold text-gray-900 group-hover/link:text-indigo-600 transition-colors">
                                {title}
                            </h3>
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="text-xs text-gray-300 group-hover/link:text-indigo-500 transition-transform group-hover/link:translate-x-1"
                            />
                        </Link>
                    ) : (
                        <h3 className="text-xl font-extrabold text-gray-900">
                            {title}
                        </h3>
                    )}
                    <div className="mt-2 text-sm text-gray-500 leading-relaxed italic">
                        <SimpleMarkdown text={description} />
                    </div>
                </div>
            </div>

            {/* Articles List */}
            <div className="flex-grow min-w-0">
                <div className="relative">
                    {articles.map((article, _) => (
                        <ArticleEntry key={article.code} {...article} />
                    ))}
                    {/* Final small dot to cap the line */}
                    <div className="absolute left-[3px] bottom-8 w-[6px] h-[6px] rounded-full bg-gray-100" />
                </div>
            </div>
        </div>
    )
}
