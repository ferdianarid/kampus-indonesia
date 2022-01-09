import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Head from "next/head";
import store from "configs/redux/store";
import Auth from "configs/route/Auth";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import isServer from "@utils/isServer";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  if (isServer()) return null;
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Head>
          <title>Informasi Kampus</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />

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
  );
};

export default MyApp;
