import { MarkdownContextType, ReferenceType } from "./types";
import { Link } from "@mui/material";

function encodeID({ type, id }: ReferenceType) {
    return `ref-${type}-${id}`;
}

export function ReferenceAnchor(ref: ReferenceType) {
    return (
        <div id={encodeID(ref)} className="references"></div>
    )
}

export function Reference(context: MarkdownContextType) {
    return ({ type, id }: ReferenceType) => {
        return <Link href={`#${encodeID({type, id})}`}>Reference here</Link>;
    };
}
