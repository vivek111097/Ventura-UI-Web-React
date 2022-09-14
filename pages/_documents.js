import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head> 
        <link rel="shortcut icon" href="/fevicon.png" />
        </Head>
        <body>
          <Main />
          <div id="modal_overlays"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;