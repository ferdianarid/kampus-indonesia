import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Head from "next/head";
import store from "configs/redux/store";
import Auth from "configs/route/Auth";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <Provider store={store}>
        <SessionProvider session={session}>
          <Head>
            <title>Informasi Kampus</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
              rel="stylesheet"
            ></link>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          {Component.auth ? (
            <Auth {...Component.auth}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </Provider>
    </>
  );
};

export default MyApp;
