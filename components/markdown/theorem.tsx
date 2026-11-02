"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    faChevronDown,
    faChevronUp,
    faPen,
    faSquare,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BLOCK_MARGIN, HyperRef } from "@/components/basic"
import { ReactNode, useState } from "react"
import { Anchor } from "@/components/common"

const THEOREM_NAME: { [type: string]: string } = {
    theorem: "Theorem",
    definition: "Definition",
    lemma: "Lemma",
    corollary: "Corollary",
    observation: "Observation",
    tips: "Tips",
}

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

type TheoremProps = {
    type: string
    number: string
    refId: string
    title: string
    children: ReactNode
}
export function Theorem(props: TheoremProps) {
    const config = THEOREM_CONFIGS[props.type] || THEOREM_CONFIGS.theorem
    const { name, classes } = config

    return (
        <div
            className={`${BLOCK_MARGIN} rounded-xl border ${classes.border} overflow-hidden shadow-sm bg-surface`}
        >
            <Anchor refId={`${props.type}-${props.refId}`} />
            <div
                className={`flex items-center gap-3 px-5 py-3 border-b ${classes.header}`}
            >
                <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase ${classes.badge} text-white`}
                >
                    {name} {props.number}
                </span>
                <h4 className={`font-bold ${classes.title}`}>{props.title}</h4>
            </div>
            <div className="px-6 py-2 leading-relaxed">{props.children}</div>
        </div>
    )
}

// props: expanded
export function Proof(props: any) {
    const [expand, setExpand] = useState(props.expanded === "true")
    return (
        <div
            className={`${BLOCK_MARGIN} border border-accent-100 rounded-xl overflow-hidden bg-surface shadow-sm transition-all duration-300`}
        >
            <div
                className="flex justify-between items-center px-5 py-3 cursor-pointer select-none bg-accent-50/30 hover:bg-accent-50 transition-colors"
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
            </div>
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
        </div>
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
    let text
    switch (props.mode) {
        case "default":
        case "number":
            text = `${THEOREM_NAME[props.type]} ${props.number}.`
            break
        case "title":
            text = `${props.title}`
            break
        case "full":
            text = `${THEOREM_NAME[props.type]} ${props.number}. ${props.title}`
    }
    return (
        <HyperRef
            href={`#${props.type}-${props.refId}`}
            className="text-accent-600 hover:text-accent-800 font-medium underline decoration-accent-200 underline-offset-4 decoration-2 hover:decoration-accent-600 transition-all"
        >
            {text}
        </HyperRef>
    )
}
