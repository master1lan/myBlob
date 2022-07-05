import { useEffect } from 'react';
import Cookie from 'js-cookie';
import api from "@utils/api";
import message from '@utils/message';
import { useDispatch } from "react-redux";
import { login, logout, setPublishBlobs, setDraftBlobs, setFavorLists } from "@features/user";
import { Datathen, passwordCrypto } from './func';

//根据jwt进行登录检查
//我靠，不能使用cookie，必须使用localstorage
export  function useFetchJWTLogin() {
    const dispatch = useDispatch();
    useEffect(async() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            return;
        }
        let resNoJson = await fetch(api.userLoginWithjwt, {
            headers: {
                'Authorization': token
            }
        }), res = await resNoJson.json();
        //登录失败
        if (res.code !== 200) {
            dispatch(logout());
            localStorage.removeItem('jwt');
            return;
        }
        //登录成功

        //设置cookies
        Cookie.set('jwt', res.data.token, {
            'sameSite': "strict"
        });
        //暂时先这样写
        dispatch(login({
            username: res.data.username,
            uuid: res.data.uuid,
            githubUrl: res.data.githubUrl,
            join_day: res.data.join_day,
            juejinUrl: res.data.juejinUrl,
            sfUrl: res.data.sfUrl,
            signature: res.data.signature
        }));
        //设置localstorage
        localStorage.setItem('jwt', res.data.token);
        //获取用户收藏夹
        resNoJson=await fetch(api.userLists,{
            headers: {
                'Authorization':res.data.token,
            }
        }),res=await resNoJson.json();
        // console.log(res.lists);
        dispatch(setFavorLists(res.lists));

    }, []);
}

//登录函数
export const FetchLogin = (router, dispatch) => (data) => {
    const cryptoEd = passwordCrypto(data.password);
    fetch(api.userLogin, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, ...cryptoEd })
    }).then(res => res.json()).then(res => {
        Datathen(res, router, dispatch);
    })
}

//注册函数
export const FetchRegiter = (router, dispatch) => (data) => {
    const cryptoEd = passwordCrypto(data.password);
    fetch(api.userRegister, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, ...cryptoEd })
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
export function useFetchLists() {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(api.userLists, {
            headers: {
                'Authorization': Cookie.get('jwt')
            }
        }).then(res => res.json()).then(res => {
            res?.lists && dispatch(setFavorLists(res.lists));
        })
    }, []);
}

//新增收藏夹
export const createList = async (title, description) => {
    if (title.trim().length < 5) {
        message.error('标题至少5个字!');
        return null;
    }
    const data = await fetch(api.userListsCreate, {
        method: 'POST',
        headers: {
            'Authorization': Cookie.get('jwt'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description
        })
    });
    const res = await data.json();
    if (res.code === 500 || res.code === 400) {
        message.error(res.msg.toString());
    } else if (res.code === 200) {
        message.success(`新收藏夹创建成功!`);
        return res.data;
    } else {
        message.error('服务器异常，请稍后重试');
    }
    return null;
}

//删除收藏夹
export const removeList = async (_id) => {
    const data = await fetch(api.userListsDelete, {
        method: "POST",
        headers: {
            'Authorization': Cookie.get('jwt'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id }),
    })
    const res = await data.json();
    if (res.code === 200) {
        message.success('收藏夹删除成功!');
        return true;
    } else {
        message.error('服务器发生错误!');
        return false;
    }
}




//保存文章，所有的方式！
export const blobUpdate = async ({ givenID, username, title, content, description, status = 'draft', publish = false }) => {
    const _id = sessionStorage.getItem('_id');
    if (!publish) {
        const resNoJSON = await fetch(api.userBlobUpdate, {
            method: "POST",
            body: JSON.stringify({ _id, username, title, content, description, status }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('jwt'),
            }
        });
        const res = await resNoJSON.json();
        if (res.code === 200) {
            sessionStorage.setItem('_id', res.data._id);
            message.success("草稿已在云端保存");
        } else {
            message.error(res.data.msg.toString());
        }
        return null;
    }
    if (!title) {
        message.info('标题不可为空');
        return null;
    }
    if (!description || !content || description.length < 40) {
        message.info('字数太少，未达到发表要求');
        return null;
    };
    if (!username || !title || !content || !description) {
        //报错
        message.error('发生错误！');
        return null;
    };
    let ans = await fetch(api.userBlobUpdate, {
        method: "POST",
        body: JSON.stringify({ _id: givenID ? givenID : _id, username, title, content, description, status }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cookie.get('jwt'),
        }
    });
    let json = await ans.json();
    return json.data._id;
}


//上传图片
export const uploadImg = async (file) => {
    let data = new FormData();
    data.append('file', file);
    const res = await fetch(api.uploadImg, {
        method: "POST",
        body: data
    });
    const json = await res.json();
    // console.log(json.res);
    return json.res[0];
}