import { useViewport } from "@components/provider";
import LOGO, { Home, Stories, Lists, Write, UserLOGO, Publish } from "@components/nav";
import styles from "./leftOrTop.module.css";
import { useRouter } from 'next/router';
import {selectUserInfo} from "@features/user";
import { useSelector } from "react-redux";
const orderWidth = 1080;


/**
 * @description 一共需要三种模式，大屏模式，小屏模式和书写模式
 * 书写模式从左到右分别是 LOGO,Draft in ${username},${saveState},publish,nofification,${userLOGO}
 * 大屏模式从上到下分别是 LOGO,home,lists,Stories,write,${userLOGO}
 * 小屏模式从左到右分别是 LOGO
 */
export default function Aside({clickCallBack}) {
    const { width, height } = useViewport();
    const router = useRouter();
    if (router.pathname === '/new-story')
        return (
            <EditTop clickCallBack={clickCallBack} />
        )
    return width > orderWidth ? <Left height={height} /> : < Top />;
}

function EditTop({clickCallBack}) {
    const {username}=useSelector(selectUserInfo);
    return (
        <nav
            className={styles.nav}
        >
            <div
                className={styles.leftAside}
            >
                <LOGO />
                <div>Draft in {username}</div>
                <div>Saved</div>
            </div>
            <div className={styles.rightAside}>
                <Publish onClick={clickCallBack} />
                <UserLOGO />
            </div>
        </nav>
    )
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