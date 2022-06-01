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
            backgroundColor:"pink"
        }}>

        </div>
    )
}

function List(){
    return(
        <div>

        </div>
    )
}