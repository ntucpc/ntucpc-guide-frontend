import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { Block, BlockHeader } from "./block"

type SpoilerProps = {
    title?: string
    children: React.ReactNode
}

export function Spoiler(props: SpoilerProps) {
    return (
        <Block
            as="details"
            className="group border-line transition-all duration-300"
        >
            <BlockHeader
                as="summary"
                className="justify-between list-none cursor-pointer select-none bg-surface-subtle/80 hover:bg-surface-muted transition-colors"
            >
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
            </BlockHeader>
            <div className="px-6 py-3 border-t border-line leading-relaxed bg-surface">
                {props.children}
            </div>
        </Block>
    )
}
