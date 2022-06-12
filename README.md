测试markdown
# 要开始进行页面的设计了
# 修改一下文件夹的排布吧
* components文件夹为组件文件夹
* utils为工具函数文件夹
# 2022-6-12日进度
* 推荐系统是一点没做

* 用户表需要重做，大概就是

  | 字段名    | 数据类型     | 非空 | 字符集  | 作用       |
  | --------- | :----------- | ---- | ------- | ---------- |
  | username  | varchar(30)  | 非空 | utf8mb4 | 用户名     |
  | password  | varchar(30)  | 非空 | utf8mb4 | 密码       |
  | uuid      | varchar(30)  | 非空 | utf8mb4 | uid        |
  | join_day  | varchar(12)  | 非空 | utf8mb4 | 加入日期   |
  | githubUrl | varchar(200) | 可空 | utf8mb4 | github地址 |
  | juejinUrl | varchar(200) | 可空 | utf8mb4 | 掘金地址   |
  | sfUrl     | varchar(200) | 可空 | utf8mb4 | 思否地址   |
  
* markdown表重做为

  | 字段名      | 数据类型     | 非空 | 字符集  | 作用             |
  | ----------- | ------------ | ---- | ------- | ---------------- |
  | _id         | varchar(30)  | 非空 | utf8mb4 | 文章id           |
  | content     | mediumtext   | 非空 | utf8mb4 | 内容             |
  | username    | varchar(30)  | 非空 | utf8mb4 | 作者             |
  | title       | varchar(100) | 非空 | utf8mb4 | 标题             |
  | description | text         | 非空 | utf8mb4 | 描述             |
  | status      | varchar(10)  | 非空 | utf8mb4 | 状态，发表or草稿 |
  |             |              |      |         |                  |
  
* 推荐系统表

  | 字段名 | 数据类型    | 非空 | 字符集  | 作用   |
  | ------ | ----------- | ---- | ------- | ------ |
  | _id    | varchar(30) | 非空 | utf8mb4 | 文章id |
  |        |             |      |         |        |
  |        |             |      |         |        |

  