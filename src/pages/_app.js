import "antd/dist/antd.css";
import styles from "./index.module.css"
function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <aside className={styles.left} ></aside>
    <Component {...pageProps} />
    </div>
  )
}

export default MyApp
