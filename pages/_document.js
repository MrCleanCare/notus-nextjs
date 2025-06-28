import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    // Detect locale from Next.js context
    const locale = this.props.__NEXT_DATA__.locale || 'ar';
    return (
      <Html lang={this.props.__NEXT_DATA__.locale || 'ar'} dir={(this.props.__NEXT_DATA__.locale === 'ar' || !this.props.__NEXT_DATA__.locale) ? 'rtl' : 'ltr'}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/img/brand/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/img/brand/apple-icon.png"
          />
        </Head>
        <body className="text-blueGray-700 antialiased">
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
