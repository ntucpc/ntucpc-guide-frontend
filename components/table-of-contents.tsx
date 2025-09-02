import { Article } from "@/lib/structure/type"
import { H2Title } from "@/ntucpc-website-common-lib/components/basic"
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common"
import { IconDefinition, faChevronDown, faChevronUp, faCircleChevronDown, faCircleChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { ReactNode } from "react"
import { ComingSoonTag, ImportanceTag } from "./common"

function ArticleEntry(article: Article) {
    const transitionStyle = "transition duration-200"
    if (article.coming) {
        return <div className="pb-4 relative pl-8 group block">
            <div className={`absolute left-0 top-2 w-4 h-4 bg-gray-300 group-hover:bg-indigo-600 rounded-full ${transitionStyle}`} />
            <div className={`absolute left-1.5 top-0 bottom-0 w-1 bg-gray-300 group-hover:bg-indigo-600 rounded-full ${transitionStyle}`} />
            <div className={`text-xl font-medium text-gray-500 ${transitionStyle}`}>
                {article.title} <ComingSoonTag/>
            </div>
            <div className={`text-sm mt-2 text-gray-500 ${transitionStyle}`}>
                <ImportanceTag importance={article.importance} />
                {article.description}
            </div>
        </div>
    }
    else {
        return <Link href={`/${article.code}`} className="pb-4 relative pl-8 group block">
            <div className={`absolute left-0 top-2 w-4 h-4 bg-gray-300 group-hover:bg-indigo-600 rounded-full ${transitionStyle}`} />
            <div className={`absolute left-1.5 top-0 bottom-0 w-1 bg-gray-300 group-hover:bg-indigo-600 rounded-full ${transitionStyle}`} />
            <div className={`text-xl font-medium text-gray-900 group-hover:text-indigo-600 ${transitionStyle}`}>
                {article.title}
            </div>
            <div className={`text-sm mt-2 text-gray-500 group-hover:text-indigo-500 ${transitionStyle}`}>
                <ImportanceTag importance={article.importance} />
                {article.description}
            </div>
        </Link>
    }
}

export type SectionEntryProps = {
    url: string
    title: string
    description: string
    articles: Article[]
}
export function SectionEntry({ url, title, description, articles }: SectionEntryProps) {
    const transitionStyle = "transition duration-200"
    return <div className="sm:flex sm:flex-row mb-4">
        <div className="flex-grow-0 flex-shrink-0 w-60 mb-4">
            {
                url ? <Link href={url} className={`text-2xl font-semibold hover:text-indigo-600 ${transitionStyle}`}>
                    {title}
                </Link> : <div className="text-2xl font-semibold"> {title} </div>
            }
            <div className="text-gray-500 mt-2 text-sm">
                {description}
            </div>
        </div>
        <div className="flex-grow relative">
            <div className="absolute left-1.5 top-0 bottom-0 w-1 bg-gray-300 rounded-full" />
            {
                articles.map(article => <ArticleEntry key={article.code} {...article} />)
            }
        </div>
    </div>
}