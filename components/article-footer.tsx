import { Box, Button, Divider, Grid } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SectionType } from "lib/contents-handler";

type ArticleFooterPropsType = {
    section: SectionType;
    prev: SectionType | null;
    next: SectionType | null;
};

export default function ArticleFooter({section, prev, next}: ArticleFooterPropsType) {
    const d_prev = prev?.d_section ?? null;
    const d_next = next?.d_section ?? null;
    return (
        <>
            <Box height={32}></Box>
            <Divider />
            <Grid container alignItems="center" sx={{ minHeight: "64px" }}>
                <Grid item xs={2} md={5} sx={{ textAlign: "left" }}>
                    <Button
                        href={d_prev === null ? "" : d_prev.url}
                        disabled={d_prev === null}
                    >
                        <ArrowBackIosNewIcon />
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            {d_prev === null ? "已經是第一章了 >\"<" : `前一章：${d_prev.title}`}
                        </Box>
                    </Button>
                </Grid>
                <Grid item xs={8} md={2} sx={{ textAlign: "center" }}>
                    <Button href={section.d_chapter?.url}>
                        回到章節目錄
                    </Button>
                </Grid>
                <Grid item xs={2} md={5} sx={{ textAlign: "right" }}>
                    <Button
                        href={d_next === null ? "" : d_next.url}
                        disabled={d_next === null}
                    >
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            {d_next === null ? "已經是最後一章了 >\"<" : `下一章：${d_next.title}`}
                        </Box>
                        <ArrowForwardIosIcon />
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
