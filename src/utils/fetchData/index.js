import { useEffect } from 'react';
import Cookie from 'js-cookie';
import api from "@utils/api";
import message from '@utils/message';
import { useDispatch } from "react-redux";
import { login, logout, selectUserBlobsPublish, selectUserBlobDraft, setPublishBlobs, setDraftBlobs } from "@features/user/userSlice";

//根据jwt进行登录检查
export function useFetchJWTLogin() {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(api.userLoginWithjwt, {
            headers: {
                'Authorization': Cookie.get('jwt')
            }
        }).then(res => res.json()).then(res => {
            if (res.code === 200) {
                dispatch(login({
                    username: res.data.username,
                    uuid: res.data.uuid
                }));
            } else {
                dispatch(logout());
            }
        })
    }, []);
}

//在登录和注册函数中使用
const Datathen = (res,router,dispatch) => {
    if (res.code === 500) {
        //显示错误原因
        message.error(res.msg);
    } else if (res.code === 200) {
        //先设置好cookie
        Cookie.set('jwt', res.data.token);
        dispatch(login({
            username: res.data.username,
            uuid: res.data.uuid
        }))
        router.push("/");
    }
}

//登录函数
export const FetchLogin=(router,dispatch)=>(data)=> {
    fetch(api.userLogin, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
        Datathen(res,router,dispatch);
    })
}

//注册函数
export const FetchRegiter=(router,dispatch)=>(data)=> {
    fetch(api.userRegister, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
        Datathen(res,router,dispatch);
    })
}

//获取用户未发表博客
export function useFetchDraftBlobs() {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(api.userDraftedBlob, {
            headers: {
                'Authorization': Cookie.get('jwt')
            }
        }).then(res => res.json()).then(res => {

            dispatch(setDraftBlobs(res.data));

        });
    }, []);
}

//获取用户已发表博客
export function useFetchPublishBlobs() {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(api.userPublishedBlob, {
            headers: {
                'Authorization': Cookie.get('jwt')
            }
        }).then(res => res.json()).then(res => {

            dispatch(setPublishBlobs(res.data));

        });
    }, []);
}

