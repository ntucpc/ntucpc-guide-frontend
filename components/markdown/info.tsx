import { BLOCK_MARGIN } from "@/components/basic"
import { ReactNode } from "react"

type InfoProps = {
    type: string
    children: ReactNode
}

// Class names must be written out in full so that Tailwind can detect them
const INFO_CLASSES: { [type: string]: string } = {
    info: "bg-indigo-50/50 border-indigo-500/50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-100",
    warning:
        "bg-amber-50/50 border-amber-500/50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100",
    danger: "bg-rose-50/50 border-rose-500/50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-100",
    success:
        "bg-emerald-50/50 border-emerald-500/50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100",
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
