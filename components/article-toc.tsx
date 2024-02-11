import { List, ListItem, ListItemText, Paper } from "@mui/material";

type SectionType = {
    text: string;
    children: SectionType[];
};

function getTocList(
    sections: SectionType[],
    is_root: Boolean = true,
    key: string = "."
): JSX.Element {
    let list_items: JSX.Element[] = [];
    for (let i = 0; i < sections.length; i++) {
        // for(let section of sections) {
        const section = sections[i];
        const cur_key = `${key}${i}`;
        list_items.push(
            <ListItem key={cur_key}>
                <ListItemText key={cur_key + "-text"}>
                    {section.text}
                </ListItemText>
            </ListItem>
        );
        if (section.children.length != 0) {
            list_items.push(getTocList(section.children, false, cur_key + "."));
        }
    }
    return (
        <List sx={is_root ? {} : { pl: 2 }} key={key}>
            {list_items}
        </List>
    );
}

const sections: SectionType[] = [
    {
        text: "A badly Fucked Up ToC",
        children: [
            {
                text: "H2",
                children: [
                    {
                        text: "H3",
                        children: [],
                    },
                    {
                        text: "H3",
                        children: [],
                    },
                ],
            },
            {
                text: "H2",
                children: [],
            },
        ],
    },
];

export function ArticleToc() {
    return (
        <Paper variant="outlined" sx={{ padding: 2 }}>
            {getTocList(sections)}
        </Paper>
    );
}
