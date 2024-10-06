import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    // PageProps = al den data der ligger på siden.
    // Linjen/snippet giver Access to the page props.
    const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
    // destructurere pageProps, så det kun er pagePropsne defineret inde i const
    const { isLanding, isProgram, isSchedule } = pageProps;

    let bodyClass = "";
    if (isLanding) {
      bodyClass = "landing-background";
    } else if (isProgram) {
      bodyClass = "program-background";
    } else if (isSchedule) {
      bodyClass = "schedule-background";
    } else {
      bodyClass = "default-background";
    }

    return (
      <Html lang="en">
        <Head />
        <body className={bodyClass}>
          <link rel="stylesheet" href="https://use.typekit.net/bxq7sds.css" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
