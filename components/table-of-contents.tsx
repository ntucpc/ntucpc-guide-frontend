import { H2Title } from "@/ntucpc-website-common-lib/components/basic"
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common"
import { IconDefinition, faChevronDown, faChevronUp, faCircleChevronDown, faCircleChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from "react"

type ToCEntryProps = {
    text: string,
    url: string | undefined
}

type ToCSectionProps = {
    title: string
    children: ReactNode
    expand: boolean
    toggleExpand: () => void
}

type ToCSectionTemplateProps = {
    expand: boolean
    heading: ReactNode
    body: ReactNode
}

type ToCButtonProps = {
    onClick: () => void
    icon: IconDefinition
    text: string
}

export function ToCButton(props: ToCButtonProps) {
    return <button onClick={props.onClick} 
    className="m-1 py-2 px-3 rounded-full bg-indigo-600 hover:bg-indigo-800 text-white select-none">
        <FontAwesomeIcon icon={props.icon} className="text-sm"/> {props.text}
    </button>
}

export function ToCSectionTemplate(props: ToCSectionTemplateProps) {
    return <>
        {props.heading}
        <div className={props.expand ? "" : "hidden"}>
            {props.body}
        </div>
    </>
}

export function ToCSection(props: ToCSectionProps) {
    return <ToCSectionTemplate
        expand={props.expand}
        heading={ <>
        <div className="mb-2 mt-7 font-semibold cursor-pointer flex justify-between items-end select-none" onClick={props.toggleExpand}>
            <div className="text-3xl ">
                {props.title}
            </div>
            <div className="text-xl">
                <FontAwesomeIcon icon={props.expand ? faChevronUp : faChevronDown} />
            </div>
        </div>
        <hr className="mb-4" />
        </>}
        body={
        <div className={props.expand ? "" : "hidden"}>
            {props.children}
        </div>
        }
    />
}

export function ToCSubsection(props: ToCSectionProps) {
    return <ToCSectionTemplate
        expand={props.expand}
        heading={ 
        <div className="mt-4 mb-2 flex flex-nowrap items-center cursor-pointer select-none group" 
                onClick={props.toggleExpand}>
                <FontAwesomeIcon icon={props.expand ? faCircleChevronUp : faCircleChevronDown}
                    className={`flex-shrink-0 text-sm mr-2 
                    ${props.expand ? "text-indigo-500" : "text-gray-600 group-hover:text-indigo-500"}`} />
                <div className="font-semibold text-xl">
                    {props.title}
                </div>
            </div>}
        body={
            <div className={props.expand ? "" : "hidden"}>
                {props.children}
            </div>
        }
    />
}

export function ToCEntry(props: ToCEntryProps) {
    if (props.url)
        return <div className="py-1 border-l-4 border-gray-200 pl-2
                hover:border-indigo-600 hover:text-indigo-600">
            <WrappedLink target="_self" href={props.url}>{props.text}</WrappedLink>
        </div>
    else
        return <div className="py-1 border-l-4 border-gray-200 pl-2
                text-neutral-500">
            {props.text} <ComingSoonTag/>
        </div>
}

export function ComingSoonTag() {
    return <span className="text-xs rounded-full text-slate-400 ml-1">
        敬請期待
    </span>
}