import { WrappedLink } from "@/ntucpc-website-common-lib/components/common";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

type NavbarItemProps = {
    text: string,
    url: string,
    blank?: boolean
};
export function NavbarItem({text, url, blank=false}: NavbarItemProps) {
    return <div className="">
        <WrappedLink href={url} className="hover:bg-slate-950 px-3 py-3 mx-2 color-animation-long" target={blank ? "_blank" : "_self"}>{text}</WrappedLink>
    </div>
}
export function ExpandedNavbarItem({text, url, blank=false}: NavbarItemProps) {
    return <div className="px-5 py-1">
        <WrappedLink href={url} target={blank ? "_blank" : "_self"}>
            {text}
        </WrappedLink>
    </div>
}

export function NavBar() {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <nav className="bg-slate-900 text-white sticky top-0 z-50">
            <div className="mx-auto w-full max-w-5xl flex items-center py-2 px-3 h-full">
                <Link href="/"><img className="h-12 w-auto" src="/guide_banner.png" alt="NTUCPC logo" /></Link>

                <div className="max-sm:hidden flex">
                    <NavbarItem text="章節目錄" url="/chapters" />
                    <NavbarItem text="主題目錄" url="/topics" />
                    <NavbarItem text="NCOJ" url="https://oj.ntucpc.org/" blank={true} />
                    <NavbarItem text="程式解題社" url="https://ntucpc.org/" blank={true} />
                </div>

                <div className="sm:hidden ml-auto w-5">
                    <button className="mx-auto" onClick={() => {setShowMenu(!showMenu)}}>
                        <FontAwesomeIcon className={showMenu ? "text-xl" : ""} icon={showMenu ? faXmark : faBars}/>
                    </button>
                </div>
            </div>
            <div className={`bg-slate-950 py-2 sm:hidden ${showMenu ? "" : "hidden"}`}>
                <ExpandedNavbarItem text="章節目錄" url="/chapters" />
                <ExpandedNavbarItem text="主題目錄" url="/topics" />
                <ExpandedNavbarItem text="NCOJ" url="https://oj.ntucpc.org/" blank={true} />
                <ExpandedNavbarItem text="程式解題社" url="https://ntucpc.org/" blank={true} />
            </div>
        </nav>
    );
}
