import "../styles/globals.css";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-size: 62.5%;
  }
  body {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 1.6rem;
    line-height: 2;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;600&family=Noto+Sans+JP:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async () => ({ pageProps: {} });
export default MyApp;
