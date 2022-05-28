import { useViewport } from "@components/provider";
import LOGO, { Home, Stories, Lists, Write, UserLOGO } from "@components/nav";
import styles from "./index.module.css";
import { useRouter } from 'next/router';
const orderWidth = 1080;


/**
 * @description 一共需要三种模式，大屏模式，小屏模式和书写模式
 * 书写模式从左到右分别是 LOGO,Draft in ${username},${saveState},publish,nofification,${userLOGO}
 * 大屏模式从上到下分别是 LOGO,home,lists,Stories,write,${userLOGO}
 * 小屏模式从左到右分别是 LOGO
 */
export default function Aside() {
    const { width, height } = useViewport();
    const router=useRouter();
    if(router.pathname==='/new-story')
    return(
        <h1>hello</h1>
    )
    return width > orderWidth ? <Left height={height} /> : < Top />;
}


function Left({ height }) {
    return (
        <div className={styles.container}
            style={{
                height: height
            }}
        >
            <LOGO />
            <div className={styles.left}>
                <Home />
                <Stories />
                <Lists />
                <Write />
            </div>
            <UserLOGO />
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