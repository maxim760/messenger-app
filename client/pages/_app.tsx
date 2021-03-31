import "../styles/globals.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
