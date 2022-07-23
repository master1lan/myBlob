'use strict'
const CryptoJS=require('crypto-js');
function decrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : 'XXXXXXXXXXXXX';
    const key = CryptoJS.enc.Utf8.parse(keyStr);
    const decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

module.exports=()=>{
    return async(ctx,next)=>{
        const {password,key}=ctx.request.body;
        // console.log({password,key})
        const ans=decrypt(password,key);
        ctx.request.body.password=ans;
        await next();
    }
}