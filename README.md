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
  | signature | varchar(200) | 可空 | utf8mb4 | 个性签名 |
  | join_day  | varchar(12)  | 非空 | utf8mb4 | 加入日期   |
  | githubUrl | varchar(100) | 可空 | utf8mb4 | github地址 |
  | juejinUrl | varchar(100) | 可空 | utf8mb4 | 掘金地址   |
  | sfUrl     | varchar(100) | 可空 | utf8mb4 | 思否地址   |
  ```mysql
  CREATE TABLE `blob`.`user` (
  	username varchar(30) NOT NULL,
  	password varchar(30) NOT NULL,
  	uuid varchar(30) NOT NULL,
  	signature varchar(200) NULL,
  	join_day varchar(12) NOT NULL,
  	githubUrl varchar(100) NULL,
  	juejinUrl varchar(100) NULL,
  	sfUrl varchar(100) NULL,
  	CONSTRAINT user_pk PRIMARY KEY (uuid)
  )
  ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci
  COMMENT='用户表';
  
  ```
  
* markdown表重做为

  | 字段名         | 数据类型     | 非空 | 字符集  | 作用             |
  | -------------- | ------------ | ---- | ------- | ---------------- |
  | _id            | varchar(30)  | 非空 | utf8mb4 | 文章id           |
  | content        | mediumtext   | 非空 | utf8mb4 | 内容             |
  | username       | varchar(30)  | 非空 | utf8mb4 | 作者             |
  | title          | varchar(100) | 非空 | utf8mb4 | 标题             |
  | description    | text         | 非空 | utf8mb4 | 描述             |
  | status         | varchar(10)  | 非空 | utf8mb4 | 状态，发表or草稿 |
  | last_edit_time | varchar(12)  | 非空 | utf8mb4 | 文章最后修改时间 |
  ```mysql
  CREATE TABLE `blob`.markdown (
  	`_id` varchar(30) NOT NULL,
  	content MEDIUMBLOB NOT NULL,
  	username varchar(30) NOT NULL,
  	title varchar(100) NOT NULL,
  	description TEXT NOT NULL,
  	status varchar(10) NOT NULL,
  	last_edit_time varchar(12) NOT NULL,
      CONSTRAINT markdown_pk PRIMARY KEY (_)
  )
  ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci
  COMMENT='博客表';
  
  ```
  



# 2022-6016日进展

用户收藏夹表

| 字段名         | 数据类型     | 非空 | 字符集  | 作用               |
| -------------- | ------------ | ---- | ------- | ------------------ |
| _id            | varchar(30)  | 非空 | utf8mb4 | 收藏夹id           |
| username       | varchar(30)  | 非空 |         | 宿主名字           |
| title          | varchar(100) | 非空 |         | 收藏夹名字         |
| content        | json         | 可空 | utf8mb4 | 用来收藏每个博客id |
| last_edit_time | varchar(12)  | 非空 | utf8mb4 | 收藏夹最后修改时间 |

```mysql
CREATE TABLE `blob`.userList (
	`_id` varchar(30) NOT NULL,
	username varchar(30) NOT NULL,
	title varchar(100) NOT NULL,
	content json NULL,
	last_edit_time varchar(12) NOT NULL,
	CONSTRAINT userList_pk PRIMARY KEY (`_id`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT='用户收藏夹表';
```

