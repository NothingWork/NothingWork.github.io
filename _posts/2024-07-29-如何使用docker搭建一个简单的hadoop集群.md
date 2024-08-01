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

有了之前配置好的hadoop镜像，我们这里就可以直接以这个镜像启动多个容器（一主二从）。

```ssh
docker run -d --name=nn  --hostname=nn --network=hnet --ip=172.20.1.0  --privileged --add-host=dn1:172.20.1.1 --add-host=dn2:172.20.1.2 cluster_proto /usr/sbin/init 

docker run -d --name=dn1 --hostname=dn1  --network=hnet --ip=172.20.1.1 --privileged --add-host=nn:172.20.1.0 --add-host=dn2:172.20.1.2 cluster_proto /usr/sbin/init 

docker run -d --name=dn2 --hostname=dn2  --network=hnet --ip=172.20.1.2 --privileged --add-host=nn:172.20.1.0 --add-host=dn1:172.20.1.1 cluster_proto /usr/sbin/init
```

## 格式化并启动

```ssh
hdfs namenode -format
start-all.sh
```

## 添加端口映射

因为我们需要访问namenode所在容器的端口来使用hadoop的服务，所以我们可以通过防火墙，将容器的端口转发至宿主机中

```ssh
iptables -t nat -A DOCKER -p tcp --dport 宿主机端口 -j DNAT --to-destination 容器ip:容器端口
iptables-save  -保存

```

此时访问9870端口即可看到我们配置好的hadoop集群
