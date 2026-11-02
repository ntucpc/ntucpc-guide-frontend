import { ReactNode } from "react"
import { HyperRefBlank } from "@/components/basic"
import Image from "next/image"

type ContentBodyProps = {
    children: ReactNode
    maxWidth?: string
}
export function ContentBody({ children, maxWidth = "4xl" }: ContentBodyProps) {
    return (
        <div className={`px-4 max-w-${maxWidth} mx-auto pt-8 pb-3`}>
            {children}
        </div>
    )
}

export function PageFooter() {
    return (
        <footer className="w-full max-w-4xl mx-auto px-6 mt-32 mb-16 pt-12 border-t border-gray-100">
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
                            <span className="font-extrabold text-gray-900 tracking-tight">
                                國立臺灣大學程式解題社
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                NTU Competitive Programming Club
                            </span>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex flex-col gap-4 md:text-right">
                    <div className="text-sm text-gray-500 leading-relaxed">
                        This work is licensed under{" "}
                        <br className="hidden md:block" />
                        <HyperRefBlank
                            href="https://creativecommons.org/licenses/by-sa/4.0/"
                            className="text-indigo-600 hover:text-indigo-800 font-medium underline decoration-indigo-200 underline-offset-4 decoration-1 hover:decoration-indigo-600 transition-all"
                        >
                            CC BY-SA 4.0
                        </HyperRefBlank>
                    </div>
                </div>
            </div>
        </footer>
    )
}
