"use client"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy, faCheck, faCode } from "@fortawesome/free-solid-svg-icons"
import { BLOCK_MARGIN } from "@/components/basic"

type RefcodeProps = {
    lang?: string
    lineno: "true" | "false"
    code: string
    startFrom: string
}

export function Refcode(props: RefcodeProps) {
    const [copied, setCopied] = useState(false)
    const lang = props.lang ?? "plaintext"
    const lineno = props.lineno
    const code = props.code
    const startFrom = props.startFrom

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const className = `${
        lineno === "true" ? "" : "nohljsln"
    } language-${lang} refcode`

    return (
        <div
            className={`${BLOCK_MARGIN} rounded-xl overflow-hidden border border-gray-800 bg-[#282c34] shadow-md group/code`}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#21252b] border-b border-gray-800/50">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                        icon={faCode}
                        className="text-gray-500 text-xs"
                    />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {lang}
                    </span>
                </div>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-700/50 transition-all text-gray-500 hover:text-gray-300"
                >
                    <FontAwesomeIcon
                        icon={copied ? faCheck : faCopy}
                        className="text-[10px]"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                        {copied ? "Copied" : "Copy"}
                    </span>
                </button>
            </div>

            {/* Code Body */}
            <div className="relative">
                <pre className="!m-0 !rounded-none !bg-transparent overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <code className={className} data-ln-start-from={startFrom}>
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    )
}
