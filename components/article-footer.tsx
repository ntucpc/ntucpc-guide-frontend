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
    return (
        <>
            <Box height={32}></Box>
            <Divider />
            <Grid container alignItems="center" sx={{ minHeight: "64px" }}>
                <Grid item xs={2} md={5} sx={{ textAlign: "left" }}>
                    <Button
                        href={prev === null ? "" : prev.section_url}
                        disabled={prev === null}
                    >
                        <ArrowBackIosNewIcon />
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            {prev === null ? "已經是第一章了 >\"<" : `前一章：${prev.title}`}
                        </Box>
                    </Button>
                </Grid>
                <Grid item xs={8} md={2} sx={{ textAlign: "center" }}>
                    <Button href={section.chapter_url}>
                        回到章節目錄
                    </Button>
                </Grid>
                <Grid item xs={2} md={5} sx={{ textAlign: "right" }}>
                    <Button
                        href={next === null ? "" : next.section_url}
                        disabled={next === null}
                    >
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            {next === null ? "已經是最後一章了 >\"<" : `下一章：${next.title}`}
                        </Box>
                        <ArrowForwardIosIcon />
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
