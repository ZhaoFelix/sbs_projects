# Vue3  + TS +  MySQL  +  Express 项目实践

### 最终项目提交

* 项目包（3~5人）：前端项目 + 接口项目 + SQL + 说明文档
* 实习报告（1人）

## MySQL基础

### MySQL安装与连接

#### 安装包下载

[链接](https://downloads.mysql.com/archives/community/)

#### 根据官网教程安装

[链接](https://dev.mysql.com/doc/refman/5.7/en/installing.html)

#### 数据库登录

1、终端运行命令:

```bash
mysql -u root -p
```

2、输入初始密码

3、首次使用初始密码登录需要修改密码

> Mysql密码需要符合**强密码**要求。强密码：必须至少包含一个大写字母、一个小写字母、一个特殊符号、一个数字，密码长度至少为8个字符。

#### 初始密码无法登录

1、停止mysql服务

````bash
sudo pkill mysqld
````

2、禁止mysql验证

````bash
# 终端切入到目标目录
cd /usr/local/mysql/bin
# 切换到root账户
sudo su 
# 禁止验证功能，回车后mysql会自动重启
./mysqld_safe --skip-grant-tables &
````

3、重新设备新密码

````bash
mysql 
# mysql 环境下运行下面的命令
flush privilleges；
set password for 'root'@'localhost' = 'Qing_Mao1234'
````

> 注意：mysql下的单个命令行以`;`作为结尾。

4、退出mysql，使用新密码登录

````bash 
# 退出mysql环境
quit 或者 exit
# 连接mysql，输入刚设置的密码
mysql -u root -p
````

#### CentOS下查看MySQL的初始密码

```bash
sudo grep "password" /var/log/mysqld.log
```

> 若是首次安装，需要使用命令`systemctl start mysqld.service` 启动数据库，才能生成密码，否则mysqld.log内容为空。

#### MySQL可视化管理工具

* phpadmin
* Php + apache + mysql

* [DataGrip](https://www.jetbrains.com/zh-cn/datagrip/)
* [Navicat Premium](https://www.navicat.com/en/products/navicat-premium)
* [MySQL Workbench](https://www.mysql.com/products/workbench/)
* [Navicat for MySQL](https://www.navicat.com/en/products/navicat-for-mysql)

#### MySQL客户端连接

客户端连接时需要的信息：

* host: 地址，连接本地为localhost或者127.0.0.1。连接远程数据库，地址为服务器的ip地址。
* port: 端口，默认情况下为3306
* user：用户名
* password: 用户密码

> 注意：如果MySQL数据是安装在远程的服务器上，如果是在目前比较主流的阿里云或者腾讯云服务器上，需要在对应的安全组中开始3306端口。
>
> 若服务器关闭了防火墙设置，还需要在防火墙中打开3306端口。

#### 在查询控制中查看数据的基本信息

````sql
# 显示所有的数据库
show databases;
# 查询数据的版本
select version();
````

#### 连接阿里云的RDS MySQL

1、将本地IP地址添加到RDS白名单；

2、获取外网地址后再客户端进行连接。

#### 无法连接数据库的几种可能

1、数据库未处于运行状态；

> 在Linux环境下，使用`systemctl status mysqld.service` 命令检查数据库的运行状态。

2、数据连接的3306端口未开启；

> 如果数据库是部署在远程服务器且服务器开启了防火墙机制，需要开启3306端口。如果是使用主流的云服务器，需要在服务器安全组中开启端口。

3、创建的用户不支持本地连接；

> 创建数据库账户时，如果账户的主机地址为`localhost`将不支持远程连接，可以添加用户的主机地址为`%`或者指定的端口好。

### 用户创建与权限分配

#### 创建数据库

````sql
create  database if not exists `qingmao` charset utf8mb4;
````

> 注意：创建数据库时如果使用数据库默认的编码格式，在表字段存储emoji可能会存在乱码。

#### 创建表

1、创建一个用户表

````sql
create  table  if not exists t_user (
    id  int auto_increment primary key comment '自增ID',
    user_name varchar(20) comment  '用户名',
    user_gender int default 0 comment  '性别，男：0，女：1',
    created_time datetime default now()
) comment '用户表';
````

2、插入一些测试数据

````sql
# 插入单行记录
insert into user_t (user_name)  values('Felix😀');

# 同时插入多行数据
insert into user_t (user_name)  values('Felix😀'), ('Felix'), ('Felix2');
````

#### 通过user表查询所有的用户

````sql
user mysql;
select * from  user;
````

用户权限参数说明：

| 字段名                 | 字段类型      | 是否为空 | 默认值 | 说明                                                         |
| ---------------------- | ------------- | -------- | ------ | ------------------------------------------------------------ |
| Select_priv            | enum('N','Y') | NO       | N      | 是否可以通过SELECT 命令查询数据                              |
| Insert_priv            | enum('N','Y') | NO       | N      | 是否可以通过 INSERT 命令插入数据                             |
| Update_priv            | enum('N','Y') | NO       | N      | 是否可以通过UPDATE 命令修改现有数据                          |
| Delete_priv            | enum('N','Y') | NO       | N      | 是否可以通过DELETE 命令删除现有数据                          |
| Create_priv            | enum('N','Y') | NO       | N      | 是否可以创建新的数据库和表                                   |
| Drop_priv              | enum('N','Y') | NO       | N      | 是否可以删除现有数据库和表                                   |
| Reload_priv            | enum('N','Y') | NO       | N      | 是否可以执行刷新和重新加载MySQL所用的各种内部缓存的特定命令，包括日志、权限、主机、查询和表 |
| Shutdown_priv          | enum('N','Y') | NO       | N      | 是否可以关闭MySQL服务器。将此权限提供给root账户之外的任何用户时，都应当非常谨慎 |
| Process_priv           | enum('N','Y') | NO       | N      | 是否可以通过SHOW PROCESSLIST命令查看其他用户的进程           |
| File_priv              | enum('N','Y') | NO       | N      | 是否可以执行SELECT INTO OUTFILE和LOAD DATA INFILE命令        |
| Grant_priv             | enum('N','Y') | NO       | N      | 是否可以将自己的权限再授予其他用户                           |
| References_priv        | enum('N','Y') | NO       | N      | 是否可以创建外键约束                                         |
| Index_priv             | enum('N','Y') | NO       | N      | 是否可以对索引进行增删查                                     |
| Alter_priv             | enum('N','Y') | NO       | N      | 是否可以重命名和修改表结构                                   |
| Show_db_priv           | enum('N','Y') | NO       | N      | 是否可以查看服务器上所有数据库的名字，包括用户拥有足够访问权限的数据库 |
| Super_priv             | enum('N','Y') | NO       | N      | 是否可以执行某些强大的管理功能，例如通过KILL命令删除用户进程；使用SET GLOBAL命令修改全局MySQL变量，执行关于复制和日志的各种命令。（超级权限） |
| Create_tmp_table_priv  | enum('N','Y') | NO       | N      | 是否可以创建临时表                                           |
| Lock_tables_priv       | enum('N','Y') | NO       | N      | 是否可以使用LOCK TABLES命令阻止对表的访问/修改               |
| Execute_priv           | enum('N','Y') | NO       | N      | 是否可以执行存储过程                                         |
| Repl_slave_priv        | enum('N','Y') | NO       | N      | 是否可以读取用于维护复制数据库环境的二进制日志文件           |
| Repl_client_priv       | enum('N','Y') | NO       | N      | 是否可以确定复制从服务器和主服务器的位置                     |
| Create_view_priv       | enum('N','Y') | NO       | N      | 是否可以创建视图                                             |
| Show_view_priv         | enum('N','Y') | NO       | N      | 是否可以查看视图                                             |
| Create_routine_priv    | enum('N','Y') | NO       | N      | 是否可以更改或放弃存储过程和函数                             |
| Alter_routine_priv     | enum('N','Y') | NO       | N      | 是否可以修改或删除存储函数及函数                             |
| Create_user_priv       | enum('N','Y') | NO       | N      | 是否可以执行CREATE USER命令，这个命令用于创建新的MySQL账户   |
| Event_priv             | enum('N','Y') | NO       | N      | 是否可以创建、修改和删除事件                                 |
| Trigger_priv           | enum('N','Y') | NO       | N      | 是否可以创建和删除触发器                                     |
| Create_tablespace_priv | enum('N','Y') | NO       | N      | 是否可以创建表空间                                           |

#### 新建用户和权限分配

1、 创建用户

````sql
create user 用户名@主机 identified by '密码'

-- 示例
create  user  'test2'@'%' identified  by 'test2_123';
````

2、给用户分配权限

````sql
grant 权限 on 数据库名.表名 to 用户名@主机 identified by '密码'

-- 创建一个test账号对online数据库下的所有表具有查询权限
grant  select on online.* to 'test2'@'%' identified  by 'test2_123';
````

3、查看用户权限

````sql
-- 使用对应账号登录后，可以直接使用下面的命令查询
show grants

-- 查看某个用户的权限
show grants for  prod_font;
````

4、用户权限撤销

````sql
-- 格式
revoke 权限 on 数据库名.表名 from 用户名@本机地址
-- 用户权限收回
revoke  SELECT, INSERT, UPDATE, DELETE ON `ningjin_prod`.* from 'prod_font'@'%';
````

5、用户重命名

```sql
rename user  'test2'@'%' to 'test1'@'%';
```

6、用户删除

````sql
drop  user  'test'@'%';
````

#### 创建角色和权限分配

> 注意：角色创建为MySQL 8.0支持。

1、创建角色

````sql
create role  if not exists  '角色名';
````

2、给角色分配权限

````sql
grant 权限列表 on 数据库名.表名 to '角色名'; 
````

3、给用户分配角色

```sql
grant 角色名  to 用户名@主机
```

4、显示用户的角色权限

````sql
show grants  for 用户名@主机 using 角色名
````

5、撤销角色权限

````sql
show grants  for 用户名@主机 using 角色名
````

6、删除角色

````sql
drop role '角色名'
````

### 表创建

[MySQL数据类型](https://www.runoob.com/mysql/mysql-data-types.html)

#### 创建管理员表

表结构：

* ID：自增，唯一，主键

* 登录名：varchar

* 密码: varchar

* 角色类型：int(1:管理员，2：二级管理员，3：三级管理员)

* 上一次登录时间：datetime

* 是否被删除：int（1：有效，0：无效）

* 绑定用户名：varchar

* 用户token: varchar

  

SQL语句：

```sql
create table if not exists t_admin_list
(
    admin_id         int unique auto_increment,
    admin_name         varchar(20)   null comment '登录名',
    admin_pwd          varchar(100)  null comment '密码',
    admin_type         int           null comment '管理员角色',
    admin_last_time    datetime      null comment '上一次登录时间',
    admin_created_time datetime      null comment '创建时间',
    admin_is_deleted   int default 0 null comment '是否被删除',
    admin_login_name   varchar(50)   null comment '用户登录名',
    admin_token        varchar(100)  null comment '用户token'
) charset = utf8mb4;
```

## Express基础

### 环境配置与项目创建

#### Node.js环境安装

1、下载

[下载链接](https://nodejs.org/zh-cn/)

2、安装

安装包下载完成后直接双击安装。

3、测试是否安装成功

终端运行下面的命令：

````bash
node -v
````

如果终端显示node版本号，说明安装成功。否则，可能需要配置node的环境变量。

4、查看npm是否安装成功

````bash
npm -v
````

5、使用nvm管理node的版本

[nvm下载安装](https://github.com/nvm-sh/nvm)

nvm的基础使用：

````bash
 # 查看本地的已安装的所有版本的node
 nvm list
 # 安装指定版本号的node
 nvm install 版本号
 # 安装最新版的node
 nvm install latest
 # 卸载指定版本号的node
 nvm uninstall 版本号
 # node 切换
 nvm use 版本号
 # 切换为默认版本
 nvm use default 
 # 查看当前使用的node版本
````

```bash
命令 + （-v、-V、--version、-version、version）
```

#### npm使用指南

##### npm 镜像源配置

查看默认的镜像源：

````bash
npm config list
````

临时指定镜像源：

````bash
npm --registry https://repo.huaweicloud.com/repository/npm/ info express
````

永久指定镜像源：

````bash
npm config set registry https://repo.huaweicloud.com/repository/npm/
````

> <span style='color:red'>注意：修改npm的镜像源可以解决`npm install` 时下载慢的问题。 </span>

##### 创建package.json文件

```bash
npm init 
npm init -y
```

##### npm 安装包

```bash
npm install 包名 -g  # 全局安装
npm install 包名  # 本地安装
npm install 包名@latest #安装最新版本

npm install 包名 --save-dev #安装开发时依赖的包
npm install 包名 -D #安装开发时依赖的包

npm install 包名 --save #安装运行时依赖的包
npm install 包名 -S #安装运行时依赖的包
```

##### 卸载包

```bash
npm uninstall 包名 
```

##### 更新包

```bash
npm update 包名
npm update 包名@version #更新到指定的版本
```

##### 查看

```bash
npm root #查看项目所在目录
npm root -g #查看全局所在目录

npm view 包名 #查看包的信息
npm view 包名 dependencies #包的属性
npm view 包名 repository.url  #包的源码地址
npm view 报名 engines  #包依赖node的最低版本号
npm view 包名 version #包的当前版本号
npm view 包名 versions #包的历史版本号
npm view 包名 maintainters #包的作者信息
```

##### 清除未用到的包

```bash
npm prune
```

##### 检查

```bash
npm outdated #检查所有包是否过时
```

##### 打开与包相关的网址

```bash
npm home 包名 #包的主页
npm docs 包名 #包的文档页面
npm repo 包名 #包的仓库地址
```

##### 查看全局安装的模块

```bash
npm list -g --depth=0
```

##### 清除缓存

```bash
npm cache clean --force
```

##### 自动配置国区镜像

```bash
npm install -g mirror-config-china
```

#### express脚手架安装

1、安装express脚手架：

````bash
npm install -g express-generator
````

2、查看express脚手架是否安装成功

````bash
express --version
````

3、使用脚手架创建项目

````bash
express 项目名
````

#### express初始项目介绍

目录介绍：

app.js : 项目入口

packages.json:包信息管理文件

routes: 存放接口路由文件

views:存放视图相关文件

bin: 项目的运行命令存放路径

#### 项目运行与实时更新

##### 运行项目

1、到项目的根目录下：

2、安装项目依赖包:

````bash
npm install 
````

3、运行项目：

````bash
npm run start
````

4、浏览器测试

##### 实时更新配置

1、全局安装nodemon

````bash
npm install -g nodemon
````

2、项目配置

打开package.json文件:

将

````json
"start": "node ./bin/www"
````

修改为：

````json
"start": " nodemon ./bin/www"
````

配置好实时更新之后，每次保存项目后，都会自动进行更新和同步，无须重新运行。

##### nodemon 相关

[nodemon 官网](https://github.com/remy/nodemon) 

### 连接数据库

#### 安装依赖

````bash
npm install -d mysql
````

> [mysql](https://github.com/mysqljs/mysql)

#### 创建MySQL连接

1、创建env.js文件存储数据库信息：

```js
let dev = {
  dbInfo: {
    // 连接数
    connectionLimit: 200,
    // 主机地址
    host: 'localhost',
    // 用户
    user: 'root',
    // 密码
    password: 'Qing_Mao1234',
    // 数据库
    database: 'qingmao',
    // 是否可以使用旧的连接方式进行连接，默认为FALSE
    insecureAuth: true
  }
}

module.exports = {
  dev
}
```

2、创建连接

```js 
let mysql = require('mysql')
const env = require('./env')
// 创建一个连接池
let pool = mysql.createPool(env.dev.dbInfo)

//数据库查询，查询时的默认参数为空
function queryDB(sql, params = '1', callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log('连接失败' + err)
    } else {
      connection.query(sql, params, function (err, results, fields) {
        if (err) {
          console.log('查询失败' + err)
          connection.release() //释放连接
          // throw err
        }

        //将查询出来的结果返回给回调函数
        callback(err, results, fields)
      })
      //查询结束后释放连接池，等待待别的连接池使用
      pool.releaseConnection(connection)
    }
  })
}

module.exports = {
  queryDB
}
```

3、验证是否连接成功

在`routes/index.js`中测试数据连接是否成功：

````js
const DB = require('../config/db')

router.get('/', function (req, res, next) {
  DB.queryDB('select  * from user_t;', function (error, results, fields) {
    if (error) {
      console.log('数据库连接失败，ERROR:' + error)
    } else {
      console.log('数据库连接成功，RESULTS:' + results)
    }
  })
  res.render('index', { title: 'Express' })
})
````

4、将查询的结果以json的格式进行响应

````js
let responseJSON = {
        code: 200,
        message: 'success',
        data: results
      }
res.send(responseJSON)
````

> 注意： 不能有多个响应，所以需要注释掉底部的渲染。

### 封装响应类

````js
const { response_options } = require('../config/env')
class Result {
  // 构造函数
  constructor(data, message = '操作成功', options) {
    this.data = null
    if (arguments.length === 0) {
      this.message = '操作成功'
    } else if (arguments.length === 1) {
      this.message = data
    } else {
      this.data = data
      this.message = message
      if (options) {
        this.options = options
      }
    }
  }

  createResult() {
    if (!this.code) {
      this.code = response_options.CODE_SUCCESS
    }
    let base = {
      code: this.code,
      message: this.message
    }
    if (this.data) {
      base.data = this.data
    }
    if (this.options) {
      base = { ...base, ...this.options }
    }
    return base
  }
  // json
  json(res) {
    res.json(this.createResult())
  }
  // 成功
  success(res) {
    this.code = response_options.CODE_SUCCESS
    this.json(res)
  }
  // 失败
  fail(res) {
    this.code = response_options.CODE_ERROR
    this.json(res)
  }

  // JWT认证
  jwtError(res) {
    this.code = 401
    this.json(res)
  }
}

module.exports = Result
````

在`config/env.js`中添加响应码：

````js
let response_options = {
  CODE_ERROR: 20002,
  CODE_SUCCESS: 20000
}
````

在`routes/index.js`中使用：

引入定义好的响应类模块，将之前自定义的响应对象和响应替换为下面的代码：

````js
new Result(results, 'success').success(res)
````

### get&post 请求

新建一个`routes/admin.js`文件，将查询所有管理员的接口移植到这个文件中：

```js
// 管理员相关接口

var express = require('express')
var router = express.Router()
const DB = require('../config/db')
const Result = require('../config/result')

// 查询所有的管理员
router.get('/query/all', function (req, res, next) {
  DB.queryDB('select  * from t_admin_list;', function (error, results, fields) {
    if (error) {
      new Result([], 'error', { error: error }).fail(res)
    } else {
      new Result(results, 'success', { length: 12 }).success(res)
    }
  })
})

module.exports = router
```

> 注意：在路由文件夹下新建一个文件时，需要在`app.js`文件中进行路由注册。

使用**post**请求实现管理员的添加：

```js
// 添加管理员
router.post('/add/one', function (req, res, next) {
  const admin = req.body
  // 对象解析
  const { admin_name, admin_type, admin_login_name, admin_pwd, admin_token } =
    admin
  DB.queryDB(
    'insert t_admin_list(admin_name, admin_pwd, admin_type, admin_login_name, admin_token, admin_created_time)value(?, ?, ?, ?,now());',
    [admin_name, admin_pwd, admin_type, admin_login_name, admin_token],
    function (error, results, fields) {
      if (error) {
        new Result('添加失败', error).fail(res)
      } else {
        new Result(results, '添加成功').success(res)
      }
    }
  )
})
```

> **post**请求无法再浏览器总直接获取结果，需要在接口工具中进行测试。



### 通用处理

#### 批量自动导入接口

批量导入的工具函数：

```javascript
// helper.js
// 自动路由相关
const fs = require('fs')
const path = require('path')
const { route } = require('../routes')
/**
 * 将文件名更改为前缀
 * **/
function transform(filename) {
  return (
    filename
      .slice(0, filename.lastIndexOf('.'))
      // 分隔符转换
      .replace(/\\/g, '/')
      // 去除index
      .replace('/index', '/')
      // 路径头部/修正
      .replace(/^[/]*/, '/')
      // 路径尾部/修正
      .replace(/[/]*$/, '')
  )
}

/**
 * 文件路径转换为模块名，同时去掉.js后缀
 * @param {any} rootDir 模块入口
 * @param {any} excludeFile 要排除的入口文件
 * @returns
 * **/
exports.scanDirModules = function scanDirModules(rootDir, excludeFile) {
  if (!excludeFile) {
    // 默认的路口文件为目录下的index.js
    excludeFile = path.join(rootDir, 'index.js')
  }
  // 模块集合
  const modules = {}
  // 获取目录下的第一级子文件
  let filenames = fs.readdirSync(rootDir)
  while (filenames.length) {
    // 获取相对路径
    const relativeFilePath = filenames.shift()
    // 获取绝对路径
    const absFilePath = path.join(rootDir, relativeFilePath)
    // 排除入口文件
    if (absFilePath == excludeFile) {
      continue
    }
    if (fs.statSync(absFilePath).isDirectory()) {
      // 如果是文件夹的情况下，读取子目录下的目录文件，然后添加到路由文件队列中
      const subFiles = fs
        .readdirSync(absFilePath)
        .map((v) => path.join(absFilePath.replace(rootDir, ''), v))
      filenames = filenames.concat(subFiles)
    } else {
      // 如果是文件的情况下，将文件路径转换为路由前缀，添加路由前缀和路由模块到模块集合中
      const prefix = transform(relativeFilePath)
      modules[prefix] = require(absFilePath)
    }
  }
  return modules
}
```

在`routes/index.js`文件自动扫描路由：

```javascript
const helper = require('../utils/helper')
// 扫描路由路径，自动导入接口路由
const scanResult = helper.scanDirModules(__dirname, __filename)
for (const prefix in scanResult) {
  if (scanResult.hasOwnProperty(prefix)) {
    router.use(prefix, scanResult[prefix])
  }
}
```

新建任意一个路由进行测试。

```js
/admin   --> routes/admin.js
/users  ---> routes/users.js
/pc/admin/admin --> /pc/admin/admin.js
/pc/admin ---> /pc/admin/admin/index.js
/pc/order ---> /pc/order/index.js
```

#### 404接口处理

安装依赖：

```bash
npm install -s boom 
```

[boom官网](https://hapi.dev/module/boom/)

在`routes/index.js`文件中：

```javascript
// 集中处理404
router.use((err, res, next) => {
  next(boom.notFound('接口不存在'))
})

/*
自定义路由处理异常中间件
注意：
这个中间件必须放在路由的最后面。
*/
router.use((err, req, res, next) => {
  const msg = (err && err.message) || '系统错误'
  const statusCode = (err.output && err.output.statusCode) || 500
  const errorMsg =
    (err.output && err.output.payload && err.output.payload.error) ||
    err.message
  new Result(null, msg, {
    statusCode: statusCode,
    errorMsg
  }).fail(res.status(statusCode))
})
```

### 接口创建

#### 使用Promise优化数据库查询

```javascript
//数据库查询，查询时的默认参数为空
function queryDB(sql, params = '1') {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject('连接失败，error:' + err)
      } else {
        connection.query(sql, params, function (err, results) {
          if (err) {
            reject('查询失败，error:' + err)
          }
          //将查询出来的结果返回给回调函数
          resolve(results)
        })
        //查询结束后释放连接池，等待别的连接池使用
        pool.releaseConnection(connection)
      }
    })
  })
}
```

对默认的验证接口进行更改：

```javascript
router.get('/', function (req, res, next) {
  DB.queryDB('select  * from user_t;')
    .then((data) => {
      new Result(data, 'success').success(res)
    })
    .catch((error) => {
      new Result(error, 'error').fail(res)
    })
})
```

[使用Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

#### 管理员相关

在`service`文件夹下创建`admin.js`文件用来实现管理员相关的逻辑代码。

##### 添加

在`service/admin.js`文件中添加管理员的添加逻辑：

```js
const DB = require('../config/db')

// 查询所有管理员
function queryAllAdmin() {
  return DB.queryDB('select  * from t_admin_list;')
}

// 添加管理员
function addOneAdmin(admin) {
  const { admin_name, admin_type, admin_login_name, admin_pwd, admin_token } =
    admin
  return DB.queryDB(
    'insert t_admin_list(admin_name, admin_pwd, admin_type, admin_login_name, admin_token, admin_created_time) value(?, ?, ?, ?, ?,now());',
    [admin_name, admin_pwd, admin_type, admin_login_name, admin_token]
  )
}

// 判断登录名是否已经存在
function isExistAdmin(admin_login_name) {
  return DB.queryDB(
    'select  * from t_admin_list where  admin_login_name = ?;',
    [admin_login_name]
  )
}

// 删除管理员
function deleteAdmin(admin_id) {
  return DB.queryDB(
    'update t_admin_list set admin_is_deleted = 1 where  admin_id = ? and admin_is_deleted = 0;',
    [admin_id]
  )
}

module.exports = {
  queryAllAdmin,
  addOneAdmin,
  isExistAdmin,
  deleteAdmin
}
```

> 使用**对象解析**可以快速将对象进行解析，快速获取对象成员。但是要注意解析是的常量或变量名要和对象中的键名一致。

在接口`routes/admin/index.js`中实现post接口：

```javascript
const {
  queryAllAdmin,
  addOneAdmin,
  isExistAdmin,
  deleteAdmin
} = require('../service/admin')

// 查询所有的管理员
router.get('/query/all', function (req, res, next) {
  queryAllAdmin()
    .then((data) => {
      new Result(data, 'success', { length: 12 }).success(res)
    })
    .catch((error) => {
      new Result([], 'error', { error: error }).fail(res)
    })
})

// 添加管理员
router.post('/add', function (req, res, next) {
  const admin = req.body
  adminService
    .addAdmin(admin)
    .then((data) => {
      return new Result('success').success(res)
    })
    .catch((error) => {
      return new Result(error, '添加失败').fail(res)
    })
})
```

> 注意：添加成功后到数据库中进行查询验证。

完善逻辑，避免添加重复用户：

`service/admin.js`:

```javascript
function isExistAdmin(login_name) {
  console.log(login_name)
  return DB.queryDB(
    'select  admin_id from t_admin_list where  admin_login_name = ?',
    [login_name]
  )
}
```

````javascript
router.post('/add', function (req, res, next) {
  const admin = req.body
  adminService
    .isExistAdmin(admin.admin_login_name)
    .then((data) => {
      if (data.length != 0) {
        return new Result('登录名重复').fail(res)
      } else {
        adminService
          .addAdmin(admin)
          .then((result) => {
            return new Result('添加成功').success(res)
          })
          .catch((error) => {
            return new Result(error, '添加失败').fail(res)
          })
      }
    })
    .catch((error) => {
      return new Result(error, '添加失败').fail(res)
    })
})
````

##### 删除

`service/admin.js`:

```javascript
// 删除管理员
function deleteAdmin(admin_id) {
  return DB.queryDB(
    'update t_admin_list set admin_is_deleted = 1 where  admin_id = ?',
    admin_id
  )
}
```

`routes/admin/index.js`:

```javascript
const url = require('url')

router.get('/delete', function (req, res, next) {
  let parseObj = url.parse(req.url, true)
  let admin_id = parseObj.query.admin_id
   deleteAdmin(admin_id)
    .then((data) => {
      return new Result('删除成功').success(res)
    })
    .catch((error) => {
      return new Result(error, '删除失败').fail(res)
    })
})
```

> 注意：这里传值我们使用的`get`请求中的路由传参。

`get`请求使用body传值的处理方法：

```javascript
// 删除管理员
router.get('/delete', function (req, res, next) {
  const { admin_id } = req.body
    deleteAdmin(admin_id)
    .then((data) => {
      return new Result('删除成功').success(res)
    })
    .catch((error) => {
      return new Result(error, '删除失败').fail(res)
    })
})
```

## Vue3 + TS

### TS、ES和JS

ES是JS的标准，TS是JS的超集。TS为JS提供了类型系统。

### 安装TypeScript编译器

````bash
npm install -g typescript
````

### 将TS文件编译为JS文件

#### 单个文件编译

1、创建一个`index.ts`文件：

````typescript
class Student {
  name:string;
  age: number;
}

let s1 = new Student()
s1.name = 'Felix'
s1.age = 23
````

2、将ts文件编译为js文件：

````bash
tsc index.ts
# 监控ts的变化进行实时的编译
tsc indx.ts -w 
````

编译后生成同名的`index.js`文件:

```js
var Student = /** @class */ (function () {
  function Student() {}
  return Student
})()
var s1 = new Student()
s1.name = 'Felix'
s1.age = 23
```

> 通过编译后的js文件发现，在js中 ，对`age`和`name`属性没有明确数据类型，在赋值使用时容易发生类型不匹配的问题，但是这种问题只有在js的运行阶段才会被发现。相反，因为TS明确了数据类型，而且如果赋值时数据类型不匹配，将会在编译阶段发生报错。

#### 使用tsconfig.json配置文件编译

在目录下运行下面的命令，生成`tsconfig.json`文件：

````bash
tsc --init
````

`tsconfig.json`的一些基础配置：

```json
{
  // 指明要编译的一个或多个文件
  "files": ["src/index.ts"],
  // 指明要被编译的文件或文件夹
  "include": [
    "src"
  ],
  // 指明不需要被编译的文件或文件夹
  "exclude": [],
   // 编译选项
  "compilerOptions": {
    // 编译后指定的ES版本
    "target": "ES5",
    // 编译后的模块化方案，none, commonjs, amd, system, umd, es20215, es2020 或者ESNext
    "module": "none",
    // 指定编译后的输出目录
    "outDir": "./dist"
  }
}
```

> 在有`tscofig.json`文件的时候，可以直接在项目目录下运行`tsc`编译目录下所有的ts文件 ，无须再指定专门的js文件。

#### tsconfig.json配置全解析

```json
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es6", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [], // 指定要包含在编译中的库文件
    "allowJs": true, // 允许编译 javascript 文件
    "checkJs": true, // 报告 javascript 文件中的错误
    "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true, // 生成相应的 '.d.ts' 文件
    "declarationDir": "./dist/types", // 生成的 '.d.ts' 文件保存文件夹
    "sourceMap": true, // 生成相应的 '.map' 文件
    "outFile": "./", // 将输出文件合并为一个文件
    "outDir": "./dist", // 指定输出目录
    "rootDir": "./", // 用来控制输出目录结构 --outDir.
    "removeComments": true, // 删除编译后的所有的注释
    "noEmit": true, // 不生成输出文件
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "isolatedModules": true, // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true, // 报告switch语句的fallthrough错误。（即，不允许switch的case语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./", // 用于解析非相对模块名称的基础目录
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。
    "esModuleInterop": true, // 支持合成模块的默认导入
  
    /* Source Map Options */
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
  },
  /* 指定编译文件或排除指定编译文件 */
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"],
  "files": ["index.ts", "test.ts"],
  // 从另一个配置文件里继承配置
  "extends": "@tsconfig/recommended",
  // 让 IDE 在保存文件的时候根据 tsconfig.json 重新生成文件
  "compileOnSave": true // 支持这个特性需要Visual Studio 2015， TypeScript 1.8.4 以上并且安装 atom-typescript 插件
}
```

### TS基础

#### TS 优势

* 类型推演与类型匹配
* 开发编译时报错
* 支持最新的ES6/7/8
* 减少低级错的发发生

快速将一个字符串数字转换为数字：

```typescript
const num = '0'
console.log(+num)

console.log(+'1' + 2) // 输出为3
```

#### TypeScript的工作流程

TS 通过`tsc`编译器转换成浏览器能执行的JS。目前，浏览器只支持到**ES5**。

#### 变量声明

TS中有`const`,`let`,`var`三种，我们应该尽可能的避免使用`var`进行声明。

```typescript
var number1 = 1
let number2 = 2
const number3 = 3

function doSomething() {
  for (var i=0;i<5;i++) {
    console.log(i)
  }
  console.log('finally i =',i) // finally i = 5
}
```

> **ES6**中的`var` 存在作用域混乱的问题。

将上面的代码改为：

```typescript
function doSomething() {
  for (let i=0;i<5;i++) {
    console.log(i)
  }
  console.log('finally i =',i) // 报错，提示i无法被找到
}
```

#### TS中的基本类型

* boolean 
* array
* null
* void 
* string 
* tuple 
* undified
* never
* number
* enum 
* object
* any

#### TS  中的高级类型

* union 组合类型
* Nullable 可空类型
* Literal 预定义类型

##### 数组

```typescript
// 数组的三种定义
let list: number[] =[1, 2, 3]
let array:Array<number> = [1, 2, 3]
let list3 = [1, 2, 3]

// 数组支持存放多种类型的数据
let list4 = [1, '2'] // 只能存放数字和字符串
let list5:any[] = [1, '2'] // 可以存放任意类型的数据
```

##### 元组

```typescript
// 固定长度和类型的元组
let person1: [number, string] = [1, 'Felix']
person1[0] = '2' // 类型不正确
person1[1] = 1 // 类型不正确
person1[2] = 2 // 长度不正确
```

> 元组是特殊类型的数组。<span style="color:red">元组的声明必须指定类型</span>。

##### Union与Literal  类型

```typescript
let union : string | number // 这是一个同时支持String和number类型的union
union = 2
union = 'we'

let union2 = string | number | boolean | string[]

// 确定取值范围的联合
let union3: 2 | 3 | 4
union3 = 1 // 报错，超出可赋值的范围

let literal: 2 | 'we' | [1, 5, 3]
```

#####  枚举

```typescript
enum Color {
  red,
  green,
  blue
}
let color = Color.red
console.log(color) // 2，表示枚举中red的索引
```

##### any 和 unknown

```typescript
let randomVlaue:any = 666
randomValue = true
randomValue = 'we'
randomValue = {}
```

##### void、undified与Never

```typescript
function printResult() : void {
  console.log('指定函数的返回值为void')
}

function throwError(message: string, errorCode: number) : never {
  throw {
    message,
    errorCode
  }
}
```

#### 类型适配

```typescript
let message:any = 'absc'
// 将开始申明为any类型的变量转换为明确的String类型
// 方法一
(<string>message).endWitch('c')
// 方法二
(message as string).endWith('c')
```

#### 函数类型

```typescript
// 函数定义的几种方法

let log = function(message) {
  console.log(,essage)
}

let log2 = (message: string) => console.log(message)

// 可选参数，函数调用是可不填
let log3 = (message: string. code?: number) => {
  console.log(message, code)
}

// 给函数参数设置默认值
let log4 = (message: string. code: number = 0) => {
  console.log(message, code)
}

```

> 可选参数和默认参数必须位于函数参数列表的末尾。否则函数将报错。



#### object 对象类型

````typescript
const person = {
  firstName: 'Felix',
  lastName: 'Zhao',
  age:23
}
// 访问对象中不存在的属性，JS不会报错，TS会报错
console.loh(person.nickName)

````

#### 接口

````typescript
let drawPoit =  (point:Point) => {
  console.log(point.x, point.y)
}
console.log(drawPint({x:12, y:34}))

interface Point {
  x: number;
  y: number;
}
````

#### 类

````typescript
interface IPoint {
  x:number;
  y:number;
  drawPoint: () => void;
  getDistances: (point: IPoint) => number
}

class Point implements IPoint {
  x: number;
  y: number;
  // 构造函数，参数可选
  constructor(public x?: number, public y?:number) {
    this.x = x 
    this.y = y 
  }
  drawPoint = () => {
    console.log(x, y)
  }
  getDistances = (p: IPoint) => {
    console.log(p.x - this.x, p.y - this.y)
  }
}

const point = new Point()

````

#### 访问修饰符

```typescript
class Point implements IPoint {
  constructor(public x?: number, public y?:number) {
  }
  drawPoint = () => {
    console.log(x, y)
  }
  getDistances = (p: IPoint) => {
    console.log(p.x - this.x, p.y - this.y)
  }
  // 给x添加读写访问修饰
  set X(value:number) {
    if (value < 0) {
      throw new Error('value 不能小于0')
    }
    this.x = value
  }
  
  get X() {
    return this.x
  }
}

```

#### 泛型

```typescript
let lastInArray = <T>(arr: T[]) => {
  retutn arr[arr.length - 1]
}

let makeTuple = <T, Y>[x: T, y: Y] = [x, y]

// 设置泛型的默认类型
let makeTuple = <T, Y = numbber>[x: T, y: Y] = [x, y]
```

#### TS中的模块

##### 模块导出

`common.ts`文件：

```typescript
// 导出常量
export const a: number = 1
// 导出函数
export function sum(a:number, b: number): number {
  return a + b
}

function minus(a:number, b: number): number {
  return a - b
}
// 默认导出
export default minus
```

同时导出多个对象：

```typescript
// 导出常量
const a: number = 1
// 导出函数
function sum(a:number, b: number): number {
  return a + b
}

function minus(a:number, b: number): number {
  return a - b
}
export {a, sum, minus}
```



##### 模块导入

`index.ts`文件：

```typescript
import minus, {sum, a} from "./common";
let m = minus(5, 6)
let total = sum(a, 7)
```

同时导入多个对象：

```typescript
// 导入所有对象并把他们放入一个单独的命名空间
import * as common from './common'

let total = common.sum(2,3)
let m = common.default(common.a, 3)
```

##### 不同模块处理对比

###### ES6

`common.js`

````typescript
// 导出常量
export var a = 1;
// 导出函数
export function sum(a, b) {
    return a + b;
}
function minus(a, b) {
    return a - b;
}
// 默认导出
export default minus;
````

`index.js`

```typescript
import minus, { sum, a } from "./common";
var m = minus(5, 6);
var total = sum(a, 7);
```

###### commonjs

`common.js`

```typescript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = exports.a = void 0;
// 导出常量
exports.a = 1;
// 导出函数
function sum(a, b) {
    return a + b;
}
exports.sum = sum;
function minus(a, b) {
    return a - b;
}
// 默认导出
exports.default = minus;
```

`index.js`

```typescript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var m = (0, common_1.default)(5, 6);
var total = (0, common_1.sum)(common_1.a, 7);
```

### Vue3基础

#### Vue脚手架安装

[Vue CLI 地址](https://cli.vuejs.org/zh/index.html)

npm全局安装：

```bash
npm install -g @vue/cli
```

测试是否安装成功：

```bash
vue -V
```

or 

```bash
vue --version
```

````bash 
@vue/cli 5.0.4
````

#### 创建Vue3项目

````bash
vue create vue3_base
````

Vue-cli 4中Vue版本默认Vue2，在 Vue-cli 5.0中使用Vue3作为默认的版本。

选择手动项目配置，选择TypeScript和项目格式化工具。

#### 实现计数功能

##### 使用Vue2的方式

1、HTML

````html
 <div>
    <button @click="minus">-</button>
    <span>{{ counter }}</span>
    <button @click="plus">+</button>
  </div>
````

2、js

````js
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  data() {
    return {
      counter: 1
    }
  },
  methods: {
    minus() {
      this.counter -= 1
    },
    plus() {
      this.counter += 1
    }
  }
})
````

##### 使用setup实现 

```typescript
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    // 创建一个number类型的响应式对象
    var counter = ref<number>(1)
    let minus = () => {
      counter.value -= 1
    }
    let plus = () => {
      counter.value += 1
    }
    // 此处返回的内容，可以在其余的任意部分使用
    return { counter, minus, plus }
  }
})
```

##### 使用语法糖优化代码

````typescript
<script lang="ts" setup>
import { ref } from 'vue'
var counter = ref<number>(0)
function minus() {
  counter.value -= 1
}
function plus() {
  counter.value += 1
}
</script>
````

> 注意：需要在在<script>标签中添加`setup`关键字。

#### 响应式数据

##### Ref

**ref**: 接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 `.value` property，指向该内部值。

```ts
var counter: Ref<number> = ref(0)
// 或者
var counter = ref<number>(0)
// 以及
var counter = ref(0)
```

**unref**:如果参数是一个 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 的语法糖函数。

````typescript
console.log(unref(counter))
// 等价于
console.log(isRef(counter) ? counter.value : counter)
````

