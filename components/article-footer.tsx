import { Box, Button, Divider, Grid, Link, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SectionType } from "lib/contents_handler";

type ArticleContextType = {
    chapter: string;
    section: string;
    prev_url?: string;
    next_url?: string;
};

export default function ArticleFooter(context: ArticleContextType) {
    // const {prev_url, next_url} = getAdjacentSections(context as SectionType);
    // console.log("??????????????");
    // const prev_url = undefined;
    // const next_url = undefined;
    return (
        <>
            <Box height={32}></Box>
            <Divider />
            <Grid container alignItems="center" height={64}>
                <Grid item xs={5} sx={{ textAlign: "left" }}>
                    <Button
                        href={context.prev_url}
                        disabled={context.prev_url === undefined}
                    >
                        <ArrowBackIosNewIcon />
                        Prev {context.prev_url}
                    </Button>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "center" }}>
                    <Button href={`../${context.chapter}`}>Back to Chapter</Button>
                </Grid>
                <Grid item xs={5} sx={{ textAlign: "right" }}>
                    <Button
                        href={context.next_url}
                        disabled={context.next_url === undefined}
                    >
                        {context.next_url} Next
                        <ArrowForwardIosIcon />
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
