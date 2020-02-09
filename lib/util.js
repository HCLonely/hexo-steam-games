'use strict';

const I18N = require('hexo-i18n');

let i18n = new I18N({
    languages: ['zh-CN', 'en']
});

i18n.set('en', {
    game: 'Game',
    prev: 'Prev',
    next: 'Next',
    top: 'Top',
    end: 'End'
});

i18n.set('zh-TW', {
    game: '遊戲',
    prev: '上一頁',
    next: '下一頁',
    top: '首頁',
    end: '尾頁'
});

i18n.set('zh-Hans', {
    game: '游戏',
    prev: '上一页',
    next: '下一页',
    top: '首页',
    end: '尾页'
});

i18n.set('zh-CN', {
    game: '游戏',
    watching: '在看',
    prev: '上一页',
    next: '下一页',
    top: '首页',
    end: '尾页'
});

module.exports.i18n = i18n;