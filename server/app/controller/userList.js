'use strict';

const { nanoid } = require('nanoid/async');
const Controller = require('egg').Controller;
/**
 * 用户收藏夹操作
 */

class UserListController extends Controller {
  //所有用户的收藏夹id
  async findAllListId(){
    const {ctx}=this;
    const result=await ctx.service.list.findAllLists();
    ctx.body={
      ids:result
    };
  }
  //寻找用户的所有收藏夹
  async findUserLists() {
    const { ctx } = this;
    const {username}=ctx.info;
    const result = await ctx.service.list.findListsByUser(username);
    ctx.body = {
      lists: result
    };
  }
  //根据收藏夹id返回收藏文章列表
  async findListsById(){
    const {ctx}=this;
    const {listId}=ctx.request.query;
    const {content,...resObj}=await ctx.service.list.findListByListId(listId);
    const promises=await Promise.all(content.map(_id=>ctx.service.blob.findBlobById({_id})));
    ctx.body={
      ...resObj,
      data:promises.map(({_id,title,description,username,last_edit_time})=>({_id,title,description,username,last_edit_time})),
    };
  }
  //用户新建收藏夹
  async createList() {
    //这里也要进行拦截
    const { ctx } = this;
    const {
     title,
      last_edit_time = new Date().toLocaleDateString('fr-CA'),
      description=''
    } = ctx.request.body;
    const {username}=ctx.info;
    const _id = await nanoid();
    const result = await ctx.service.list.createList({ username, title, _id, last_edit_time,description });
    if (result) {
      ctx.body = {
        code: 200,
        data: {
          _id,
          content:[],
          title,
          last_edit_time
        }
      };
    } else {
      ctx.body = {
        code: 500,
        msg: "服务器繁忙"
      }
    }
  }
  //用户删除收藏夹
  async deleteList() {
    //这里也要进行拦截
    const { ctx } = this;
    //这里后面要进行判断是不是自己的收藏夹
    const {
       _id
    } = ctx.request.body;
    const result = await ctx.service.list.deleteList(_id);
    ctx.body = {
      code:200,
      data: result
    };
  }
  //用户在某个收藏夹收藏某篇文章
  async favorBlob() {
    const { ctx } = this;
    const {
      listId,
      blobId
    } = ctx.request.body;
    const result=await ctx.service.list.addListById(listId,blobId);
    if(!result){
      ctx.body={
        code:500,
        msg:"服务器错误"
      };
      return;
    }
    ctx.body={
      code:200,
      data:result
    };
  }
  //用户在某个收藏夹取消收藏某篇文章
  async unfavorBlob(){
    const {ctx}=this;
    const{listId,blobId}=ctx.request.body;
    const result=await ctx.service.list.removeListById(listId,blobId);
    if(!result){
      ctx.body={
        code:500,
        msg:"服务器错误"
      };
      return;
    }
    ctx.body={
      code:200,
      data:result
    };
  }
  //用户follow某个用户

  //用户取消follow某个用户
}
module.exports = UserListController;