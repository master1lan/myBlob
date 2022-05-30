import "@styles/globals.css";
import ViewportProvider from "@components/provider";
import Head from 'next/head';
import Layout from "@components/layout";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>medium</title>
      </Head>
      <ViewportProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ViewportProvider>
    </>
  )
}

export default MyApp
