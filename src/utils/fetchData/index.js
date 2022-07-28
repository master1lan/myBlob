import { useEffect, useLayoutEffect, useState } from 'react';
import Cookie from 'js-cookie';
import api from "@utils/api";
import message from '@utils/message';
import { useDispatch } from "react-redux";
import { login, logout, setPublishBlobs, setDraftBlobs, setFavorLists } from "@features/user";
import { Datathen, passwordCrypto } from './func';
import { useSSREffect } from '@utils/hooks';

//根据jwt进行登录检查
//我靠，不能使用cookie，必须使用localstorage
export function useFetchJWTLogin() {
    const dispatch = useDispatch();
    useSSREffect(() => {
        const fn = async () => {
            const token = localStorage.getItem('jwt');
            if (!token) {
                Cookie.remove('jwt');
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
                signature: res.data.signature,
                logoUrl: res.data.logoUrl
            }));
            //设置localstorage
            localStorage.setItem('jwt', res.data.token);
            //获取用户收藏夹
            resNoJson = await fetch(api.userLists, {
                headers: {
                    'Authorization': res.data.token,
                }
            }), res = await resNoJson.json();
            dispatch(setFavorLists(res.lists));

        };
        fn();
    }, []);
}

//首页推荐流
export async function FetchRecommendBlobs(offset = 0) {
    const data = await fetch(`${api.articles}?offset=${offset}`),
        json = await data.json(),
        res = json.data.map(article => {
            return {
                ...article,
                key: article._id,
                content: article.description,
                time: article.last_edit_time,
            }
        });
    return {res,isOver:json.isFinish};
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

//获取用户信息
export const FetchUserInfo = async (username) => {
    const resNoJSON = await fetch(`${api.userInfo}?username=${username}`);
    const res = await resNoJSON.json();
    return res;
}


//更新用户信息
export const UpdateUserInfo = async (formData) => {
    const resNoJSON = await fetch(api.changeInfo, {
        method: "POST",
        headers: {
            'Authorization': localStorage.getItem('jwt'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ editInfo: formData }),
    });
    const res = await resNoJSON.json();
    if (res.code === 200) {
        message.success('信息修改成功');
    } else {
        message.error(res.msg);
    }
}



//获取用户未发表博客
export function useFetchDraftBlobs() {
    const dispatch = useDispatch();
    useSSREffect(() => {
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
    useSSREffect(() => {
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
    useSSREffect(() => {
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
//这个函数必须修改
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
    return json.res[0];
}

//收藏某篇文章
export const favorBlob = async (blobId, listId) => {
    if (!blobId || !listId) {
        message.error("blobid或者listid错误");
        return;
    }
    const resNoJSON = await fetch(api.userListsFavor, {
        method: "POST",
        headers: {
            "Authorization": localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ blobId, listId }),
    });
    const res = await resNoJSON.json();
    if (res.code !== 200) {
        message.error("服务器错误！");
    } else {
        message.success("收藏成功");
    }
}

//取消收藏某篇文章
export const unfavorBlob = async (blobId, listId) => {
    if (!blobId || !listId) {
        message.error("blobid或者listid错误");
        return;
    };
    const resNoJSON = await fetch(api.userListsUnfavor, {
        method: "POST",
        headers: {
            "Authorization": localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ blobId, listId })
    });
    const res = await resNoJSON.json();
    if (res.code !== 200) {
        message.error("服务器异常，请稍后重试");
    } else {
        message.success("取消收藏成功");
    }
}


//推荐更多相关博客
export const useRecommendMoreBlobs = (BlobNum = 3) => {
    const [blobs, setBlobs] = useState([]);
    useSSREffect(() => {
        const fn = async () => {
            const resNoJSON = await fetch(`${api.recommendBlobs}?recommendNum=${BlobNum}`),
                res = await resNoJSON.json();
            setBlobs(res.blobs);
        };
        fn();
    }, []);
    return blobs;
}

//推荐更多博主
export const useRecommendMoreUsers = (UserNum = 3) => {
    const [users, setUsers] = useState([]);
    useSSREffect(() => {
        const isMounting = true;
        const fn = async () => {
            const resNoJSON = await fetch(`${api.recommendUsers}?recommendNum=${UserNum}`),
                res = await resNoJSON.json();
            isMounting && setUsers(res.users);
        };
        fn();
        return () => isMounting = false;
    }, []);
    return users;
}
//访问别人主页获得别人的发表博客
export const FetchUserBlobsById = async (id) => {
    const resNoJSON = await fetch(`${api.visitedKnowUserBlobs}?id=${id}`),
        res = await resNoJSON.json();
    return res.data;
}