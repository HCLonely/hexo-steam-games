'use strict';

const I18N = require('hexo-i18n');

let i18n = new I18N({
    languages: ['zh-CN', 'zh-TW', 'zh-TW', 'en']
});

i18n.set('en', {
    storePage:'Store Page',
    forums:'Forums',
    groups:'Find Community Groups',
    website:'Official Website',
    news:'Related news',
    totalHours:'%1$s hrs on record',
    game: 'Game',
    prev: 'Prev',
    next: 'Next',
    top: 'Top',
    end: 'End'
});

i18n.set('zh-TW', {
    storePage: '商店頁面',
    forums: '討論區',
    groups: '尋找社群群組',
    website: '官方網站',
    news: '相關新聞',
    totalHours: '總時數 %1$s 小時',
    game: '遊戲',
    prev: '上一頁',
    next: '下一頁',
    top: '首頁',
    end: '尾頁'
});

i18n.set('zh-Hans', {
    storePage: '商店页面',
    forums: '论坛',
    groups: '查找社区组',
    website: '官方网站',
    news: '相关新闻',
    totalHours: '总时数 %1$s 小时',
    game: '游戏',
    prev: '上一页',
    next: '下一页',
    top: '首页',
    end: '尾页'
});

i18n.set('zh-CN', {
    storePage: '商店页面',
    forums: '论坛',
    groups: '查找社区组',
    website: '官方网站',
    news: '相关新闻',
    totalHours: '总时数 %1$s 小时',
    game: '游戏',
    prev: '上一页',
    next: '下一页',
    top: '首页',
    end: '尾页'
});

module.exports.i18n = i18n;
