import '../styles/globals.css'
import Head from "next/head";
import styled from 'styled-components';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export const Layout = styled.section`
  font-family: 'Noto Sans JP', sans-serif;
`;

export default MyApp
