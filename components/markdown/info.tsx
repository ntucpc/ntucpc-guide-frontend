import { BLOCK_MARGIN } from "@/components/basic"
import { ReactNode } from "react"

type InfoProps = {
    type: string
    children: ReactNode
}

// Class names must be written out in full so that Tailwind can detect them
const INFO_CLASSES: { [type: string]: string } = {
    info: "bg-indigo-50/50 border-indigo-500/50 text-indigo-900",
    warning: "bg-amber-50/50 border-amber-500/50 text-amber-900",
    danger: "bg-rose-50/50 border-rose-500/50 text-rose-900",
    success: "bg-emerald-50/50 border-emerald-500/50 text-emerald-900",
}

export function Info(props: InfoProps) {
    const classes = INFO_CLASSES[props.type] || INFO_CLASSES.info

    return (
        <div
            className={`${BLOCK_MARGIN} flex gap-4 px-5 py-3 rounded-xl border-l-4 ${classes} shadow-sm`}
        >
            <div className="flex-grow leading-relaxed">{props.children}</div>
        </div>
    )
}
