import { useViewport } from "@components/provider"
import LOGO, { Home, Stories, Lists, Write } from "@components/nav";
import styles from "./index.module.css";
import { useRouter } from 'next/router'
const orderWidth = 1080;

export default function Aside() {
    const { width,height } = useViewport();
    return width > orderWidth ? <Left height={height} /> : < Top />;
}


function Left({height}) {
    const router=useRouter();
    console.log(router.pathname);
    return (
        <div className={styles.container}>
            <LOGO />
            <div className={styles.left}
            style={{
                height:height
            }}
            >
                <Home href='/' path={router.pathname} />
                <Stories path={router.pathname} />
                <Lists path={router.pathname} />
                <Write href='/markEdit' path={router.pathname} />
            </div>
        </div>
    )
}

function Top() {
    return (
        <div className={styles.top}>
            <LOGO />
        </div>
    )
}