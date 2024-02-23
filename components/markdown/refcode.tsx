import { Paper, Typography } from "@mui/material";
import { MarkdownContextType, RefcodeType } from "./types";

export function Refcode(context: MarkdownContextType) {
    return ({ lang, lineno, code }: RefcodeType) => {
        let class_names = "";
        class_names += (lineno === "true" ? "" : "nohljsln");
        class_names += ` language-${lang}`;
        return (
            <Paper elevation={2} sx={{ margin: 2, overflow: "auto" }}>
                <pre style={{margin: 0}}>
                    <code className={class_names}>{code}</code>
                </pre>
            </Paper>
        );
    };
}
