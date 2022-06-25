'use strict';

const fs = require('fs');
const path = require('path');



const Controller = require('egg').Controller;

class UploadController extends Controller {

    async uploadUserLOGO() {
        const { ctx } = this;
        //这里需要设置config.multipart的mode为file
        const resarr=[];
        try {
            console.time('传统for循环');
            for await (const file of ctx.request.files) {
                const f = fs.readFileSync(file.filepath),
                    dirpath = path.normalize(this.config.userLOGOuploadDir),
                    uploadDir=path.join(dirpath,'test'+path.extname(file.filename));
                    fs.writeFileSync(uploadDir,f);
                    resarr.push(uploadDir.replace(/app/g,''));
            }
            console.timeEnd('传统for循环');
            console.time('promiseall异步');
            const promises=await Promise.all(ctx.request.files.map(
                file=>{
                    const f = fs.readFileSync(file.filepath),
                    dirpath = path.normalize(this.config.userLOGOuploadDir),
                    uploadDir=path.join(dirpath,'test'+path.extname(file.filename));
                    fs.writeFileSync(uploadDir,f);
                    return uploadDir.replace(/app/g,'');
                }
            ));
            console.timeEnd('promiseall异步');
        }finally{
            ctx.cleanupRequestFiles();
        }
        ctx.body={
            code:200,
            mgs:"上传成功",
            data:resarr,
            res:promises
        }
    }
}

module.exports = UploadController;