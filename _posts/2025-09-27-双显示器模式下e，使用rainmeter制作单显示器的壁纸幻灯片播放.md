---
layout: post
title: "双显示器模式下，使用rainmeter制作的副屏定时切换壁纸"
date: 2025-09-27 11:42:35 +0800
category: RainMeter
---
摘要：正如彼梦会醒来一般，此梦也终有梦醒之时。 ---芥川龙之介-

## 固定的壁纸组

### 原理  

Rainmeter 可以实现在桌面渲染图片，并且设置定时更新要展示的图片文件，基于这个原理我们可以实现在文件夹下同时放置多张图片文件，并设置一定的时间间隔来实现幻灯片式的放映。(实际上基于这个原理甚至可以实现动态壁纸的播放，只需要将一个视频拆分成多张壁纸，并设置适当的图片更新时间间隔)  

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

## 利用网络API制作定时切换的随机壁纸  

### 原理  

- 1.制作获取壁纸文件存放到本地的python脚本
- 2.RainMeter定时更新，更新时执行调用脚本和刷新壁纸操作

### python脚本获取壁纸


```python
import requests
import sys
def download_image(url, file_path):
   response = requests.get(url)
   if response.status_code == 200:
       with open(file_path, 'wb') as file:
           file.write(response.content)
       print(f"图片下载成功: {file_path}")
   else:
       print(f"无法从 {url} 获取图片")
   sys.exit()

image_url = "https://t.alcy.cc/mp" # 获取随机图片的API
save_file = "filepath.webp" # 存放文件的路径
download_image(image_url, save_file)
```

### 编辑调用python代码的脚本

为了避免在脚本被调用时屏幕上出现cmd命令窗口（影响观感），使用vbs->bat->py的调用方式  

bat文件
```bat
@echo off 
python "filepath.py"
```
- @echo off: 让命令不在窗口中显示

vbs文件

```vbs
' run.vbs
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "filepath.bat", 0
```
- Set WshShell = CreateObject("WScript.Shell")：创建 Shell 对象，这个对象用来执行我们指定的命令。  
- WshShell.Run "filepath.bat", 0 : 参数0表示以隐藏窗口的方式运行。

### rainmeter 代码实现

```ini
[Metadata]
Name= changeBG
Author= NothingWork
Information= change your bg based on time
License= Noday
Version= 2.0

[Rainmeter]
update=600000 ; 更新间隔时间(单位：ms)

[main]
meter=image
imagename=0.webp
dynamicVariables=1
OnUpdateAction=!Execute ["filepath.vbs"] ; 这里指向vbs文件，会在更新时调用执行
W=864
H=1536


```