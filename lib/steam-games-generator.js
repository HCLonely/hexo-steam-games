const ejs = require('ejs');
const path = require('path');
const fs = require('hexo-fs');
const i18n = require('./util').i18n;
const log = require('hexo-log')({
    debug: false,
    silent: false
});

module.exports = async function (locals) {

    let config = this.config;
    if (!config.steam || !config.steam.enable) {
        return;
    }

    let root = config.root;
    if (root.endsWith('/')) {
        root = root.slice(0, root.length - 1);
    }

    let games=[];
    if (!fs.existsSync(path.resolve(__dirname, '../data/games.json'))) {
        log.info(`Can't find steam game data, please use 'hexo steam -u' command to get data`);
    }else{
        games = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/games.json'))).slice(0, config.length || 1000);
        log.info(games.length + ' games have been loaded');
    }

    let __ = i18n.__(config.language);

    let contents = '';
    ejs.renderFile(path.join(__dirname, 'templates/games.ejs'), {
        'quote': config.steam.quote,
        'steamId': config.steam.steamId,
        'imgUrl': config.steam.imgUrl,
        'games': games,
        '__': __,
        'root': root
    },
        function (err, result) {
            if (err) console.log(err);
            contents = result;
            return result;
        });

    return {
        path: config.steam.path || 'steamgames/index.html',
        data: {
            title: config.steam.title,
            content: contents,
            ...config.steam.extra_options
        },
        layout: ['page', 'post']
    };
};
