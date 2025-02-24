#!/bin/bash
# 使用方法：sh blog.sh [文章名] [分类名]
current_date=$(date +"%Y-%m-%d")
current_time=$(date +"%Y-%m-%d %H:%M:%S") 
file_name="$1"
file_category="$2"
filePath="_posts/$current_date-$file_name.md"
# 检查是否传入了两个参数
if [ "$#" -ne 2 ]; then
    echo "传入参数过多"
    exit 1
fi

# 检查文件重名
if [ -e "$filePath" ] 
then
    echo "文件名重复!!!"
elif (( $# != 2 )) 
then
    echo "缺少文章名或文章分类!!!"
else
    touch "$filePath"  #创建
    # 写入内容
    echo -e "---
layout: post
title: \"$file_name""\"
date: $current_time +0800
category: "$file_category"
---
摘要：" >"$filePath"
    code "$filePath"  # 打开
    echo "创建成功"
fi
