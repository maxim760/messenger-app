import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            rel="icon"
            type="image/x-icon" 
            href="/static/favicon.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
            <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/f                             avicon-32x32.png"
        /> 
           <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
