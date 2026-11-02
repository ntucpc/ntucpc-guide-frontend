import { faChevronRight, faLightbulb } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from "react"
import { Block, BlockHeader } from "./block"

export function Thinking({ children }: { children: ReactNode }) {
    return (
        <Block className="border-amber-100 dark:border-amber-900/60">
            <BlockHeader className="gap-3 border-b border-amber-50 bg-amber-50/30 dark:border-amber-900/40 dark:bg-amber-950/30">
                <span className="flex items-center gap-1.5 px-2 py-0.5 font-bold text-amber-500 dark:text-amber-400 text-sm">
                    <FontAwesomeIcon icon={faLightbulb} />
                    動動腦
                </span>
            </BlockHeader>
            <div className="px-6 pb-6 leading-relaxed">{children}</div>
        </Block>
    )
}

export function ThinkingAnswer({ children }: { children: ReactNode }) {
    return (
        <details className="group mt-4 border border-amber-100 dark:border-amber-900/60 rounded-lg overflow-hidden">
            <summary className="list-none cursor-pointer px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50/50 hover:bg-amber-100/60 dark:text-amber-300 dark:bg-amber-950/30 dark:hover:bg-amber-900/30 transition-colors flex items-center justify-between">
                <span>解答</span>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-[10px] text-amber-500 group-open:rotate-90 transition-transform"
                />
            </summary>
            <div className="px-4 py-3 border-t border-amber-100 dark:border-amber-900/60 leading-relaxed">
                {children}
            </div>
        </details>
    )
}
