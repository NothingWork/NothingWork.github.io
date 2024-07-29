---
layout: post
title: "如何使用docker搭建一个简单的hadoop集群"
date: 2024-07-29 13:38:00 +0800
category: hadoop
---
摘要：搭建一个hadoop集群需要多台主机之间同时在线，而同时使用多台虚拟机对一台普通配置的笔记本还是有点勉强。
此时使用多个docker容器既可以减少需求的主机资源，又可以面取重复配置的过程。

## 准备一个配置完成的hadoop镜像

这里的配置包括必须的软件环境：java、ssh、hadoop。
并且要保证hadoop内的各个配置文件需要正确配置。
参考站内文章[hadoop的学习记录](https://nothingwork.github.io/hadoop%E7%9A%84%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95)

## 搭建docker网络

为了我们用docker搭建的多台主机处于同一局域网内，我们需要事先搭建一个docker网络

```ssh
docker network create --subnet=172.20.0.0/16 hnet
```

## 启动多个容器

有了之前配置好的hadoop镜像，我们这里就可以直接以这个镜像启动斗个多个容器（一主二从）。

```ssh
docker run -d --name=nn --network=hnet --ip=172.20.1.1 -p 9870:9870 -p 8088:8088 --privileged cluster_proto /usr/sbin/init
docker run -d --name=dn1 --network=hnet --ip=172.20.1.2 --privileged cluster_proto /usr/sbin/init
docker run -d --name=dn2 --network=hnet --ip=172.20.1.3 --privileged cluster_proto /usr/sbin/init
```

需要注意的是，我们在启动namenode容器时将端口9870和8088进行了映射，那么后续只需要访问宿主机的主机地址即可以进入hadoop提供的web页面。

***思路更新***
既然我们已经有一台主机，那么我们可以将这台主机作为集群当中的nn(namenode)节点主机，使用docker创建的容器作为从机。
这样，我们就可以省去配置端口映射的问题，并且后续的hive等的配置也可以只在我们的主机上进行修改配置即可。

## 配置ssh免密登录

首先进入dn1容器，生成ssh密钥后，将密钥发至dn1,dn2两台机器。

```ssh
ssh-keygen  -这里一路回车就行
ssh-copy-id hadoop@dn1
ssh-copy-id hadoop@dn2
```

## 格式化并启动

```ssh
hdfs namenode -format
start-dfs.sh
```

此时访问9870端口即可看到我们配置好的hadoop集群
