import styles from "./layout.module.css";
import LOT from "@components/leftOrTop";
import ROB from "@components/rightOrBottom";
import { useRouter } from 'next/router';
import api from "@utils/api";
import {useEffect} from 'react';
import { userLogin } from "@utils/context";
import Cookie from "js-cookie"
export default function Layout({ children }) {
    const {setUser}=userLogin();
    const router = useRouter();
    useEffect(()=>{
        fetch(api.userLoginWithjwt,{
            headers: {
                'Authorization':Cookie.get('jwt')   
            }
        }).then(res=>res.json()).then(res=>{
            if(res.code===200){
                setUser({
                    username:res.data.username,
                    uuid:res.data.uuid
                });
            }
        })
    },[])
    if (router.pathname === '/new-story') {
        return <NewStory >{children}</NewStory>;
    }
    if (router.pathname === '/login') {
        return <Login >{children}</Login>
    }
    return <Home >{children}</Home>;
}


function NewStory({ children }) {
    return (
        <div className={styles.mainContainer}>
            {children}
        </div>
    )
}

function Login({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}


function Home({ children }) {
    return (
        <div className={styles.container}>
            <aside className={styles.left}>
                <LOT />
            </aside>
            <div className={styles.mainWrapper}>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
            <aside className={styles.right}>
                <ROB />
            </aside>
        </div>
    )
}