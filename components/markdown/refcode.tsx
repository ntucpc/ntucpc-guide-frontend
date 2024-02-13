import { Paper } from "@mui/material";
import { MarkdownContextType, RefcodeType } from "./types";
import hljs from "highlight.js/lib/common";

export function Refcode(context: MarkdownContextType) {
    return ({ code }: RefcodeType) => {
        const code_hl = hljs.highlight(code, { language: "cpp" }).value;
        return (
            <Paper elevation={2} sx={{ padding: 2, margin: 2, overflow: "auto" }}>
                <pre>
                    <div dangerouslySetInnerHTML={{__html: code_hl}}></div>
                </pre>
            </Paper>
        );
    };
}
