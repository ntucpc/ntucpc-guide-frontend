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

type TheoremProps = {
    type: string
    number: string
    refId: string
    title: string
    children: ReactNode
}
export function Theorem(props: TheoremProps) {
    const configs: { [type: string]: { name: string; color: string } } = {
        theorem: { name: "Theorem", color: "indigo" },
        definition: { name: "Definition", color: "cyan" },
        lemma: { name: "Lemma", color: "emerald" },
        corollary: { name: "Corollary", color: "orange" },
        observation: { name: "Observation", color: "rose" },
        tips: { name: "Tips", color: "violet" },
    }

    const config = configs[props.type] || configs.theorem
    const { name, color } = config

    return (
        <div
            className={`${BLOCK_MARGIN} rounded-xl border border-${color}-100 overflow-hidden shadow-sm bg-white`}
        >
            <Anchor refId={`${props.type}-${props.refId}`} />
            <div
                className={`flex items-center gap-3 px-5 py-3 border-b border-${color}-50 bg-${color}-50/30`}
            >
                <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-${color}-500 text-white`}
                >
                    {name} {props.number}
                </span>
                <h4 className={`font-bold text-${color}-900`}>{props.title}</h4>
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
            className={`${BLOCK_MARGIN} border border-indigo-100 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300`}
        >
            <div
                className="flex justify-between items-center px-5 py-3 cursor-pointer select-none bg-indigo-50/30 hover:bg-indigo-50 transition-colors"
                onClick={() => setExpand(!expand)}
            >
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                    <FontAwesomeIcon icon={faPen} className="text-xs" />
                    證明
                </div>
                <FontAwesomeIcon
                    icon={expand ? faChevronUp : faChevronDown}
                    className={`text-xs text-indigo-400 transition-transform duration-300 ${
                        expand ? "" : "rotate-0"
                    }`}
                />
            </div>
            <div
                className={`px-6 py-2 border-t border-indigo-50 relative ${
                    expand ? "" : "hidden"
                }`}
            >
                <div className="leading-relaxed">{props.children}</div>
                <div className="flex justify-end mt-4 text-indigo-200">
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
            className="text-indigo-600 hover:text-indigo-800 font-medium underline decoration-indigo-200 underline-offset-4 decoration-2 hover:decoration-indigo-600 transition-all"
        >
            {text}
        </HyperRef>
    )
}
