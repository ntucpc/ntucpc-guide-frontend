import { Box, Button, Divider, Grid } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SectionType } from "lib/contents-handler";

export type ArticleFooterPropsType = {
    chapter_url: string;
    prev_url: string | null;
    prev_title: string | null;
    next_url: string | null;
    next_title: string | null;
};

export default function ArticleFooter(props: ArticleFooterPropsType) {
    const has_prev = (props.prev_title !== null);
    const has_next = (props.next_title !== null);
    return (
        <>
            <Box height={32}></Box>
            <Divider />
            <Grid container alignItems="center" sx={{ minHeight: "64px" }}>
                <Grid item xs={2} md={5} sx={{ textAlign: "left" }}>
                    <Button
                        href={props.prev_url ?? ""}
                        disabled={!has_prev}
                    >
                        <ArrowBackIosNewIcon />
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            {has_prev ? `前一章：${props.prev_title}` : "已經是第一章了 >\"<"}
                        </Box>
                    </Button>
                </Grid>
                <Grid item xs={8} md={2} sx={{ textAlign: "center" }}>
                    <Button href={props.chapter_url}>
                        回到章節目錄
                    </Button>
                </Grid>
                <Grid item xs={2} md={5} sx={{ textAlign: "right" }}>
                    <Button
                        href={props.next_url ?? ""}
                        disabled={!has_next}
                    >
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            {has_next ? `下一章：${props.next_title}` : "已經是最後一章了 >\"<"}
                        </Box>
                        <ArrowForwardIosIcon />
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
