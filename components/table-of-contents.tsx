import { WrappedLink } from "@/ntucpc-website-common-lib/components/common"

type ToCEntryProps = {
    text: string,
    url: string
}

type ToCSectionProps = {
    text: string
}

export function ToCSection(props: ToCSectionProps) {
    return <div className="mb-2 mt-4 font-semibold text-xl">{props.text}</div>
}

export function ToCEntry(props: ToCEntryProps) {
    return <div className="py-1 border-l-4 border-gray-200 pl-2
            hover:border-indigo-600 hover:text-indigo-600">
        <WrappedLink target="_self" href={props.url}>{props.text}</WrappedLink>
    </div>
}