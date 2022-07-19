'use strict';

const fs = require('fs');
const path = require('path');



const Controller = require('egg').Controller;

class UploadController extends Controller {

    async uploadUserLOGO() {
        const { ctx } = this;
        //这里需要设置config.multipart的mode为file
        let promises;
        try {
            promises = await Promise.all(ctx.request.files.map(
                file => {
                    const f = fs.readFileSync(file.filepath),
                        uploadDir = path.join(this.config.userLOGOuploadDir, 'test' + path.extname(file.filename));
                    fs.writeFileSync(uploadDir, f);
                    return uploadDir.replace(/app/g, '');
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

    async uploadImg() {
        const { ctx } = this;
        //这里需要设置config.multipart的mode为file
        let promises;
        try {
            promises = await Promise.all(ctx.request.files.map(
                file => {
                    const urlpath=this.config.uploadDir;
                    const f = fs.readFileSync(file.filepath),
                    filename='test' + Math.random() * 100 + path.extname(file.filename),
                        uploadDir = path.join(urlpath, filename);
                    fs.writeFileSync(uploadDir, f);
                    return urlpath.replace('app', this.config.hostUrl)+'/'+filename;
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
}

module.exports = UploadController;