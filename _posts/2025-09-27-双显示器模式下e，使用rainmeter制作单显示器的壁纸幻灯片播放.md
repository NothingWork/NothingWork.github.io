---
layout: post
title: "双显示器模式下e，使用rainmeter制作单显示器的壁纸幻灯片播放"
date: 2025-09-27 11:42:35 +0800
category: RainMeter
---
摘要：正如彼梦会醒来一般，此梦也终有梦醒之时。 ---芥川龙之介-

### 原理  

Rainmeter 可以实现在桌面渲染图片，并且设置定时更新要展示的图片文件，基于这个原理我们可以实现在文件夹下同时放置多张图片文件，并设置一定的时间间隔来实现幻灯片式的放映。(实际上基于这个原理甚至可以实现动态壁纸的播放，只需要将一个视频拆分成多张突破吗，并设置适当的图片更新时间间隔)  

### 代码实现  

```ini
--- ini文件
--- 图片文件和代码文件放在同一文件夹下即可
--- 图片文件命名遵循0.jpg,1.jpg,2.jpg....
[Variables]
sumpic=24  --图片总数
sleep=2000  --切换时间间隔

[rainmeter]
update=#sleep#

[Metadata]
Name= changeBG
Author= NothingWork
Information= change your bg based on time
License= Noday
Version= 1.0

[main]
meter=image
imagename=[picNumber].jpg
dynamicVariables=1 --启用动态变量
W=1080
H=1920
[picNumber]
measure=calc -- 规定数字的变换只基于简单的计算
formula=([picNumber]+1)%#sumpic#
dynamicVariables=1
```
