'use client'

import { reloadHighlightJs, reloadMathJax } from "@/ntucpc-website-common-lib/scripts/reload"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function PageReloader() {
    const pathname = usePathname()

    useEffect(() => {
        reloadMathJax()
        reloadHighlightJs()
    }, [pathname])

    return null
}