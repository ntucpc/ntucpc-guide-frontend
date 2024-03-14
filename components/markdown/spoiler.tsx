import { DirectiveType, MarkdownContextType } from "./types";
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function Spoiler(context: MarkdownContextType) {
    return ({ type, id, children }: DirectiveType) => {
        id = id ?? "Spoiler";
        return (
            <Box margin={2}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id={`accordion-heading-${id}`}
                    >
                        <Typography>{id}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {children}
                    </AccordionDetails>
                </Accordion>
            </Box>
        )
    };
}