'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  //文章操作接口
  router.post('/api/blob/save', _jwt, controller.blob.saveBlob);//保存文章
  router.get('/api/blob/search', controller.blob.searchBlob);//查找文章
  router.get('/api/blob/id', controller.blob.findAllBlobId);//所有文章id
  router.get('/api/blob/', controller.blob.findAllBlob);//所有文章的简短描述
  //用户操作接口
  router.post('/api/user/register', controller.user.register);  //注册
  router.post('/api/user/login', controller.user.login);  //登录
  router.get('/api/user/get_userinfo', controller.user.getUserInfo); // 获取用户信息
  router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo); // 修改用户个性签名
  router.get('/api/user/login_jwt', _jwt, controller.user.loginWithjwt); //使用jwt登录
  //用户个人博客操作接口
  router.post('/api/userBlob/getPublishBlob', _jwt, controller.userBlob.getUserBlobPublished);  //已发布文章
  router.post('/api/userBlob/getDraftBlob', _jwt, controller.userBlob.getUserBlobDrafted);  //未发表文章
  router.post('/api/userBlob/updateBlob', _jwt, controller.userBlob.userBlobUpdate);  //更新文章
  router.post('/api/userBlob/deleteBlob', _jwt, controller.userBlob.userBlobDelete);  //删除文章
};
