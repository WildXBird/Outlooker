# 在Cloudflare搭建Workers

## 创建Workers

```
没有 Cloudflare 账号的提前注册一个
```

打开 https://dash.cloudflare.com ，登录上你的 Cloudflare 账号  
Cloudflare 支持中文，可以在右上角切换。  
点击右侧的  
```
Workers
构建无服务器应用程序。
```

然后点击 创建 Worker  
Cloudflare可能会要求你自定义一个子域名称  
在脚本编写区域粘贴上面的“main.js”里面的代码  
  
点击保存并部署  
  
此时网页上方会显示你的 Workers 地址  
  
在 Workers 地址后面加上 “/-----” 就可以铁道Outlook里面使用了  
  
看起来就像是这样  
```
https://outlooker-proxy.cloudflare-alwaysonline.workers.dev/-----
```