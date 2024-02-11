import { MarkdownContextType, ReferenceType } from "./types";
import Link from "next/link";

function encodeID(id: string) {
    return "ref-" + id;
}

export function Reference(context: MarkdownContextType) {
    return ({ type, id }: ReferenceType) => {
        return <Link href={"#" + encodeID(id)}>Reference here</Link>;
    };
}
