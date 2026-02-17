'use client'

import { reloadHighlightJs, reloadMathJax } from "@/ntucpc-website-common-lib/scripts/reload"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function PageReloader() {
    const pathname = usePathname()

    useEffect(() => {
        const reload = () => {
            reloadMathJax()
            reloadHighlightJs()
        }
        const handle = requestAnimationFrame(reload)
        return () => cancelAnimationFrame(handle)
    }, [pathname])

    return null
}