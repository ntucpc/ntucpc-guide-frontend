import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "@mui/material/Link";

export const NAVBAR_HEIGHT = 10;

export function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        NTUCPC Guide!
                    </Typography>
                    <Button color="inherit">
                        <Link
                            href="https://oj.ntucpc.org/"
                            underline="none"
                            color="inherit"
                        >
                            Take me to NCOJ
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
