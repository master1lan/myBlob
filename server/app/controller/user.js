'use strict';

const { nanoid } = require('nanoid/async');
const Controller = require('egg').Controller;

class UserController extends Controller {
  //注册程序
  async register() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;//获取注册需要的参数
    //判空
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: "账号或密码不能为空",
      }
      return;
    }
    // 验证数据库内是否已经有该账户名
    const userInfo = await ctx.service.user.getUserByName(username) // 获取用户信息
    // 判断是否已经存在
    if (userInfo && userInfo.uuid) {
      ctx.body = {
        code: 500,
        msg: '账户名已被注册，请重新输入',
      }
      return
    }
    const uuid = await nanoid();
    // 调用 service，将数据写入数据库。
    const result = await ctx.service.user.register({
      username,
      password,
      uuid,
      join_day: new Date().toLocaleDateString('fr-CA')
    });
    if (result) {
      //生成token
      const token = app.jwt.sign({
        uuid,
        username: username,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
      }, app.config.jwt.secret);
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: {
          token,
          uuid,
          username
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败服务器错误',
      }
    }
  }
  async login() {
    // app 为全局属性，相当于所有的插件方法都植入到了 app 对象
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    // 根据用户名，在数据库查找相对应的uuid操作
    const userInfo = await ctx.service.user.getUserByName(username);
    // 没找到说明没有该用户
    if (!userInfo || !userInfo.uuid) {
      ctx.body = {
        code: 500,
        msg: "账号不存在",
      }
      return;
    }
    if (userInfo && password != userInfo.password) {
      ctx.body = {
        code: 500,
        msg: "账号密码错误"
      }
      return;
    }
    //生成token
    const token = app.jwt.sign({
      uuid: userInfo.uuid,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
    }, app.config.jwt.secret);
    ctx.body = {
      code: 200,
      msg: "登录成功",
      data: {
        token,
        ...userInfo,
        password: null
      }
    }
  }
  //获取用户信息
  async getUserInfo() {
    const { ctx, app } = this;
    const { username } = ctx.request.query;
    const userInfo = await ctx.service.user.getUserByName(username);
    if (!userInfo) {
      ctx.body = {
        code: 500,
        msg: "错误请求"
      };
      return;
    }
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        ...userInfo,
        password: null,
      }
    }
  }
  // 修改用户信息
  async editUserInfo() {
    const { ctx, app } = this;
    const { password } = ctx.request.body;
    try{
      const token=ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      const userInfo = await ctx.service.user.getUserByName(decode.username);
      const result = await ctx.service.user.editUserInfo({
        ...userInfo,
       password
      });
      ctx.body={
        code:200,
        msg:"修改成功",
      }
    }catch(err){
      ctx.body={
        code:500,
        msg:"服务器繁忙"
      }
    }
  }
  //根据token登录
  async loginWithjwt(){
    const {app,ctx}=this;
    const token=ctx.request.header.authorization;
    const decode=await app.jwt.verify(token,app.config.jwt.secret);
    ctx.body={
      code:200,
      msg:"jwt登录成功",
      data:{
        ...decode
      }
    }
  }
}

module.exports = UserController;