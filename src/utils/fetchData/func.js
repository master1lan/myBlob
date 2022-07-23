import Cookie from 'js-cookie';
import crypto from '@utils/crypto';
import message from '@utils/message';
import { login } from "@features/user";

//在登录和注册函数中使用
export const Datathen = (res, router, dispatch) => {
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
            uuid: res.data.uuid,
            githubUrl: res.data.githubUrl,
            join_day: res.data.join_day,
            juejinUrl: res.data.juejinUrl,
            sfUrl: res.data.sfUrl,
            signature: res.data.signature,
            logoUrl:res.data.logoUrl
        }))
        router.push("/");
    }
}

//加密字符串
export const passwordCrypto = (pass) => {
    const key = crypto.generatekey(8);
    const password = crypto.encrypt(pass, key);
    return { password, key };
}

//先在这里设置一下




