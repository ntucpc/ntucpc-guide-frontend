import type { AppProps } from "next/app";
import { Box, Divider } from "@mui/material";
import { NavBar, NAVBAR_HEIGHT, PageFooter } from "../components";
import "../styles/global.css";
import { Container } from "@mui/system";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Box sx={{ marginTop: NAVBAR_HEIGHT }}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Box>
      <Divider />
      <PageFooter />
    </>
  );
}
