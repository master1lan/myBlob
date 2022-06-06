'use strict';

module.exports=(secret)=>{
    return async function (ctx,next){
        const token = ctx.request.header.authorization; // 若是没有 token，返回的是 null 字符串
        if(token=='null'||!token){
            ctx.status=200;
            ctx.body={
                code:400,
                msg:"token不存在"
            };
            return;
        }else{
            try{
                const decode=ctx.app.jwt.verify(token,secret); //验证token
                await next();
            }catch(err){
                ctx.status=200;
                ctx.body={
                    code:500,
                    msg:"token已过期，请重新登录",
                }
                return;
            }

        }
    }
}