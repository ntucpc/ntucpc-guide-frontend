import { Box } from "@mui/material";
import { MarkdownContextType, FigureType } from "./types";

export function Figure(context: MarkdownContextType) {
    return ({ src, width }: FigureType) => {
        // Although Image has better performance over img, the dimension cannot be automatically grabbed.
        return (
            <Box margin={2} textAlign="center">
                <img
                    src={src}
                    width={+width}
                    alt={""}
                    style={{ maxWidth: "80%" }}
                />
            </Box>
        );
    };
}
