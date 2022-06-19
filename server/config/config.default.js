/* eslint valid-jsdoc: "off" */

//配置文件

const env=require("./env");
'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1653455034826_2254';

  // add your middleware config here
  config.middleware = [];
  config.jwt = {
    secret: 'Nick',
  };
  config.mysql = env.mysql;
  config.redis = env.redis;
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*'], // 配置白名单
  };

  config.cors = {
    origin: '*', // 允许所有跨域访问
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload'
  };
  config.multipart = {
    mode: 'file'
  };



  return {
    ...config,
    ...userConfig,
  };
};
