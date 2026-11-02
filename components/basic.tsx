/* eslint-disable @typescript-eslint/no-explicit-any */
import { Anchor, WrappedLink } from "@/components/common"

export const PARAGRAPH_SEP = `my-5`
export const BLOCK_MARGIN = `my-10`
export const LIST_PADDING_LEFT = `pl-8`
export const TITLE_PADDING_TOP = `mt-12`
export const TITLE_PADDING_TOP_BIG = `mt-16`
export const TITLE_PADDING_BOTTOM = `mb-6`
export const TITLE_FONT = `font-bold text-fg-strong tracking-tight`
export const SCROLL = `overflow-x-auto overflow-y-hidden`

// props: sectionId
export function H1Title(props: any) {
    return (
        <div className={`${TITLE_PADDING_TOP_BIG} ${TITLE_PADDING_BOTTOM}`}>
            <Anchor refId={props.refId} />
            <h1 className={`text-5xl ${TITLE_FONT}`}>{props.children}</h1>
        </div>
    )
}
export function H2Title(props: any) {
    return (
        <div className={TITLE_PADDING_TOP_BIG}>
            <Anchor refId={props.refId} />
            <h2 className={`text-3xl mb-3 ${TITLE_FONT}`}>{props.children}</h2>
            <div className="h-1 w-20 bg-accent-500 rounded-full mb-8" />
        </div>
    )
}
export function H3Title(props: any) {
    return (
        <div className={`${TITLE_PADDING_TOP} ${TITLE_PADDING_BOTTOM}`}>
            <Anchor refId={props.refId} />
            <h3 className={`text-2xl ${TITLE_FONT}`}>{props.children}</h3>
        </div>
    )
}
export function H4Title(props: any) {
    return (
        <div className={`${TITLE_PADDING_TOP} ${TITLE_PADDING_BOTTOM}`}>
            <Anchor refId={props.refId} />
            <h4 className={`text-xl ${TITLE_FONT}`}>{props.children}</h4>
        </div>
    )
}
export function H5Title(props: any) {
    return (
        <div className={`${TITLE_PADDING_TOP} ${TITLE_PADDING_BOTTOM}`}>
            <Anchor refId={props.refId} />
            <h5 className={`text-lg ${TITLE_FONT}`}>{props.children}</h5>
        </div>
    )
}
export function H6Title(props: any) {
    return (
        <div className={`${TITLE_PADDING_TOP} ${TITLE_PADDING_BOTTOM}`}>
            <Anchor refId={props.refId} />
            <h6 className={`text-base ${TITLE_FONT}`}>{props.children}</h6>
        </div>
    )
}

export function Paragraph(props: any) {
    return (
        <p
            className={`${PARAGRAPH_SEP} text-fg leading-relaxed text-justify ${SCROLL}`}
            {...props}
        />
    )
}

export function Quote(props: any) {
    return (
        <blockquote
            className={`border-l-4 pl-6 py-2 italic text-fg-muted border-accent-200 bg-accent-50/30 rounded-r-lg ${PARAGRAPH_SEP}`}
            {...props}
        />
    )
}

export function UnorderedList(props: any) {
    return (
        <ul
            className={`list-disc ${LIST_PADDING_LEFT} ${SCROLL} text-fg-secondary space-y-2 my-6`}
            {...props}
        />
    )
}
export function OrderedList(props: any) {
    return (
        <ol
            className={`list-decimal ${LIST_PADDING_LEFT} ${SCROLL} text-fg-secondary space-y-2 my-6`}
            {...props}
        />
    )
}

export function HyperRef(props: any) {
    return (
        <WrappedLink
            className="text-accent-600 hover:text-accent-800 font-medium underline decoration-accent-200 underline-offset-4 decoration-2 hover:decoration-accent-600 transition-all"
            {...props}
        />
    )
}
export function HyperRefBlank(props: any) {
    return <HyperRef target="_blank" {...props} />
}

export function HorizontalLine() {
    return <hr className="my-12 border-line" />
}

export function Table(props: any) {
    return (
        <div className={`overflow-x-auto my-8 border border-line rounded-xl`}>
            <table className="w-full text-left border-collapse" {...props} />
        </div>
    )
}

export function TableHead(props: any) {
    return (
        <thead
            className="bg-surface-subtle/50 border-b border-line"
            {...props}
        />
    )
}

export function TableBody(props: any) {
    return <tbody className="divide-y divide-line-subtle" {...props} />
}

export function TableRow(props: any) {
    return (
        <tr
            className="hover:bg-surface-subtle/50 transition-colors"
            {...props}
        />
    )
}

export function TableHeadCell(props: any) {
    return (
        <th
            className="px-6 py-4 text-sm font-bold text-fg-strong uppercase tracking-wider"
            {...props}
        />
    )
}

export function TableCell(props: any) {
    return (
        <td
            className="px-6 py-4 text-sm text-fg-tertiary leading-relaxed"
            {...props}
        />
    )
}

export function getBasicComponents() {
    return {
        h1: H1Title,
        h2: H2Title,
        h3: H3Title,
        h4: H4Title,
        h5: H5Title,
        h6: H6Title,
        p: Paragraph,
        blockquote: Quote,
        ul: UnorderedList,
        ol: OrderedList,
        a: HyperRefBlank,
        hr: HorizontalLine,
        table: Table,
        thead: TableHead,
        tbody: TableBody,
        tr: TableRow,
        th: TableHeadCell,
        td: TableCell,
    }
}
