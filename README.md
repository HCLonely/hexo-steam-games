# hexo-steam-games

![](https://nodei.co/npm/hexo-steam-games.png?downloads=true&downloadRank=true&stars=true)

## 介绍

**为Hexo添加Steam游戏库页面**.

[Demo](https://demo.hclonely.com/steamgames/)

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
  apiKey: '*****' #steam api key
  steamInfos: # 多账号配置
    - id: '*****' #steam 64位Id
      path: # 为每个帐号游戏库单独配置页面路径，默认`steamgames/{steamId}/index.html`
      ... # 兼容以下配置项
    - id: '*****'
      ...
  freeGames: true
  path:
  title: Steam游戏库
  quote: '+1+1+1+1+1'
  tab: recent
  length: 1000
  imgUrl: '*****'
  proxy:
    host:
    port:
  extra_options:
    key: value
```

- **enable**: 是否启用
- **apiKey**: Steam 网页 API Key(新版需要API Key才能获取到游戏信息，[点此](https://steamcommunity.com/dev/apikey)注册 API Key)，或者手动获取游戏库数据
- **steamId**: steam 64位Id(需要放在引号里面，不然会有BUG), ***需要将steam库设置为公开！***
- **steamInfos**: 多账号配置
- **path**: 游戏页面路径，默认`steamgames/index.html`
- **title**: 该页面的标题
- **quote**: 写在页面开头的一段话,支持html语法
- **tab**: `all`或`recent`, `all: 所有游戏`, `recent: 最近游玩的游戏`
- **length**: 要显示游戏的数量，游戏太多的话可以限制一下
- **imgUrl**: 图片链接，在`quote`下面放一张图片，图片链接到Steam个人资料，可留空
- **proxy**: 如果无法访问steam社区的话请使用代理
  - **host**: 代理ip或域名
  - **port**: 代理端口
- **extra_options**: 此配置会扩展到Hexo的`page`变量中

## 使用

1. 在`hexo generate`或`hexo deploy`之前使用`hexo steam -u`命令更新steam游戏库数据！
2. 删除游戏库数据指令:`hexo steam -d`

## 手动获取游戏库数据

如果`hexo steam -u`命令一直获取游戏库数据失败，可以用一下方法手动获取游戏库数据：

1. 浏览器打开`https://steamcommunity.com/profiles/{steamId}/games?tab={tab}`, `{steamId}`和`{tab}`分别替换为上面配置中提到的`steamId`和`tab`
2. 网页加载完成后，打开浏览器控制台(按`F12`)，输入以下代码并回车：

    ```
    const data = document.querySelector('#gameslist_config').getAttribute('data-profile-gameslist');
    const games = JSON.parse(data.replace(/\n/g, '')).rgGames;
    document.write(JSON.stringify(games).replace(/\n/g, ''));
    ```

3. 将生成的内容复制到`博客根目录/node_modules/hexo-steam-games/data/games.json`文件内，如果没有对应的文件或目录，请自行创建

## 示例

![示例图片](https://github.com/HCLonely/hexo-steam-games/raw/master/example1.png)
![示例图片](https://github.com/HCLonely/hexo-steam-games/raw/master/example2.png)

## Lisense

[Apache Licence 2.0](https://github.com/HCLonely/hexo-steam-games/blob/master/LICENSE)
