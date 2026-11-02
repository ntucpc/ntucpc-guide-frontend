import type { JSX } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faArrowUpRightFromSquare,
    faQuestionCircle,
    faStar,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons"
import { BLOCK_MARGIN, HyperRefBlank } from "@/components/basic"

/**
 * Problem attributes:
 * - url: url of online judge problem, defined in problem config (url)
 * - src: name of source, defined in problem config (src)
 * - name: problem name, defined in problem config (name)
 * - difficulty: difficulty, defined in the problem tag
 * - expanded: whether to expand the solution by default, true if the difficulty is 0
 * - descriptionMdx: description mdx file path, undefined if the file doesn't exist
 * - solution: solution name, defined in the problem tag
 * - solutionMdx: solution mdx file path, undefined if no solutoin
 */
type ProblemProps = {
    url: string
    src: string
    name: string
    difficulty: string
    expanded: string
    descriptionMdx: string
    solution: string
    solutionMdx: string
    constraintsMdx: string
}

// Class names must be written out in full so that Tailwind can detect them
const PROBLEM_THEMES = {
    sample: {
        label: "例題",
        header: "bg-indigo-50/30",
        badge: "bg-indigo-500",
        star: "text-indigo-500",
    },
    exercise: {
        label: "習題",
        header: "bg-emerald-50/30",
        badge: "bg-emerald-500",
        star: "text-emerald-500",
    },
}

export function Problem(
    depthLimit: number,
    MarkdownComponent: (props: {
        source: string
        depthLimit: number
    }) => Promise<JSX.Element>
) {
    return function ProblemComponent(props: ProblemProps) {
        const descriptionNode = props.descriptionMdx ? (
            <MarkdownComponent
                source={props.descriptionMdx}
                depthLimit={depthLimit}
            />
        ) : (
            <></>
        )
        const constraintsNode = props.constraintsMdx ? (
            <MarkdownComponent
                source={props.constraintsMdx}
                depthLimit={depthLimit}
            />
        ) : (
            <></>
        )

        const isSample = props.difficulty === "0"
        const theme = isSample ? PROBLEM_THEMES.sample : PROBLEM_THEMES.exercise

        let difficultyDisplay = null
        if (props.difficulty === "?") {
            difficultyDisplay = (
                <div
                    className="flex items-center gap-1 text-fg-subtle"
                    title="難度未知"
                >
                    <FontAwesomeIcon
                        icon={faQuestionCircle}
                        className="text-xs"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">
                        Unknown
                    </span>
                </div>
            )
        } else if (!isSample) {
            difficultyDisplay = (
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, index) => {
                        const active = index < parseInt(props.difficulty)
                        return (
                            <FontAwesomeIcon
                                key={index}
                                icon={active ? faStar : faEmptyStar}
                                className={`text-[10px] ${
                                    active ? theme.star : "text-fg-ghost"
                                }`}
                            />
                        )
                    })}
                </div>
            )
        }

        return (
            <div
                className={`${BLOCK_MARGIN} rounded-xl border border-line overflow-hidden shadow-sm bg-surface`}
            >
                {/* Header */}
                <div
                    className={`flex items-center justify-between px-5 py-3 border-b border-line-subtle ${theme.header}`}
                >
                    <div className="flex items-center gap-4">
                        <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase ${theme.badge} text-white`}
                        >
                            {theme.label}
                        </span>
                        <h4 className="font-bold text-fg-strong">
                            {props.name}
                        </h4>
                    </div>
                    {difficultyDisplay}
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    {/* Source Info */}
                    <div className="flex items-center gap-2 mb-4 text-[11px] font-bold text-fg-subtle tracking-wider">
                        <span>Source:</span>
                        {props.url ? (
                            <HyperRefBlank
                                href={props.url}
                                className="text-accent-500 hover:text-accent-700 transition-colors flex items-center gap-1.5"
                            >
                                {props.src}
                                <FontAwesomeIcon
                                    icon={faArrowUpRightFromSquare}
                                    className="text-[9px]"
                                />
                            </HyperRefBlank>
                        ) : (
                            <span>{props.src}</span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-4 leading-relaxed">
                        {descriptionNode}
                    </div>

                    {/* Constraints */}
                    {props.constraintsMdx && (
                        <details className="group border border-line rounded-lg overflow-hidden">
                            <summary className="list-none cursor-pointer px-4 py-2 text-xs font-bold text-fg-muted bg-surface-subtle/50 hover:bg-surface-subtle transition-colors flex items-center justify-between">
                                <span>條件限制</span>
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="text-[10px] group-open:rotate-90 transition-transform"
                                />
                            </summary>
                            <div className="px-4 py-3 text-sm text-fg-tertiary border-t border-line bg-surface">
                                {constraintsNode}
                            </div>
                        </details>
                    )}
                </div>
            </div>
        )
    }
}
