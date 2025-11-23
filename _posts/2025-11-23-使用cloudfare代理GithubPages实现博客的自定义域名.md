---
layout: post
title: "使用cloudfare代理GithubPages实现博客的自定义域名"
date: 2025-11-23 11:59:24 +0800
category: CloudFare
---
摘要：人生就像是在每一个瞬间不停旋转起舞的连续的刹那。在舞蹈中，跳舞本身就是目的，最终会跳到哪里谁都不知道。 ---岸见一郎-

  Github pages 默认使用仓库名+github.io作为网站的访问域名。如果想要使用自己的域名，可以在仓库的设置页面设置自己的域名，同时使用CloudFare进行代理，这样还可以加快网站在国内的访问速度  
  同时需要注意的是，CloudFare的默认访问规则为灵活，这样会导致github自动部署的SSL证书异常，可以在CloudFare页面为网站设置SSL规则规则为完全(Full)，这样就可以就可以解决问题  
   {% include img.html src="/cloudfare/1.jpg" alt="cloudfare规则设定" %}
  URL的最后一定要加上 /* 这样才能保证网站内的图标、样式等资源可以正常被cloudfare代理