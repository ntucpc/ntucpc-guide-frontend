import { IconWrapper } from "@/components/icon";
import { getChapterArticleGroups } from "@/lib/structure";
import { getChapters } from "@/lib/structure/chapters";
import { getTopic } from "@/lib/structure/topics";
import { Chapter } from "@/lib/structure/type";
import { composeMetadata } from "@/lib/util";
import { H1Title } from "@/ntucpc-website-common-lib/components/basic";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function ChapterCard({ chapter }: { chapter: Chapter }) {
    const groups = getChapterArticleGroups(chapter)
    
    return (
        <div className="group bg-white overflow-hidden mb-12">
            <div className="flex flex-col sm:flex-row gap-8">
                
                <Link href={`/chapter/${chapter.code}`} className="flex flex-col sm:flex-row gap-8 flex-grow group/header">
                    {/* Icon Section */}
                    <div className={`flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-2xl bg-gray-50 text-6xl transition-all duration-300 group-hover/header:bg-indigo-50 text-${chapter.iconColor || 'indigo-500'}`}>
                        <IconWrapper iconName={chapter.icon} />
                    </div>
                    
                    {/* Content Header Section */}
                    <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-indigo-500 tracking-widest uppercase bg-indigo-50 px-2 py-1 rounded">
                                Chapter {chapter.number}
                            </span>
                            <span className="text-xs font-semibold text-gray-400 group-hover/header:text-indigo-600 flex items-center gap-1 transition-colors">
                                查看詳情 <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
                            </span>
                        </div>
                        
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-3 group-hover/header:text-indigo-700 transition-colors">
                            {chapter.title}
                        </h2>
                        
                        <p className="text-gray-500 text-sm italic">
                            {chapter.description}
                        </p>
                    </div>
                </Link>
            </div>

            <div className="mt-8 sm:ml-32 space-y-3">
                {groups.map(group => {
                    const topic = getTopic(group.code)
                    return (
                        <div key={group.code} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                            <div className="flex items-center gap-2 min-w-[120px] shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                <span className="text-sm font-bold text-gray-700">{topic.title}</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 ml-3.5 sm:ml-0">
                                {group.articles.map((article, idx) => (
                                    <div key={idx} className="flex items-center">
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

export const metadata = composeMetadata("章節目錄")

export default function ChaptersPage() {
    const chapters = getChapters()
    
    return (
        <div className="pb-20">
            <div className="mb-8 border-b border-gray-100">
                <H1Title>章節目錄</H1Title>
            </div>
            
            <div className="flex flex-col">
                {chapters.map((chapter) => (
                    <ChapterCard key={chapter.code} chapter={chapter} />
                ))}
            </div>
        </div>
    )
}
