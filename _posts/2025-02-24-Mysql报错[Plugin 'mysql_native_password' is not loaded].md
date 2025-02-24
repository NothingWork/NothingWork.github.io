---
layout: post
title: "Mysql报错[Plugin 'mysql_native_password' is not loaded]"
date: 2025-02-24 13:28:53 +0800
category: mysql
---
摘要：在登录mysql时发生 ***Plugin 'mysql_native_password' is not loaded*** 报错，MySQL 8.4(截至 2024 年的最新 LTS 版本)中引入的一个主要变化是，默认情况下不再启用 “MySQL Native Password” 插件。  
此更改会影响使用 MySQL 数据库和 mysql_native_password 身份验证插件的 PHP 和其他应用。由于默认情况下不再加载 mysql_native_password 插件，因此导致 PHP PDO/MySQLi 连接失败。  
当尝试使用不再加载的 mysql_native_password 插件连接到数据库时，PDO/MySQLi 抛出 MySQL 返回的错误：

## 查看用户认证使用插件

```sql
SELECT user, host, plugin from mysql.user;
```

## 更改认证插件

```sql
ALTER USER '<USERNAME>'@'<HOST>' IDENTIFIED WITH caching_sha2_password BY '<PASSWORD>';
```
