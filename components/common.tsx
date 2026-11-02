/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"

type ImportanceTagProps = {
    importance: number
}

export function ImportanceTag({ importance }: ImportanceTagProps) {
    if (importance === 0) return <></>
    if (!(1 <= importance && importance <= 5))
        throw Error(`Invalid importance ${importance}`)

    const styles = [
        {
            bg: "bg-slate-100 dark:bg-slate-900/40",
            text: "text-slate-600 dark:text-slate-300",
            label: "博雅",
        },
        {
            bg: "bg-cyan-100 dark:bg-cyan-900/40",
            text: "text-cyan-600 dark:text-cyan-300",
            label: "罕見",
        },
        {
            bg: "bg-emerald-100 dark:bg-emerald-900/40",
            text: "text-emerald-600 dark:text-emerald-300",
            label: "實用",
        },
        {
            bg: "bg-orange-100 dark:bg-orange-900/40",
            text: "text-orange-600 dark:text-orange-300",
            label: "重要",
        },
        {
            bg: "bg-rose-100 dark:bg-rose-900/40",
            text: "text-rose-600 dark:text-rose-300",
            label: "必學",
        },
    ]

    const style = styles[importance - 1]

    return (
        <span
            className={`${style.bg} ${style.text} px-2 py-0.5 rounded text-[12px] font-bold tracking-wider inline-flex items-center`}
        >
            {style.label}
        </span>
    )
}

export function ComingSoonTag() {
    return (
        <span className="bg-surface-muted text-fg-subtle px-2 rounded text-[10px] font-bold tracking-wider uppercase inline-flex items-center">
            敬請期待
        </span>
    )
}

export function WrappedLink(props: any) {
    if (props.href.startsWith("/")) return <Link {...props} />
    else return <a {...props} />
}

type AnchorProps = {
    refId: string
}
export function Anchor(props: AnchorProps) {
    return <a id={props.refId} className="block relative -top-[120px]" />
}
