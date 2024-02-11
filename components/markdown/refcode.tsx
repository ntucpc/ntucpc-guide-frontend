import { MarkdownContextType, RefcodeType } from "./types";

export function Refcode(context: MarkdownContextType) {
    return ({ code }: RefcodeType) => {
        // Temporary workaround for debugging display, should be replaced by css or anything.
        return <code style={{ whiteSpace: "pre-wrap" }}>{code}</code>;
    };
}
