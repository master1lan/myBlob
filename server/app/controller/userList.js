'use strict';

const { nanoid } = require('nanoid/async');
const Controller = require('egg').Controller;
/**
 * 用户收藏夹操作
 */

class UserListController extends Controller {
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
    const {content}=await ctx.service.list.findListByListId(listId);
    const promises=await Promise.all(content.map(_id=>ctx.service.blob.findBlobById({_id})))
    ctx.body={
      data:promises
    };
  }
  //用户新建收藏夹
  async createList() {
    //这里也要进行拦截
    const { ctx } = this;
    const {
      username, title,
      last_edit_time = new Date().toLocaleDateString('fr-CA'),
    } = ctx.request.body;
    const _id = await nanoid();
    const result = await ctx.service.list.createList({ username, title, _id, last_edit_time });
    if (result) {
      ctx.body = {
        code: 200,
        data: result
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
      username, _id
    } = ctx.request.body;
    const result = await ctx.service.list.deleteList(_id);
    ctx.body = {
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
    ctx.body={
      data:result
    };
  }
  //用户在某个收藏夹取消收藏某篇文章
  async unfavorBlob(){
    const {ctx}=this;
    const{listId,blobId}=ctx.request.body;
    const result=await ctx.service.list.removeListById(listId,blobId);
    ctx.body={
      data:result
    };
  }
  //用户follow某个用户

  //用户取消follow某个用户
}
module.exports = UserListController;