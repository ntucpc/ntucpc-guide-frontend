type ImportanceTagProps = {
    importance: number
    overwriteColor?: string | undefined
}
export function ImportanceTag({ importance, overwriteColor = undefined }: ImportanceTagProps) {
    if (importance == 0) return <></>
    if (!(1 <= importance && importance <= 5))
        throw Error(`Invalid importance ${importance}`)
    const colors = ["bg-slate-500", "bg-cyan-500", "bg-green-500", "bg-orange-500", "bg-rose-500"];
    const texts = ["博雅", "罕見", "常用", "重要", "必學"];
    const color = overwriteColor === undefined ? colors[importance - 1] : overwriteColor
    const text = texts[importance - 1]
    return <span className={`${color} text-white rounded-full px-2 py-0.5 font-medium text-nowrap mx-1 text-xs`}>
        {text}
    </span>
}

export function ComingSoonTag() {
    return <span className={`bg-gray-700 text-white rounded-full px-2 py-0.5 font-medium text-nowrap mx-1 text-xs`}>
        敬請期待
    </span>
}