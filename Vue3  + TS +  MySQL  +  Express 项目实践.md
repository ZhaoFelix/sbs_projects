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

### 