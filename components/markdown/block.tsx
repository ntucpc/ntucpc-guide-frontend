import { ReactNode } from "react"
import { BLOCK_MARGIN } from "@/components/basic"

type BlockProps = {
    /** Render as <details> for collapsible blocks */
    as?: "div" | "details"
    /** Border color and any extra classes */
    className?: string
    /** Initial open state of a <details> Block */
    open?: boolean
    children: ReactNode
}

/** Card shell shared by block-level markdown components (theorem, proof, problem, ...) */
export function Block({
    as: Tag = "div",
    className = "",
    open,
    children,
}: BlockProps) {
    return (
        <Tag
            open={Tag === "details" ? open : undefined}
            className={`${BLOCK_MARGIN} rounded-xl border overflow-hidden bg-surface shadow-sm ${className}`}
        >
            {children}
        </Tag>
    )
}

type BlockHeaderProps = {
    /** Render as <summary> inside a <details> Block */
    as?: "div" | "summary"
    /** Background, border, layout and any extra classes */
    className?: string
    onClick?: () => void
    children: ReactNode
}

/** Header row of a Block */
export function BlockHeader({
    as: Tag = "div",
    className = "",
    onClick,
    children,
}: BlockHeaderProps) {
    return (
        <Tag
            className={`flex items-center px-5 py-3 ${className}`}
            onClick={onClick}
        >
            {children}
        </Tag>
    )
}
