"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    faChevronDown,
    faChevronUp,
    faPen,
    faSquare,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { HyperRef } from "@/components/basic"
import { ReactNode, useState } from "react"
import { Anchor } from "@/components/common"
import { Block, BlockHeader } from "./block"

type TheoremConfig = {
    name: string
    classes: { border: string; header: string; badge: string; title: string }
}

// Class names must be written out in full so that Tailwind can detect them
const THEOREM_CONFIGS: { [type: string]: TheoremConfig } = {
    theorem: {
        name: "Theorem",
        classes: {
            border: "border-indigo-100",
            header: "border-indigo-50 bg-indigo-50/30",
            badge: "bg-indigo-500",
            title: "text-indigo-900",
        },
    },
    definition: {
        name: "Definition",
        classes: {
            border: "border-cyan-100",
            header: "border-cyan-50 bg-cyan-50/30",
            badge: "bg-cyan-500",
            title: "text-cyan-900",
        },
    },
    lemma: {
        name: "Lemma",
        classes: {
            border: "border-emerald-100",
            header: "border-emerald-50 bg-emerald-50/30",
            badge: "bg-emerald-500",
            title: "text-emerald-900",
        },
    },
    corollary: {
        name: "Corollary",
        classes: {
            border: "border-orange-100",
            header: "border-orange-50 bg-orange-50/30",
            badge: "bg-orange-500",
            title: "text-orange-900",
        },
    },
    observation: {
        name: "Observation",
        classes: {
            border: "border-rose-100",
            header: "border-rose-50 bg-rose-50/30",
            badge: "bg-rose-500",
            title: "text-rose-900",
        },
    },
    tips: {
        name: "Tips",
        classes: {
            border: "border-violet-100",
            header: "border-violet-50 bg-violet-50/30",
            badge: "bg-violet-500",
            title: "text-violet-900",
        },
    },
}

function getTheoremConfig(type: string): TheoremConfig {
    return THEOREM_CONFIGS[type] || THEOREM_CONFIGS.theorem
}

type TheoremProps = {
    type: string
    number: string
    refId: string
    title: string
    children: ReactNode
}
export function Theorem(props: TheoremProps) {
    const { name, classes } = getTheoremConfig(props.type)

    return (
        <Block className={classes.border}>
            <Anchor refId={`${props.type}-${props.refId}`} />
            <BlockHeader className={`gap-3 border-b ${classes.header}`}>
                <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase ${classes.badge} text-white`}
                >
                    {name} {props.number}
                </span>
                <h4 className={`font-bold ${classes.title}`}>{props.title}</h4>
            </BlockHeader>
            <div className="px-6 py-2 leading-relaxed">{props.children}</div>
        </Block>
    )
}

// props: expanded
export function Proof(props: any) {
    const [expand, setExpand] = useState(props.expanded === "true")
    return (
        <Block className="border-accent-100 transition-all duration-300">
            <BlockHeader
                className="justify-between cursor-pointer select-none bg-accent-50/30 hover:bg-accent-50 transition-colors"
                onClick={() => setExpand(!expand)}
            >
                <div className="flex items-center gap-2 text-accent-600 font-bold text-sm">
                    <FontAwesomeIcon icon={faPen} className="text-xs" />
                    證明
                </div>
                <FontAwesomeIcon
                    icon={expand ? faChevronUp : faChevronDown}
                    className={`text-xs text-accent-400 transition-transform duration-300 ${
                        expand ? "" : "rotate-0"
                    }`}
                />
            </BlockHeader>
            <div
                className={`px-6 py-2 border-t border-accent-50 relative ${
                    expand ? "" : "hidden"
                }`}
            >
                <div className="leading-relaxed">{props.children}</div>
                <div className="flex justify-end mt-4 text-accent-200">
                    <FontAwesomeIcon icon={faSquare} className="text-[0.8em]" />
                </div>
            </div>
        </Block>
    )
}

type TheoremReferenceProps = {
    mode: string
    type: string
    number: string
    title: string
    refId: string
}
export function TheoremReference(props: TheoremReferenceProps) {
    const { name } = getTheoremConfig(props.type)
    let text
    switch (props.mode) {
        case "default":
        case "number":
            text = `${name} ${props.number}.`
            break
        case "title":
            text = `${props.title}`
            break
        case "full":
            text = `${name} ${props.number}. ${props.title}`
    }
    return <HyperRef href={`#${props.type}-${props.refId}`}>{text}</HyperRef>
}
