import MarkDownSection from "@utils/markdown/markdown"
import styles from "./index.module.css";
export default function Home({ sectionList }) {

    return (
        <>
        <main className={styles.main}>{<ul>
            {sectionList.map(section=>(<li key={section._id}>
                <p>{section.title}</p>
                <p>{section.username}</p>
                <MarkDownSection 
                content={section.content}
                readOnly={true}
                />
            </li>))}
        </ul>}</main>
        <aside className={styles.right}></aside>
        </>
    )
}

export async function getServerSideProps() {
    const data = await fetch(`http:localhost:7001/api/blob`);
    const json = await data.json();
    return {
        props: {
            sectionList: json
        }
    }
}

// export default function Home() {

//     return (
//         <>
//             <main className={styles.main}></main>
//             <aside className={styles.right}></aside>
//         </>
//     )
// }