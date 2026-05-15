import { Metadata } from "next"
import { Noto_Sans_TC } from "next/font/google"
import "@/styles/global.css"
import "@/styles/hljs-custom.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "@/styles/atom-one-dark.css"
import { NavBar } from "@/components/navbar"
import { PageFooter } from "@/components/layout"
import { getGAId } from "@/ntucpc-website-common-lib/lib/environments"
import { GATag } from "@/ntucpc-website-common-lib/components/analytics"

export const metadata: Metadata = {
    title: "NTUCPC Guide",
    description:
        "由專業選手們撰寫的程式競賽教學講義，以帶領新手從零成為程式競賽高手為目標。",
    openGraph: {
        siteName: "NTUCPC Guide",
        images: ["https://guide.ntucpc.org/preview.png"],
    },
    icons: {
        icon: ["/favicon/favicon-32x32.png", "/favicon/favicon-16x16.png"],
        shortcut: "/favicon/favicon.ico",
        apple: "/favicon/apple-touch-icon.png",
    },
}

const notoSansTC = Noto_Sans_TC({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-TW">
            <body className={notoSansTC.className}>
                {children}
                <GATag gaId={getGAId()} />
            </body>
        </html>
    )
}
