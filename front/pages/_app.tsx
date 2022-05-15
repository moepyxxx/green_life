import "../styles/globals.css";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import ToastProvider from "../component/templates/ToastProvider";

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
    <ToastProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;
