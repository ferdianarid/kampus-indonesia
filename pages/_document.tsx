/* eslint-disable @next/next/no-document-import-in-page */
import Document, { Html, Head, Main, NextScript } from "next/document";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@themesberg/flowbite"),
  { ssr: false }
);

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />

        <body>
          <Main />
          <DynamicComponentWithNoSSR />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
