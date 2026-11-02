import {
    IconDefinition,
    faCircleInfo,
    faTriangleExclamation,
    faBan,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons"
import { BLOCK_MARGIN } from "@/components/basic"
import { ReactNode } from "react"

type InfoProps = {
    type: string
    children: ReactNode
}

export function Info(props: InfoProps) {
    const configs: { [type: string]: { color: string; icon: IconDefinition } } =
        {
            info: { color: "indigo", icon: faCircleInfo },
            warning: { color: "amber", icon: faTriangleExclamation },
            danger: { color: "rose", icon: faBan },
            success: { color: "emerald", icon: faCircleCheck },
        }

    const config = configs[props.type] || configs.info
    const { color } = config
    // I don't know how to make a good positioning for icons...

    return (
        <div
            className={`${BLOCK_MARGIN} flex gap-4 px-5 py-3 rounded-xl border-l-4 bg-${color}-50/50 border-${color}-500/50 text-${color}-900 shadow-sm`}
        >
            <div className="flex-grow prose-sm prose-slate leading-relaxed">
                {props.children}
            </div>
        </div>
    )
}
