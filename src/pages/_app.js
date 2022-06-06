import "@styles/globals.css";
import ViewportProvider from "@components/provider";
import Head from 'next/head';
import Layout from "@components/layout";
import UserProview from "@utils/context";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>medium</title>
      </Head>
      <ViewportProvider>
        <UserProview >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProview>
      </ViewportProvider>
    </>
  )
}
