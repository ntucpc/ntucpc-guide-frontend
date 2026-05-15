import { ContentBody, PageFooter } from "@/components/layout"
import { NavBar } from "@/components/navbar"
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common"
import {
    faHome,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <NavBar />

            <main className="flex-grow flex items-center justify-center py-20">
                <ContentBody maxWidth="4xl">
                    <div className="flex flex-col items-center text-center">
                        {/* Visual element */}
                        <div className="relative mb-12 animate-bounce duration-[2000ms]">
                            <div className="w-32 h-32 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 text-6xl shadow-sm border border-rose-100">
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                                <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                                    404
                                </div>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            蛤，你怎麼在這裡
                        </h1>

                        <p className="text-gray-500 text-lg mb-12 max-w-md leading-relaxed">
                            看來你來到了一個不存在的地方，或是這份講義還在編寫中。別擔心，你可以先回到首頁。
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <WrappedLink
                                href="/"
                                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:bg-indigo-700 hover:-translate-y-0.5"
                            >
                                <FontAwesomeIcon
                                    icon={faHome}
                                    className="text-sm"
                                />
                                回到首頁
                            </WrappedLink>
                        </div>
                    </div>
                </ContentBody>
            </main>

            <PageFooter />
        </div>
    )
}
