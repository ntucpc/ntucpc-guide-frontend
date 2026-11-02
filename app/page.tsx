import { ContentBody, PageFooter } from "@/components/layout"
import { NavBar } from "@/components/navbar"
import {
    Contributor,
    getContributors,
    getSpecialThanks,
} from "@/lib/contributors"
import { HyperRefBlank } from "@/components/basic"
import { WrappedLink } from "@/components/common"
import {
    faHeart,
    faUsers,
    faBookOpen,
    faCompass,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from "react"
import { getPublicRoot } from "@/lib/environment"
import { getTopic } from "@/lib/structure/topics"
import { getArticle } from "@/lib/structure/articles"
import Image from "next/image"

type ButtonLinkProps = {
    text: string
    url: string
    primary?: boolean
    icon?: IconDefinition
}

function ButtonLink({ text, url, primary = false, icon }: ButtonLinkProps) {
    return (
        <WrappedLink
            href={url}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                primary
                    ? "bg-accent-600 text-white hover:bg-accent-700 dark:bg-accent-400 dark:hover:bg-accent-300"
                    : "bg-surface text-accent-600 border border-accent-100 hover:bg-accent-50"
            }`}
        >
            {icon && <FontAwesomeIcon icon={icon} className="text-sm" />}
            {text}
        </WrappedLink>
    )
}

function SectionTitle({
    children,
    icon,
}: {
    children: ReactNode
    icon: IconDefinition
}) {
    return (
        <div className="flex flex-col items-center gap-3 mb-12 mt-20">
            <div className="w-12 h-12 rounded-2xl bg-accent-50 text-accent-500 flex items-center justify-center text-xl shadow-sm">
                <FontAwesomeIcon icon={icon} />
            </div>
            <h2 className="text-3xl font-extrabold text-fg-strong tracking-tight">
                {children}
            </h2>
            <div className="h-1 w-12 bg-accent-500 rounded-full" />
        </div>
    )
}

function ContributorCard({
    contributor,
    publicRoot,
}: {
    contributor: Contributor
    publicRoot: string
}) {
    const photoUrl =
        `/${publicRoot}/contributors/photos/${contributor.code}.png`.replace(
            /\/+/g,
            "/"
        )
    return (
        <div className="group bg-surface rounded-2xl border border-line p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="shrink-0 relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-line-subtle shadow-sm group-hover:border-accent-100 transition-colors">
                <img
                    src={photoUrl}
                    alt={contributor.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-4 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-fg-strong group-hover:text-accent-600 transition-colors">
                        {contributor.name}
                    </h3>
                    <span className="text-sm font-medium text-fg-subtle">
                        @{contributor.handle}
                    </span>
                </div>
                <div className="text-sm text-fg-tertiary leading-relaxed">
                    <ul className="space-y-1">
                        {contributor.experience.map((entry, index) => (
                            <li key={index} className="flex gap-2">
                                <span className="text-accent-400 font-bold">
                                    •
                                </span>
                                <span>{entry}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default function HomePage() {
    const guideTopic = getTopic("Guide")
    const guideContents: { text: string; code: string }[] = []
    if (guideTopic) {
        for (const content of guideTopic.contents) {
            const article = getArticle(content)
            const articleTitle = article?.title ?? content
            guideContents.push({ text: articleTitle, code: content })
        }
    }

    const contributors = getContributors()
    const publicRoot = getPublicRoot()
    const specialThanks = getSpecialThanks()
    const isDev = process.env.NODE_ENV === "development"

    return (
        <div className="min-h-screen bg-page">
            <NavBar />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-100 dark:bg-gray-900 pt-16 pb-24 md:pt-24 md:pb-32 border-b border-line-subtle">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0 bg-home bg-cover bg-center dark:opacity-[0.06]" />

                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-accent-200 rounded-full blur-[120px] opacity-40 z-0" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-accent-200 rounded-full blur-[120px] opacity-40 z-0" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
                    {/*
                     * banner2.png has black text; guide_banner.png is the same design in white,
                     * but with different transparent padding. At the same height and left-aligned,
                     * their contents line up, so banner2.png keeps the layout in dark mode (invisible)
                     * and guide_banner.png is laid over it.
                     */}
                    <div className="relative mb-12">
                        <Image
                            src="/banner2.png"
                            alt="NTUCPC Guide Banner"
                            width={600}
                            height={200}
                            className="w-full max-w-xl h-auto dark:invisible"
                            priority
                        />
                        <Image
                            src="/guide_banner.png"
                            alt="NTUCPC Guide Banner"
                            width={1000}
                            height={241}
                            className="absolute top-0 left-0 h-full w-auto max-w-none hidden dark:block"
                            priority
                        />
                    </div>

                    <h1 className="text-xl md:text-3xl font-bold text-fg-strong tracking-tight mb-8 max-w-3xl">
                        由專業選手們撰寫的自學講義，
                        <br />
                        <span className="text-accent-600">
                            帶領新手從零成為程式競賽高手！
                        </span>
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <ButtonLink
                            text="開始閱讀：章節目錄"
                            url="/chapters"
                            primary
                            icon={faBookOpen}
                        />
                        <ButtonLink
                            text="快速瀏覽：主題目錄"
                            url="/topics"
                            icon={faCompass}
                        />
                    </div>
                </div>
            </div>

            <ContentBody maxWidth="6xl">
                {/* Introduction Section */}
                <SectionTitle icon={faBookOpen}>網站簡介</SectionTitle>

                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg text-fg-tertiary leading-relaxed mb-8">
                        NTUCPC Guide
                        是由專業程式競賽選手編寫的講義，提供適合新手自學、由淺入深的程式競賽學習資源。
                    </p>
                    <p className="text-fg-muted font-medium mb-12 flex items-center justify-center gap-2">
                        <span className="w-8 h-px bg-line-strong" />
                        不知道怎麼開始嗎？看看網站簡介吧！
                        <span className="w-8 h-px bg-line-strong" />
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {guideContents.map((content, idx) => (
                            <WrappedLink
                                key={idx}
                                href={`/${content.code}`}
                                className="px-4 py-2 rounded-xl bg-accent-50 text-accent-600 font-bold text-sm hover:bg-accent-100 hover:text-accent-700 transition-all border border-accent-100/50"
                            >
                                {content.text}
                            </WrappedLink>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <SectionTitle icon={faUsers}>團隊成員</SectionTitle>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {contributors.map((contributor, index) => (
                        <ContributorCard
                            key={index}
                            contributor={contributor}
                            publicRoot={publicRoot}
                        />
                    ))}
                </div>

                {/* Acknowledgements Section */}
                <SectionTitle icon={faHeart}>致謝</SectionTitle>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-accent-50/50 border border-accent-100 rounded-2xl p-8 text-center mb-12">
                        <p className="text-fg-secondary leading-relaxed mb-6">
                            NTUCPC Guide
                            受到來自許多人與其他網站的啟發，特別感謝
                            <HyperRefBlank
                                href="https://usaco.guide/"
                                className="mx-1 text-accent-600 font-bold hover:underline"
                            >
                                USACO Guide
                            </HyperRefBlank>{" "}
                            和
                            <HyperRefBlank
                                href="https://oi-wiki.org/"
                                className="mx-1 text-accent-600 font-bold hover:underline"
                            >
                                OI Wiki
                            </HyperRefBlank>
                            給了我們很多啟發，也感謝所有在網路上公開程式競賽資源的人們。
                        </p>

                        <div className="space-y-6 pt-6 border-t border-accent-100">
                            {specialThanks.map((group, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-3"
                                >
                                    <div className="text-xs font-bold text-fg-subtle uppercase tracking-widest">
                                        {group.text}
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                                        {group.members.map(
                                            ([name, handle], idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-baseline gap-1.5"
                                                >
                                                    <span className="font-bold text-fg-secondary">
                                                        {name}
                                                    </span>
                                                    <span className="text-xs text-fg-subtle font-medium">
                                                        @{handle}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {isDev && (
                    <div className="mt-20 pt-12 border-t border-line">
                        <div className="flex flex-col items-center gap-6">
                            <div className="px-4 py-2 rounded-lg bg-orange-50 border border-orange-100 text-orange-700 dark:bg-orange-950/40 dark:border-orange-900/60 dark:text-orange-300 text-sm font-medium">
                                🛠️ You are in development mode! （Production
                                不會有這區塊）
                            </div>
                            <div className="flex flex-wrap justify-center gap-4">
                                <ButtonLink text="全部東西" url="/test/all" />
                                <ButtonLink
                                    text="題目清單"
                                    url="/test/problems"
                                    primary
                                />
                            </div>
                        </div>
                    </div>
                )}
            </ContentBody>
            <PageFooter />
        </div>
    )
}
