'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //保存文章
  router.post('/api/blob/save',controller.blob.saveBlob);
  //查找文章
  router.get('/api/blob/search',controller.blob.searchBlob);
  //所有文章id
  router.get('/api/blob/id',controller.blob.findAllBlobId);
  //所有文章的简短描述
  router.get('/api/blob/',controller.blob.findAllBlob);
};
