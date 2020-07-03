import Head from "next/head";
import theme from "./theme";
export default function Header() {
  return (
    <Head>
      <title>Kenji App</title>
      <link rel="icon" href="/favicon.ico" />
      {/* <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      /> */}
      <style dangerouslySetInnerHTML={{__html: `
        @font-face {
          font-family: 'Roboto';
          font-weight: 300;
          src: url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap') format('woff');
        }
      `}}/>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />

      {/* <script src="https://dohliam.github.io/dropin-minimal-css/switcher.js" type="text/javascript"></script> */}
      {/* <link rel="stylesheet" href="https://dohliam.github.io/dropin-minimal-css/min/tacit.min.css"/> */}
      <meta name="theme-color" content={theme.palette.primary.main} />
    </Head>
  );
}
