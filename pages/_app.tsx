import type { AppProps } from "next/app";
import { Divider } from "@mui/material";
import { NavBar, NAVBAR_HEIGHT } from "components/navbar";
import { PageFooter } from "components/page-footer";
import "../styles/global.css";
import "../styles/hljs-custom.css";
import { Container } from "@mui/system";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <NavBar />
            <Container sx={{marginTop: NAVBAR_HEIGHT}}>
                <Component {...pageProps} />
            </Container>
            <Divider />
            <PageFooter />
        </>
    );
}
