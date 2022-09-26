import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

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
<Script src="./Script.js" strategy="beforeInteractive"/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;