type ImportanceTagProps = {
    importance: number
}

export function ImportanceTag({ importance }: ImportanceTagProps) {
    if (importance === 0) return <></>
    if (!(1 <= importance && importance <= 5))
        throw Error(`Invalid importance ${importance}`)
    
    const styles = [
        { bg: "bg-slate-100", text: "text-slate-600", label: "博雅" },
        { bg: "bg-cyan-100", text: "text-cyan-600", label: "罕見" },
        { bg: "bg-emerald-100", text: "text-emerald-600", label: "常用" },
        { bg: "bg-orange-100", text: "text-orange-600", label: "重要" },
        { bg: "bg-rose-100", text: "text-rose-600", label: "必學" },
    ];

    const style = styles[importance - 1];
    
    return (
        <span className={`${style.bg} ${style.text} px-2 py-0.5 rounded text-[12px] font-bold tracking-wider inline-flex items-center`}>
            {style.label}
        </span>
    )
}

export function ComingSoonTag() {
    return (
        <span className="bg-gray-100 text-gray-400 px-2 rounded text-[10px] font-bold tracking-wider uppercase inline-flex items-center">
            敬請期待
        </span>
    )
}
