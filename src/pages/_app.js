import styles from "./index.module.css";
import "@styles/globals.css";
import ViewportProvider from "@components/provider";
import LOT from "@components/leftOrTop";
import ROB from "@components/rightOrBottom";
import Head from 'next/head';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const flag=router.pathname === '/new-story';
  return (
    <>
      <Head>
        <title>medium</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes" />
      </Head>
      <ViewportProvider>
        <div className={flag?styles.mainContainer:styles.container}>
          <aside className={flag?styles.top:styles.left} >
            <LOT />
          </aside>
          <main className={flag?styles.mainmain:styles.main}>
            <Component {...pageProps} />
          </main>
          {
            flag ? null :
              <aside className={styles.right}>
                <ROB />
              </aside>
          }
        </div>
      </ViewportProvider>
    </>
  )
}

export default MyApp
