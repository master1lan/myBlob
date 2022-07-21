'use strict';

const { nanoid } = require('nanoid/async');
const Controller = require('egg').Controller;
/**
 * 账号操作
 */

const tokenLiveTime = 60 * 60 * 24;
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
    };
    if(['admin','system'].includes(username)){
      ctx.body={
        code:500,
        msg:'用户名不合法'
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
        exp: Math.floor(Date.now() / 1000) + tokenLiveTime
      }, app.config.jwt.secret);
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: {
          token,
          uuid,
          username
        }
      };
      //因为是注册所以可以直接在redis里面存token
      await ctx.service.redis.setToken(username, token, tokenLiveTime);
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败服务器错误',
      }
    }
  }
  //常规登录
  async login() {
    // app 为全局属性，相当于所有的插件方法都植入到了 app 对象
    const { ctx } = this;
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
    //这个函数将自动保持token的一致性
    const token = await ctx.service.redis.OnlyToken(userInfo.username, userInfo.uuid, tokenLiveTime);
    
    ctx.body = {
      code: 200,
      msg: "登录成功",
      data: {
        token,
        ...userInfo,
        password: undefined
      }
    }
  }
  //获取所有用户名字
  async getAllUserName(){
    const {ctx}=this;
    const res=await ctx.service.user.getAllUserName();
    ctx.body={
      data:res,
    };
  }

  //获取用户信息
  async getUserInfo() {
    const { ctx } = this;
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
        password: undefined,
      }
    }
  }
  // 修改用户信息
  async editUserInfo() {
    const { ctx } = this;
    try {
      const { editInfo } = ctx.request.body;
      const { username } = ctx.info;
      const userInfo = await ctx.service.user.getUserByName(username);
       await ctx.service.user.editUserInfo({
        ...userInfo,
        ...editInfo
      });
      ctx.body = {
        code: 200,
        msg: "修改成功",
      }
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: "服务器繁忙"
      }
    }
  }
  //根据token登录
  async loginWithjwt() {
    const { ctx } = this;
    //因为在中间件之间就将token解析完毕，所以可以直接返回信息
    const token = await ctx.service.redis.OnlyToken(ctx.info.username, ctx.info.uuid, tokenLiveTime);
    const userInfo = await ctx.service.user.getUserByName(ctx.info.username);
    ctx.body = {
      code: 200,
      msg: "jwt登录成功",
      data: {
        ...userInfo,
        token
      }
    };
    return;
  }
}

module.exports = UserController;