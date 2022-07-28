'use strict';
const { nanoid } = require('nanoid/async');
const Controller = require('egg').Controller;
class HomeController extends Controller {
  //保存文章
  async saveBlob() {
    //之前应该有拦截器检查jwt
    const { ctx } = this;
    const {
      username, title, content, description,
      status = 'draft', last_edit_time = new Date().toLocaleDateString('fr-CA')
    } = ctx.request.body;
    //生成文章id
    const _id = await nanoid();
    const result = await ctx.service.blob.insertNewBlob({
      _id, username, title, content, description, status, last_edit_time
    });
    ctx.body = {
      result,
      _id
    }
  }
  //查找文章
  async searchBlob() {
    //这里不用做验证，但是也可以后期在追踪用户喜爱的时候添加
    const { ctx } = this;
    //只需要id就可以查找
    const params = ctx.query;
    const data = await ctx.service.blob.findBlobById(params);
    if (data) {
      ctx.body = {
        code: 200,
        ...data
      }
    } else {
      ctx.body = {
        code: 500
      }
    }
  }
  //所有文章id
  async findAllBlobId() {
    const { ctx } = this;
    const data = await ctx.service.blob.findAllBlobId();
    ctx.body = {
      _id: data
    }
  }
  //所有文章的简短描述
  async recommendBlobs() {
    const { ctx } = this;
    const { offset = 0 } = ctx.request.query;
    const data = await ctx.service.blob.recommendBlobs(offset);
    const res = await Promise.all(data.map(async acticle => {
      const { logoUrl } = await ctx.service.user.getUserByName(acticle.username);
      return { ...acticle, logoUrl };
    }));
    ctx.body = {
      data: res,
      offset: res.length,
      isFinish:res.length<5
    };
  }
}

module.exports = HomeController;
