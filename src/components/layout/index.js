import { useRouter } from 'next/router';
import Head from "next/head";
import { memo } from "react";
import LOT from "@components/leftOrTop";
import ROB from "@components/rightOrBottom";
import { useFetchJWTLogin } from "@utils/fetchData";

import styles from "./layout.module.css";




export default function Layout({ children }) {
    const router = useRouter();
    useFetchJWTLogin();
    if (router.pathname === '/new-story') {
        return (
            <NweStoryMemo >{children}</NweStoryMemo>
        );
    }
    if (router.pathname === '/login') {
        return (
            <LoginMemo >{children}</LoginMemo>
        );
    }
    return <HomeMemo>{children}</HomeMemo>;
}


const NweStoryMemo=memo(function NewStory({ children }) {
    return (
        <>
            <Head>
                <title>new-story</title>
            </Head>
            <div className={styles.mainContainer}>
                {children}
            </div>
        </>
    )
})

const LoginMemo=memo(function Login({ children }) {
    return (
        <>
            <Head>
                <title>登录</title>
            </Head>
            <div>
                {children}
            </div>
        </>
    )
})


const HomeMemo=memo(function Home({ children }) {
    return (
        <>
            <Head>
                <title>master1lan的博客</title>
            </Head>
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
        </>
    )
})