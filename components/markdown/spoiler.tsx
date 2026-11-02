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
            className={`${BLOCK_MARGIN} group border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300`}
        >
            <summary className="list-none cursor-pointer select-none px-5 py-3 bg-gray-50/80 hover:bg-gray-100 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-700 font-bold text-sm">
                    <div className="w-6 h-6 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                        <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="text-[10px]"
                        />
                    </div>
                    {props.title ?? "暴雷內容"}
                </div>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-[10px] text-gray-400 group-open:rotate-90 transition-transform duration-300"
                />
            </summary>
            <div className="px-6 py-3 border-t border-gray-100 leading-relaxed bg-white">
                {props.children}
            </div>
        </details>
    )
}
