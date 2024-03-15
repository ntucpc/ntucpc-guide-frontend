import { Box, Typography, Breadcrumbs, Link, Stack, Divider } from "@mui/material";
import { SectionType } from "lib/contents-handler";
import EditNoteIcon from '@mui/icons-material/EditNote';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import StarHalfIcon from '@mui/icons-material/StarHalf';

export type ArticleHeaderPropsType = {
    chapter: {
        id: string;
        url: string;
    };
    section: {
        title: string;
        authors: string[];
        contributors: string[];
        prerequisites: string[];
    };
    level: {
        title: string;
    };
};

export default function ArticleHeader({chapter, section, level}: ArticleHeaderPropsType) {
    return (
        <>
            <Stack spacing={2} margin={2}>
                <Box>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">NTUCPC Guide</Link>
                        {/* <Link underline="hover" color="inherit" href={section.handout_url}>Handout</Link> */}
                        <Link underline="hover" color="inherit" href={chapter.url}>{chapter.id}</Link>
                        <Typography color="text.primary">{section.title}</Typography>
                    </Breadcrumbs>
                </Box>
                <Typography variant="h3">{section.title}</Typography>
                {section.authors.length > 0 ? 
                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} alignItems="center">
                        <EditNoteIcon/>
                        <Typography variant="subtitle1">作者：{section.authors.join("、")}</Typography>
                    </Stack>
                : <></>}
                {section.contributors.length > 0 ? 
                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} alignItems="center">
                        <VolunteerActivismIcon/>
                        <Typography variant="subtitle1">共同作者：{section.contributors.join("、")}</Typography>
                    </Stack>
                : <></>}
                {section.prerequisites.length > 0 ? 
                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} alignItems="center">
                        <EmojiObjectsIcon/>
                        <Typography variant="subtitle1">先備知識：{section.prerequisites.join("、")}</Typography>
                    </Stack>
                : <></>}
                {level ? 
                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} alignItems="center">
                        <StarHalfIcon/>
                        <Typography variant="subtitle1">難度分級：{level.title}</Typography>
                    </Stack>
                : <></>}
            </Stack>
            <Divider />
            <Box height={32}></Box>
        </>
    )
}