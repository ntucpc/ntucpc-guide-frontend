import { Paper, Link, Divider, Typography, Box, Stack, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { MarkdownContextType, ProblemType } from "./types";
import Submdx from "components/submdx";
import HelpIcon from '@mui/icons-material/Help';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';

const DisabledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.disabled,
}));

export function Problem(context: MarkdownContextType) {
    return ({
        src,
        name,
        url,
        mdx_path,
        sol_path,
        difficulty,
        expanded
    }: ProblemType) => {
        let description_node: React.ReactNode = <></>;
        let solution_node: React.ReactNode = <></>;
        if (mdx_path) {
            const subcontext: MarkdownContextType = {
                ...context,
                mdx_path,
            };
            description_node = <Submdx context={subcontext} />;
        }
        if (sol_path) {
            const subcontext: MarkdownContextType = {
                ...context,
                mdx_path: sol_path,
            };
            solution_node = <Submdx context={subcontext} />;
        }
        let stars = <></>;
        if(difficulty === "?") {
            stars = <HelpIcon />
        } else if(difficulty !== "0") {
            stars = <>{
                Array.from({length: 5}, (_, index) => (
                    (index < parseInt(difficulty)) ? <StarIcon key={index} /> : <StarBorderIcon key={index} />
                ))
            }</>
        }
        return (
            <Paper variant="outlined" sx={{ margin: 2 }}>
                <Box sx={{ margin: 2 }}>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="body1" sx={{fontWeight: "bold"}}>
                            {difficulty === "0" ? "例題" : "習題"}
                        </Typography>
                        <Box>
                            {stars}
                        </Box>
                        <Typography variant="body1">
                            {name}
                        </Typography>
                    </Stack>
                    <DisabledTypography variant="body2">
                        Source: {src} {url && <Link href={url}><LaunchIcon fontSize="inherit" color="disabled"/></Link>}
                    </DisabledTypography>
                    {description_node}
                </Box>
                {sol_path && (
                    <>
                        {/* <Box paddingTop={2} paddingBottom={2}> */}
                            <Divider />
                        {/* </Box> */}
                        <Accordion disableGutters defaultExpanded={expanded === "true"}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                // id={`accordion-heading-${id}`}
                            >
                                <Typography>Solution</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {solution_node}
                            </AccordionDetails>
                        </Accordion>
                    </>
                )}
            </Paper>
        );
    };
}
