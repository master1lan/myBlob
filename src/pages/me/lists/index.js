import styles from './lists.module.css';


export default function () {
    return (
        <div>
            {/* 这里是上面 */}
            <Top />
            {/* 这里是内容区 */}
            <div>
                <ListsContent />
            </div>
        </div>
    )
}

function Top() {
    return (
        <div className={styles.top}>
            <div style={{
            }}>
                <div className={styles.topWrapper}>
                    <div className={styles.h1Wrapper}>
                        <h1>Your lists</h1>
                    </div>
                    <div className={styles.topRightWrapper}>
                        <ActionButton />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ActionButton() {
    return (
        <div className={styles.actionButton}>
            New list
        </div>
    )
}

export function ListsContent(){
    return(
        <div className={styles.listsContent}>
            <List />
            <List />
            <List />
            <List />
            <List />
            <List />
            <List />
        </div>
    )
}

function List(){
    return(
        <div className={styles.listWrapper}>
            <h3>react技术</h3>
            <div className={styles.listFlex}>
                <p>2022-05-19更新</p>
                <p>4篇文章</p>
            </div>
        </div>
    )
}