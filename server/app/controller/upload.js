'use strict';

const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto');


const Controller = require('egg').Controller;

class UploadController extends Controller {
    async uploadImg() {
        const { ctx } = this;
        //这里需要设置config.multipart的mode为file
        let promises;
        try {
            promises = await Promise.all(ctx.request.files.map(
                async file => {
                    const urlpath = this.config.uploadDir;
                    const f = fs.readFileSync(file.filepath),
                        //在这里需要对图片进行hash
                        fileHash = await this.fileHash(f),
                        filename = fileHash.toString() + path.extname(file.filename);
                        //这里进行判断
                        const ishashInclude=await ctx.service.img.findHashIsInlucde(fileHash);
                        const uploadDir = path.join(urlpath, filename);
                    if(!ishashInclude){
                        await ctx.service.img.insertNewHash(fileHash);
                        fs.writeFileSync(uploadDir, f);
                    }
                    return urlpath.replace('app', this.config.hostUrl) + '/' + filename;
                }
            ));
        } finally {
            ctx.cleanupRequestFiles();
        }
        ctx.body = {
            code: 200,
            msg: "上传成功",
            res: promises
        }
    }
    async fileHash(file) {
        try {
            const fileHash = CryptoJS.createHash('sha256');
            fileHash.update(file);
            return fileHash.digest('hex');
        } catch (e) {
            console.log(e);
            return 'fileinputerror';
        }
    }
}

module.exports = UploadController;