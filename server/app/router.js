'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  const _crypto=middleware.crypto(); //加密解密字符串

  //只对内网开发
  router.get('/api/blob/id', controller.blob.findAllBlobId);//所有文章id,只提供给NEXT
  router.get('/api/userList/all',controller.userList.findAllListId);//所有用户的收藏夹id，只提供给NEXT
  router.get('/api/user/all',controller.user.getAllUserName);//所有用户的名字
  router.get('/api/next/getBlobsRecommend',controller.recommend.GetBlobsRecommend) //博客推荐
  router.get('/api/next/getUsersRecommend',controller.recommend.GetUsersRecommend) //博主推荐

  //文章操作接口
  router.get('/api/blob/search', controller.blob.searchBlob);//查找文章
  router.get('/api/blob/', controller.blob.recommendBlobs);//首页的文章流

  //文件上传获取接口
  router.post('/api/img/uploadImg',controller.upload.uploadImg); //上传图片

  //用户操作接口
  router.post('/api/user/register',_crypto, controller.user.register);  //注册
  router.post('/api/user/login',_crypto, controller.user.login);  //登录
  router.get('/api/user/get_userinfo', controller.user.getUserInfo); // 获取用户信息
  router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo); // 修改用户信息
  router.get('/api/user/login_jwt', _jwt, controller.user.loginWithjwt); //使用jwt登录
  //用户个人博客操作接口
  router.get('/api/userBlob/getPublishBlob', _jwt, controller.userBlob.getUserBlobPublished);  //已发布文章
  router.get('/api/userBlob/getDraftBlob', _jwt, controller.userBlob.getUserBlobDrafted);  //未发表文章
  router.post('/api/userBlob/updateBlob', _jwt, controller.userBlob.userBlobUpdate);  //更新文章
  router.post('/api/userBlob/deleteBlob', _jwt, controller.userBlob.userBlobDelete);  //删除文章
  
  //用户收藏夹操作接口
  router.get('/api/userList',_jwt,controller.userList.findUserLists); //用户收藏夹
  router.get('/api/userList/getList',controller.userList.findListsById); //根据收藏夹id返回收藏文章列表
  router.post('/api/userList/newList',_jwt,controller.userList.createList);  //新建收藏夹
  router.post('/api/userList/deleteList',_jwt,controller.userList.deleteList); //删除收藏夹
  router.post('/api/userList/favorBlob',_jwt,controller.userList.favorBlob); //在收藏夹收藏某篇文章
  router.post('/api/userList/unfavorBlob',_jwt,controller.userList.unfavorBlob); //在收藏夹取消收藏某篇文章
  
};
