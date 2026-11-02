import { ReactNode } from "react"
import { HyperRefBlank } from "@/components/basic"
import Image from "next/image"

// Class names must be written out in full so that Tailwind can detect them
const MAX_WIDTH_CLASSES = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    fit: "max-w-fit",
}

type ContentBodyProps = {
    children: ReactNode
    maxWidth?: keyof typeof MAX_WIDTH_CLASSES
}
export function ContentBody({ children, maxWidth = "4xl" }: ContentBodyProps) {
    return (
        <div
            className={`px-4 ${MAX_WIDTH_CLASSES[maxWidth]} mx-auto pt-8 pb-3`}
        >
            {children}
        </div>
    )
}

export function PageFooter() {
    return (
        <footer className="w-full max-w-4xl mx-auto px-6 mt-32 mb-16 pt-12 border-t border-line">
            <div className="flex flex-col md:flex-row justify-between gap-12">
                {/* Brand Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="NTUCPC Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-extrabold text-fg-strong tracking-tight">
                                國立臺灣大學程式解題社
                            </span>
                            <span className="text-[10px] font-bold text-fg-subtle uppercase tracking-widest">
                                NTU Competitive Programming Club
                            </span>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex flex-col gap-4 md:text-right">
                    <div className="text-sm text-fg-muted leading-relaxed">
                        This work is licensed under{" "}
                        <br className="hidden md:block" />
                        <HyperRefBlank href="https://creativecommons.org/licenses/by-sa/4.0/">
                            CC BY-SA 4.0
                        </HyperRefBlank>
                    </div>
                </div>
            </div>
        </footer>
    )
}
