import { useEffect } from 'react';
import Cookie from 'js-cookie';
import api from "@utils/api";
import message from '@utils/message';
import { useDispatch } from "react-redux";
import { login, logout, setPublishBlobs, setDraftBlobs,setFavorLists } from "@features/user";
import crypto from '@utils/crypto';


//根据jwt进行登录检查
//我靠，不能使用cookie，必须使用localstorage
export function useFetchJWTLogin() {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        fetch(api.userLoginWithjwt, {
            headers: {
                'Authorization': token
            }
        }).then(res => res.json()).then(res => {
            if (res.code === 200) {
                //实现长效登录
                Cookie.set('jwt', res.data.token, {
                    'sameSite': "strict"
                });
                dispatch(login({
                    username: res.data.username,
                    uuid: res.data.uuid
                }));
                if (res.data.token !== token) {
                    localStorage.setItem('jwt', res.data.token);
                }
            } else {
                dispatch(logout());
            }
        })
    }, []);
}

//在登录和注册函数中使用
const Datathen = (res, router, dispatch) => {
    if (res.code === 500) {
        //显示错误原因
        message.error(res.msg);
    } else if (res.code === 200) {
        //先设置好cookie
        localStorage.setItem('jwt', res.data.token);
        Cookie.set('jwt', res.data.token, {
            'sameSite': "strict"
        });
        dispatch(login({
            username: res.data.username,
            uuid: res.data.uuid
        }))
        router.push("/");
    }
}


//加密字符串
const passwordCrypto=(pass)=>{
    const key=crypto.generatekey(8);
    const password=crypto.encrypt(pass,key);
    return {password,key};
}


//登录函数
export const FetchLogin = (router, dispatch) => (data) => {
    const cryptoEd=passwordCrypto(data.password);
    fetch(api.userLogin, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...data,...cryptoEd})
    }).then(res => res.json()).then(res => {
        Datathen(res, router, dispatch);
    })
}

//注册函数
export const FetchRegiter = (router, dispatch) => (data) => {
    const cryptoEd=passwordCrypto(data.password);
    fetch(api.userRegister, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...data,...cryptoEd})
    }).then(res => res.json()).then(res => {
        Datathen(res, router, dispatch);
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

//获取用户收藏夹
export function useFetchLists(){
    const dispatch=useDispatch();
    useEffect(()=>{
        fetch(api.userLists,{
            headers: {
                'Authorization': Cookie.get('jwt')
            }
        }).then(res=>res.json()).then(res=>{
            dispatch(setFavorLists(res.lists));
        })
    },[]);
}

//新增收藏夹
export const createList=async(title,description)=>{
    if(title.trim().length<5){
        message.error('标题至少5个字!');
        return null;
    }
    const data=await fetch(api.userListsCreate,{
        method:'POST',
        headers:{
            'Authorization':Cookie.get('jwt'),
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            title,
            description
        })
    });
    const res=await data.json();
    if(res.code===500||res.code===400){
        message.error(res.msg.toString());
    }else if(res.code===200){
        message.success(`新收藏夹创建成功!`);
        return res.data;
    }else{
        message.error('服务器异常，请稍后重试');
    }
    return null;
}

//删除收藏夹
export const removeList=async(_id)=>{
    const data= await fetch(api.userListsDelete,{
        method:"POST",
        headers:{
            'Authorization':Cookie.get('jwt'),
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({_id}),
    })
    const res=await data.json();
    if(res.code===200){
        message.success('收藏夹删除成功!');
        return true;
    }else{
        message.error('服务器发生错误!');
        return false;
    }
}