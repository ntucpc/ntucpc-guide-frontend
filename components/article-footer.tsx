import { Box, Button, Divider, Grid } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type ArticleContextType = {
    chapter: string;
    section: string;
    prev_url?: string;
    next_url?: string;
};

export default function ArticleFooter(context: ArticleContextType) {
    return (
        <>
            <Box height={32}></Box>
            <Divider />
            <Grid container alignItems="center" sx={{ minHeight: "64px" }}>
                <Grid item xs={2} md={5} sx={{ textAlign: "left" }}>
                    <Button
                        href={context.prev_url}
                        disabled={context.prev_url === undefined}
                    >
                        <ArrowBackIosNewIcon />
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            Prev {context.prev_url}
                        </Box>
                    </Button>
                </Grid>
                <Grid item xs={8} md={2} sx={{ textAlign: "center" }}>
                    <Button href={`../${context.chapter}`}>
                        Back to Chapter
                    </Button>
                </Grid>
                <Grid item xs={2} md={5} sx={{ textAlign: "right" }}>
                    <Button
                        href={context.next_url}
                        disabled={context.next_url === undefined}
                    >
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            {context.next_url} Next
                        </Box>
                        <ArrowForwardIosIcon />
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
