import { useRef } from 'react';
import { useRouter } from "next/router";
import {  useSelector } from "react-redux";

import FixedEditPage from "@components/edit";
import LOT from "@components/leftOrTop";
import {selectUserInfo} from "@features/user";
import { middlewareWithLogin } from '@utils/tools';
import { blobUpdate } from "@utils/fetchData";

import styles from './index.module.css';



export default function Index() {
    const contentRef = useRef(null);
    const user=useSelector(selectUserInfo);
    const router = useRouter();
    const onClick = async() => {
        const data=contentRef.current.getText();
        const res=await blobUpdate(data);
        if(res){
            router.push(`/blob/${res}`);
        }
    }
    return (
        <>
            <aside className={styles.top}>
                <LOT clickCallBack={onClick} />
            </aside>
            <main className={styles.mainmain}>
                <main className={styles.main}>
                    <FixedEditPage ref={contentRef} username={user.username} />
                </main>
            </main>
        </>
    )
}

//页面拦截
export const getServerSideProps=middlewareWithLogin;