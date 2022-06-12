import "@styles/globals.css";
import ViewportProvider from "@components/provider";
import Head from 'next/head';
import Layout from "@components/layout";
import UserProview from "@utils/context";
import { Provider } from 'react-redux';
import store from "@utils/store";
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>medium</title>
      </Head>
      <ViewportProvider>
        <UserProview >
          <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          </Provider>
        </UserProview>
      </ViewportProvider>
    </>
  )
}
