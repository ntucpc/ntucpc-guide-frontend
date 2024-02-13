import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Link from "@mui/material/Link";

export const NAVBAR_HEIGHT = 10;

export function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Button color="inherit">
                        <Link
                            href="/"
                            underline="none"
                            color="inherit"
                            variant="h6"
                        >
                            NTUCPC Guide!
                        </Link>
                    </Button>
                    <Box sx={{flexGrow: 1}}></Box>
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
