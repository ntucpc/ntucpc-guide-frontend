import { Box, Button, Divider, Grid } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SectionType } from "lib/contents_handler";

type ArticleFooterPropsType = {
    section: SectionType;
    prev?: SectionType;
    next?: SectionType;
};

export default function ArticleFooter({section, prev, next}: ArticleFooterPropsType) {
    return (
        <>
            <Box height={32}></Box>
            <Divider />
            <Grid container alignItems="center" sx={{ minHeight: "64px" }}>
                <Grid item xs={2} md={5} sx={{ textAlign: "left" }}>
                    <Button
                        href={prev === undefined ? "" : prev.section_url}
                        disabled={prev === undefined}
                    >
                        <ArrowBackIosNewIcon />
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            前一章：{prev === undefined ? "" : prev.title}
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
                        href={next === undefined ? "" : next.section_url}
                        disabled={next === undefined}
                    >
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            下一章：{next === undefined ? "" : next.title}
                        </Box>
                        <ArrowForwardIosIcon />
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
