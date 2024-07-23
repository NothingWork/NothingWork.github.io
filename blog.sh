#!/bin/bash
current_date=$(date +"%Y-%m-%d")
current_time=$(date +"%Y-%m-%d %H:%M:%S") 
file_name=$1
file_category=$2
filePath="_posts/$current_date-$file_name.md"
# 检查文件重名
if [ -e $filePath ] 
then
    echo "文件名重复!!!"
elif (( $# != 2 )) 
then
    echo "缺少文章名或文章分类!!!"
else
    touch $filePath  #创建
    # 写入内容
    echo -e "---
layout: post
title: \"$file_name\"
date: $current_time +8000
category: $file_category
---" >$filePath
    code $filePath  # 打开
    echo "创建成功"
fi
