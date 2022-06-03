import styles from "./layout.module.css";
import LOT from "@components/leftOrTop";
import ROB from "@components/rightOrBottom";
import { useRouter } from 'next/router';
export default function Layout({ children }) {
    const router = useRouter();
    const flag = router.pathname === '/new-story';
    return flag ? <NewStory >{children}</NewStory> : <Home >{children}</Home>;
}


function NewStory({ children }) {
    return (
        <div className={styles.mainContainer}>
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