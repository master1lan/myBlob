'use strict';
const  { nanoid }= require('nanoid/async');
const Controller = require('egg').Controller;
class HomeController extends Controller {
  //保存文章
  async saveBlob(){
    //之前应该有拦截器检查jwt
    //然后正常流程是通过jwt获取username
    const {ctx,app}=this;
    // const token=ctx.request.header.authorization;
    // const userInfo=await app.jwt.verify(token,app.config.jwt.secret);
    const {username,title,content,description}=ctx.request.body;
    //生成文章id
    const _id=await nanoid();
    const result=await ctx.service.blob.insertNewBlob({_id,username,title,content,description});
    ctx.body={
      result
    }
  }
  //查找文章
  async searchBlob(){
    //这里不用做验证，但是也可以后期在追踪用户喜爱的时候添加
    const {ctx,app}=this;
    //只需要id就可以查找
    const params=ctx.query;
    // console.log(params);
    const data=await ctx.service.blob.findBlobById(params);
    if(data){
      ctx.body={
        code:200,
        ...data
      }
    }else{
      ctx.body={
        code:500
      }
    }
  }
  //所有文章id
  async findAllBlobId(){
    const {ctx}=this;
    const data=await ctx.service.blob.findAllBlob();
    const result=data.map(item=>item._id)
    ctx.body={
      _id:result
    }
  }
  //所有文章的简短描述
  async findAllBlob(){
    const {ctx}=this;
    const data=await ctx.service.blob.findAllBlob();
    const result=data.map(item=>({
      _id:item._id,
      username:item.username,
      title:item.title,
      content: item.description,
    }))
    ctx.body=result;
  }
}

module.exports = HomeController;
