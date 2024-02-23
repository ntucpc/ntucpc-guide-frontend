import { HyperlinkType, MarkdownContextType } from "./types";
import { Link } from "@mui/material";

export function Hyperlink(context: MarkdownContextType) {
    return ({ href, children }: HyperlinkType) => {
        return (
            <>
                <Link href={href}>{children}</Link>
            </>
        )
    }
}