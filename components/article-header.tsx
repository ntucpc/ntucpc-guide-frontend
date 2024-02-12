import { Box, Typography, Breadcrumbs, Link, Stack, Divider } from "@mui/material";
import { SectionType } from "lib/contents_handler";
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import EmojiObjectsTwoToneIcon from '@mui/icons-material/EmojiObjectsTwoTone';

export default function ArticleHeader({section}: {section: SectionType}) {
    return (
        <>
            <Stack spacing={2} padding={2}>
                <Box>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">NTUCPC Guide</Link>
                        <Link underline="hover" color="inherit" href={section.handout_url}>Handout</Link>
                        <Link underline="hover" color="inherit" href={section.chapter_url}>{section.chapter}</Link>
                        <Typography color="text.primary">{section.title}</Typography>
                    </Breadcrumbs>
                </Box>
                <Typography variant="h3">{section.title}</Typography>
                {section.authors.length > 0 ? 
                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} alignItems="center">
                        <EditNoteTwoToneIcon/>
                        <Typography variant="subtitle1">作者：{section.authors.join("、")}</Typography>
                    </Stack>
                : <></>}
                {section.contributors.length > 0 ? 
                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} alignItems="center">
                        <VolunteerActivismTwoToneIcon/>
                        <Typography variant="subtitle1">共同作者：{section.contributors.join("、")}</Typography>
                    </Stack>
                : <></>}
                {section.prerequisites.length > 0 ? 
                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} alignItems="center">
                        <EmojiObjectsTwoToneIcon/>
                        <Typography variant="subtitle1">先備知識：{section.prerequisites.join("、")}</Typography>
                    </Stack>
                : <></>}
            </Stack>
            <Divider />
            <Box height={32}></Box>
        </>
    )
}