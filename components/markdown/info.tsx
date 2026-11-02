import { BLOCK_MARGIN } from "@/components/basic"
import { ReactNode } from "react"

type InfoProps = {
    type: string
    children: ReactNode
}

export function Info(props: InfoProps) {
    const colors: { [type: string]: string } = {
        info: "indigo",
        warning: "amber",
        danger: "rose",
        success: "emerald",
    }
    const color = colors[props.type] || colors.info

    return (
        <div
            className={`${BLOCK_MARGIN} flex gap-4 px-5 py-3 rounded-xl border-l-4 bg-${color}-50/50 border-${color}-500/50 text-${color}-900 shadow-sm`}
        >
            <div className="flex-grow prose-sm prose-slate leading-relaxed">
                {props.children}
            </div>
        </div>
    )
}
