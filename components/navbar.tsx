"use client"

import { WrappedLink } from "@/components/common"
import {
    faBars,
    faXmark,
    faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

type NavbarItemProps = {
    text: string
    url: string
    blank?: boolean
}

export function NavbarItem({ text, url, blank = false }: NavbarItemProps) {
    return (
        <div className="relative group flex items-center h-full">
            <WrappedLink
                href={url}
                className="px-4 py-2 h-full text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                target={blank ? "_blank" : "_self"}
            >
                {text}
                {blank && (
                    <FontAwesomeIcon
                        icon={faExternalLinkAlt}
                        className="text-[10px] opacity-50"
                    />
                )}
            </WrappedLink>
            {/* Animated Underline */}
            <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
        </div>
    )
}

export function ExpandedNavbarItem({
    text,
    url,
    blank = false,
}: NavbarItemProps) {
    return (
        <div className="px-6 py-3 border-b border-slate-800 last:border-none">
            <WrappedLink
                href={url}
                className="text-slate-300 hover:text-accent-400 font-medium flex justify-between items-center"
                target={blank ? "_blank" : "_self"}
            >
                {text}
                {blank && (
                    <FontAwesomeIcon
                        icon={faExternalLinkAlt}
                        className="text-xs opacity-50"
                    />
                )}
            </WrappedLink>
        </div>
    )
}

// Light: slate-900 at 95% opacity over white, which is how the navbar used to look in light mode
const NAVBAR_BG = "bg-[#1b2335] dark:bg-slate-900"

export function NavBar() {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <nav
            className={`${NAVBAR_BG} text-white sticky top-0 z-[1000] border-b border-slate-800 shadow-sm`}
        >
            <div className="mx-auto w-full max-w-[100rem] flex items-center justify-between px-6 h-16">
                {/* Logo Section */}
                <div className="flex items-center gap-8 h-full">
                    <Link
                        href="/"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <img
                            className="h-10 w-auto"
                            src="/guide_banner.png"
                            alt="NTUCPC logo"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="max-sm:hidden flex h-full">
                        <NavbarItem text="章節目錄" url="/chapters" />
                        <NavbarItem text="主題目錄" url="/topics" />
                        <NavbarItem
                            text="NCOJ"
                            url="https://oj.ntucpc.org/"
                            blank={true}
                        />
                        <NavbarItem
                            text="程式解題社"
                            url="https://ntucpc.org/"
                            blank={true}
                        />
                    </div>
                </div>

                {/* Theme Toggle (desktop) */}
                <ThemeToggle className="max-sm:hidden" />

                {/* Mobile Menu Toggle */}
                <div className="sm:hidden">
                    <button
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <FontAwesomeIcon
                            icon={showMenu ? faXmark : faBars}
                            className="text-xl"
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`
                absolute top-full left-0 w-full ${NAVBAR_BG} shadow-2xl sm:hidden border-b border-slate-800
                transition-all duration-300 ease-in-out origin-top
                ${
                    showMenu
                        ? "scale-y-100 opacity-100 visible"
                        : "scale-y-95 opacity-0 invisible"
                }
            `}
            >
                <div className="flex flex-col">
                    <ExpandedNavbarItem text="章節目錄" url="/chapters" />
                    <ExpandedNavbarItem text="主題目錄" url="/topics" />
                    <ExpandedNavbarItem
                        text="NCOJ"
                        url="https://oj.ntucpc.org/"
                        blank={true}
                    />
                    <ExpandedNavbarItem
                        text="程式解題社"
                        url="https://ntucpc.org/"
                        blank={true}
                    />
                </div>

                {/* Theme Toggle (mobile) */}
                <div className="flex justify-end px-4 py-2 border-t border-slate-800">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}
