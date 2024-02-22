import { Paper, Typography } from "@mui/material";
import { MarkdownContextType, RefcodeType } from "./types";
import hljs from "highlight.js/lib/common";

export function Refcode(context: MarkdownContextType) {
    return ({ lang, lineno, code }: RefcodeType) => {
        const code_hl = hljs.highlight(code, { language: lang }).value;
        // TODO: add line number
        return (
            <Paper elevation={2} sx={{ padding: 2, margin: 2, overflow: "auto" }}>
                <Typography>lang: {lang}, lineno: {lineno}</Typography>
                <pre>
                    <div dangerouslySetInnerHTML={{__html: code_hl}}></div>
                </pre>
            </Paper>
        );
    };
}
