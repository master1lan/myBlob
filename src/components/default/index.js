/**
 * 此页面用来写当缺省状态的
 */

import styles from "./default.module.css";

export default function DEFAULT({ children, ...resProps }) {
    return (
        <div className={styles.defaultWrapper} {...resProps}>
            {children}
        </div>
    )
}

export const NeverDoComponent = ({ children, ...resProps }) => {
    return (
        <DEFAULT {...resProps}>
            <p className={styles.p}>
                {children}
            </p>
        </DEFAULT>
    )
}