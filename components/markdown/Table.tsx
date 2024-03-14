import { Paper, TableContainer, Table, Grid } from "@mui/material";
import { TableElementType, MarkdownContextType } from "./types";

export function MdxTable(context: MarkdownContextType) {
    return ({ children }: TableElementType) => {
        return (
            <Grid container>
                <Grid item>
                    <TableContainer component={Paper}>
                        <Table>{children}</Table>
                    </TableContainer>
                </Grid>
            </Grid>
        );
    };
}
