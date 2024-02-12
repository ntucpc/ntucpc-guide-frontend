import { Box, Button, Divider, Grid, Link, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type ArticleContextType = {
    chapter: string;
    section: string;
    prev_section?: string;
    next_section?: string;
};

export default function ArticleFooter({
    chapter,
    section,
    prev_section,
    next_section,
}: ArticleContextType) {
    prev_section = "/handout/Example/subexample";
    return (
        <>
            <Box height={32}></Box>
            <Divider />
            <Grid container alignItems="center" height={64}>
                <Grid item xs={5} sx={{ textAlign: "left" }}>
                    <Button
                        href={prev_section}
                        disabled={prev_section === undefined}
                    >
                        <ArrowBackIosNewIcon />
                        Prev {prev_section}
                    </Button>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "center" }}>
                    <Button href={`../${chapter}`}>Back to Chapter</Button>
                </Grid>
                <Grid item xs={5} sx={{ textAlign: "right" }}>
                    <Button
                        href={next_section}
                        disabled={next_section === undefined}
                    >
                        {next_section} Next
                        <ArrowForwardIosIcon />
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
