import { useRouter } from 'next/router';
import Head from "next/head";

import LOT from "@components/leftOrTop";
import ROB from "@components/rightOrBottom";
import { useFetchJWTLogin } from "@utils/fetchData";

import styles from "./layout.module.css";




export default function Layout({ children }) {
    const router = useRouter();
    useFetchJWTLogin();
    if (router.pathname === '/new-story') {
        return (
            <>
                <Head>
                    <title>new-story</title>
                </Head>
                <NewStory >{children}</NewStory>
            </>
        );
    }
    if (router.pathname === '/login') {
        return (
            <>
                <Head>
                    <title>登录</title>
                </Head>
                <Login >{children}</Login>
            </>
        );
    }
    return (
        <>
            <Head>
                <title>master1lan的博客</title>
            </Head>
            <Home >{children}</Home>
        </>
    );
}


function NewStory({ children }) {
    return (
        <div className={styles.mainContainer}>
            {children}
        </div>
    )
}

function Login({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}


function Home({ children }) {
    return (
        <div className={styles.container}>
            <aside className={styles.left}>
                <LOT />
            </aside>
            <div className={styles.mainWrapper}>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
            <aside className={styles.right}>
                <ROB />
            </aside>
        </div>
    )
}