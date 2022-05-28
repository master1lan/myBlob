import styles from "./index.module.css";
import "@styles/globals.css";
import ViewportProvider from "@components/provider";
import LOT from "@components/leftOrTop";
import ROB from "@components/rightOrBottom";
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title></title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes" />
    </Head>
      <ViewportProvider>
        <div className={styles.container}>
          <aside className={styles.left} >
            <LOT />
          </aside>
          <main className={styles.main}>
          <Component {...pageProps} />
          </main>
          <aside className={styles.right}>
            <ROB />
          </aside>
        </div>
      </ViewportProvider>
    </>
  )
}

export default MyApp
