import { UserLOGO } from "@components/nav";
import Link from "next/link";
import styles from "./article.module.css";

export default function ({ title, username, content, _id }) {
    return (
        <div className={styles.article}>
            <div className={styles.container}>
                <div className={styles.user}>
                    <div>
                        <UserLOGO />
                    </div>
                    <div>
                        {username}
                    </div>
                    <div>
                        {'May 4'}
                    </div>
                </div>
                <Link href={`/blob/${_id}`} >
                    <a>
                        <div><h2 className={styles.h2}>{title}</h2></div>
                        <div><p className={styles.content}>{content}</p></div>
                    </a>
                </Link>
            </div>
        </div>
    )
}