import { H2Title } from "@/ntucpc-website-common-lib/components/basic"
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from "react"

type ToCEntryProps = {
    text: string,
    url: string
}

type ToCSubsectionProps = {
    text: string
}

type ToCSectionProps = {
    title: string,
    children: ReactNode,
    expand: boolean,
    toggleExpand: () => void
}

type ToCButtonProps = {
    onClick: () => void,
    text: string
}

export function ToCButton(props: ToCButtonProps) {
    return <button onClick={props.onClick} className="m-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-800 text-white select-none">
        {props.text}
    </button>
}

export function ToCSection(props: ToCSectionProps) {
    return <>
        <div className="mb-2 mt-7 font-semibold cursor-pointer flex justify-between items-end select-none" onClick={props.toggleExpand}>
            <div className="text-3xl ">
                {props.title}
            </div>
            <div className="text-xl">
                <FontAwesomeIcon icon={props.expand ? faChevronUp : faChevronDown} />
            </div>
        </div>
        <hr className="mb-4"/>
        <div className={props.expand ? "" : "hidden"}>
            {props.children}
        </div>
    </>
}

export function ToCSubsectionTitle(props: ToCSubsectionProps) {
    return <div className="mb-2 mt-4 font-semibold text-xl">{props.text}</div>
}

export function ToCEntry(props: ToCEntryProps) {
    return <div className="py-1 border-l-4 border-gray-200 pl-2
            hover:border-indigo-600 hover:text-indigo-600">
        <WrappedLink target="_self" href={props.url}>{props.text}</WrappedLink>
    </div>
}