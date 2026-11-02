import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { BLOCK_MARGIN } from "@/components/basic"

type SpoilerProps = {
    title?: string
    children: React.ReactNode
}

export function Spoiler(props: SpoilerProps) {
    return (
        <details
            className={`${BLOCK_MARGIN} group border border-line rounded-xl overflow-hidden bg-surface shadow-sm transition-all duration-300`}
        >
            <summary className="list-none cursor-pointer select-none px-5 py-3 bg-surface-subtle/80 hover:bg-surface-muted transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3 text-fg-secondary font-bold text-sm">
                    <div className="w-6 h-6 rounded-lg bg-surface-strong flex items-center justify-center text-fg-muted shrink-0">
                        <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="text-[10px]"
                        />
                    </div>
                    {props.title ?? "暴雷內容"}
                </div>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-[10px] text-fg-subtle group-open:rotate-90 transition-transform duration-300"
                />
            </summary>
            <div className="px-6 py-3 border-t border-line leading-relaxed bg-surface">
                {props.children}
            </div>
        </details>
    )
}
