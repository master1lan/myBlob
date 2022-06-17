'use strict';

const Controller = require('egg').Controller;
/**
 * 用户个人博客操作
 */
class UserBlobController extends Controller {
    //获取用户已发布博客
    async getUserBlobPublished() {
        const { ctx } = this;
        //根据username查找
        const { username } = ctx.info;
        const result = await ctx.service.blob.findBlobs({
            where: { username: username, status: 'publish' },
            columns: ['username', 'title', '_id', 'description', 'status', 'last_edit_time']
        });
        ctx.body = {
            code: 200,
            data: result
        }
    }
    //用户草稿博客
    async getUserBlobDrafted() {
        const { ctx } = this;
        //根据username查找
        const { username } = ctx.info;
        const result = await ctx.service.blob.findBlobs({
            where: { username: username, status: 'draft' },
            columns: ['username', 'title', '_id', 'description', 'status', 'last_edit_time']
        });
        ctx.body = {
            code: 200,
            data: result
        }
    }
    //用户更新博客
    async userBlobUpdate() {
        const { ctx } = this;
        const { username } = ctx.info;
        const { _id, content, title, description, status } = ctx.request.body;
        const result = await ctx.service.blob.updateBlobById({
            _id, username, content, title, description, status, 'last_edit_time': new Date().toLocaleDateString('fr-CA')
        });
        ctx.body = {
            code: 200,
            data: result
        };
    }
    //用户删除博客
    async userBlobDelete() {
        const { ctx } = this;
        const { _id } = ctx.request.body;
        if (!_id) {
            ctx.body = {
                code: 500,
                msg: '删除失败，博客不存在'
            };
            return;
        }
        const result = await ctx.service.blob.deleteBlobById({ _id });
        ctx.body = {
            code: 200,
            msg: result
        };
    }
}
module.exports = UserBlobController;