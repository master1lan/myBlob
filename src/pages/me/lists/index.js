import styles from './lists.module.css';


export default function () {
    return (
        <div>
            {/* 这里是上面 */}
            <Top />
            {/* 这里是内容区 */}
            <div>
                <Lists />
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
        <div style={{
            display: "block",
            height: "24px",
            padding: "8px 20px",
            backgroundColor: "rgb(26,137,23)",
            borderRadius: "99em",
            fontSize: "16px",
            lineHeight: "24px",
            color: "white",
        }}>
            New list
        </div>
    )
}

function Lists(){
    return(
        <div style={{
            marginTop:"32px",
        }}>
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
        <div style={{
            backgroundColor:"rgb(250,250,250)",
            border:"1px solid rgb(230,230,230)",
            borderRadius:"4px",
            padding:"24px",
            height:"70px",
            marginBottom:"10px",
            display:"flex",
            flexFlow:"column nowrap",
            justifyContent:"space-between",
        }}>
            <h3>react技术</h3>
            <div style={{
                display:"flex",
                flexFlow:"row nowrap",

            }}>
                <p>2022-05-19更新</p>
                <p>4篇文章</p>
            </div>
        </div>
    )
}