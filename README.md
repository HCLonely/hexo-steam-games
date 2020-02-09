# hexo-steam-games

![](https://nodei.co/npm/hexo-steam-games.png?downloads=true&downloadRank=true&stars=true)

## 介绍

**为Hexo添加Steam游戏库页面**

## 安装

```bash
$ npm install hexo-steam-games --save
```

------------

## 配置

将下面的配置写入站点的配置文件 `_config.yml` 里(不是主题的配置文件).

``` yaml
steam:
  enable: true
  steamId: '*****' #steam 64位Id
  title: Steam游戏库
  quote: '+1+1+1+1+1'
  tab: recent
  length: 1000
  proxy:
    host:
    port:
```

- **enable**: 是否启用
- **steamId**: steam 64位Id(需要放在引号里面，不然会有BUG), ***需要将steam库设置为公开！***
- **title**: 该页面的标题
- **quote**: 写在页面开头的一段话,支持html语法
- **tab**: `all`或`recent`, `all: 所有游戏`, `recent: 最近游玩的游戏`
- **length**: 要显示游戏的数量，游戏太多的话可以限制一下
- **proxy**: 如果无法访问steam社区的话请使用代理
  - **host**: 代理ip或域名
  - **port**: 代理端口

## 使用

1. 前往你的 Hexo 博客的根目录
2. 输入`hexo new page steamgames`
3. 你会找到`source/steamgames/index.md`这个文件
4. 修改这个文件，添加`type: "steamgames"`：

```markdown
---
title: steamgames
date: 2018-01-05 00:00:00
type: "steamgames"
---
```

5. 防止请求次数过多插件不会自动获取steam游戏库数据，所以请根据自己的需要在`hexo generate`或`hexo deploy`之前使用`hexo steam update`命令更新steam游戏库数据！


## 示例

![示例图片](https://github.com/HCLonely/hexo-steam-games/raw/master/example.png)

## Lisense

[MIT](https://github.com/HCLonely/hexo-steam-games/blob/master/LICENSE)
