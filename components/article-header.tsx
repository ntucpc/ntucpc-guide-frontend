import { Box, Typography, Breadcrumbs, Link, Stack, Divider } from "@mui/material";
import { SectionType } from "lib/contents-handler";
import EditNoteIcon from '@mui/icons-material/EditNote';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import StarHalfIcon from '@mui/icons-material/StarHalf';

export default function ArticleHeader({section}: {section: SectionType}) {
    return (
        <>
            <Stack spacing={2} margin={2}>
                <Box>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">NTUCPC Guide</Link>
                        {/* <Link underline="hover" color="inherit" href={section.handout_url}>Handout</Link> */}
                        <Link underline="hover" color="inherit" href={section.d_chapter?.url}>{section.d_chapter?.id}</Link>
                        <Typography color="text.primary">{section.d_section.title}</Typography>
                    </Breadcrumbs>
                </Box>
                <Typography variant="h3">{section.d_section.title}</Typography>
                {section.d_section.authors.length > 0 ? 
                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} alignItems="center">
                        <EditNoteIcon/>
                        <Typography variant="subtitle1">作者：{section.d_section.authors.join("、")}</Typography>
                    </Stack>
                : <></>}
                {section.d_section.contributors.length > 0 ? 
                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} alignItems="center">
                        <VolunteerActivismIcon/>
                        <Typography variant="subtitle1">共同作者：{section.d_section.contributors.join("、")}</Typography>
                    </Stack>
                : <></>}
                {section.d_section.prerequisites.length > 0 ? 
                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} alignItems="center">
                        <EmojiObjectsIcon/>
                        <Typography variant="subtitle1">先備知識：{section.d_section.prerequisites.join("、")}</Typography>
                    </Stack>
                : <></>}
                {section.d_level ? 
                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} alignItems="center">
                        <StarHalfIcon/>
                        <Typography variant="subtitle1">難度分級：{section.d_level.title}</Typography>
                    </Stack>
                : <></>}
            </Stack>
            <Divider />
            <Box height={32}></Box>
        </>
    )
}