---
layout: post
title: "Rainmeter播放gif"
date: 2026-02-04 21:17:37 +0800
category: RainMeter
---
摘要：没关系，你不必喜欢自己的全部过去，也不必释怀。你只需要知道，过去的作用是把你带到现在，这就够了。 ---约翰·史崔勒基-

## 原理解析
Rainmeter本身并不支持gif或者视频的播放，但我们可以把一张gif分作多张图片，之后循环播放切分好的图片，便可以实现动态播放的效果  

## 主要代码


```ini
[Variables]
sumpic=24
sleep=100

;folder=pic

[rainmeter]
update=#sleep#

[Metadata]
Name=
Author=
Information=
License=
Version=

[main]
meter=image
imagename=[picNumber].jpg
dynamicVariables=1
W=200
H=200
;imagealpha=100
[picNumber]
measure=calc
formula=([picNumber]+1)%#sumpic#
dynamicvariables=1
```
图片与ini放在同一文件夹下即可
