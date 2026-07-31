import { faChevronRight, faLightbulb } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from "react"
import { BLOCK_MARGIN } from "@/ntucpc-website-common-lib/components/basic"

export function Thinking({ children }: { children: ReactNode }) {
    return (
        <div className={`${BLOCK_MARGIN} rounded-xl border border-amber-100 overflow-hidden shadow-sm bg-white`}>
            <div className="flex items-center gap-3 px-5 py-3 border-b border-amber-50 bg-amber-50/30">
                <span className="flex items-center gap-1.5 px-2 py-0.5 font-bold text-amber-500 text-sm">
                    <FontAwesomeIcon icon={faLightbulb} />
                    動動腦
                </span>
            </div>
            <div className="px-6 pb-6 prose-sm prose-slate max-w-none leading-relaxed">
                {children}
            </div>
        </div>
    )
}

export function ThinkingAnswer({ children }: { children: ReactNode }) {
    return (
        <details className="group mt-4 border border-amber-100 rounded-lg overflow-hidden">
            <summary className="list-none cursor-pointer px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50/50 hover:bg-amber-100/60 transition-colors flex items-center justify-between">
                <span>解答</span>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-[10px] text-amber-500 group-open:rotate-90 transition-transform"
                />
            </summary>
            <div className="px-4 py-3 border-t border-amber-100 prose-sm prose-slate max-w-none leading-relaxed">
                {children}
            </div>
        </details>
    )
}
