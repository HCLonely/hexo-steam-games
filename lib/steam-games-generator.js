const ejs = require('ejs');
const path = require('path');
const fs = require('hexo-fs');
const i18n = require('./util').i18n;
const log = require('hexo-log')({
    debug: false,
    silent: false
});

function generatePage(globalConfig, root, config = {}) {
    let games = [];
    if (!fs.existsSync(path.resolve(__dirname, `../data/${config.id || globalConfig.steam.steamId}.json`))) {
        log.info(`Can't find steam game data, please use 'hexo steam -u' command to get data`);
    } else {
        games = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/${config.id || globalConfig.steam.steamId}.json`))).slice(0, config.length || globalConfig.length || 1000);
        log.info(games.length + ' games have been loaded');
    }

    let __ = i18n.__(globalConfig.language);

    let contents = '';
    ejs.renderFile(path.join(__dirname, 'templates/games.ejs'), {
        'quote': config.quote || globalConfig.steam.quote,
        'steamId': config.id || globalConfig.steam.steamId,
        'imgUrl': config.imgUrl || globalConfig.steam.imgUrl,
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
        path: config.path || globalConfig.steam.path || (config.id ? `steamgames/${config.id}/index.html` : 'steamgames/index.html'),
        data: {
            title: config.title || globalConfig.steam.title,
            content: contents,
            ...globalConfig.steam.extra_options,
            ...config.extra_options
        },
        layout: ['page', 'post']
    };
}
module.exports = async function (locals) {

    let config = this.config;
    if (!config.steam || !config.steam.enable) {
        return;
    }

    let root = config.root;
    if (root.endsWith('/')) {
        root = root.slice(0, root.length - 1);
    }

    if (config.steam.steamId) {
        return generatePage(config, root);
    }
    if (config.steam.steamInfos) {
        return config.steam.steamInfos.map((steamInfo) => generatePage(config, root, steamInfo));
    }

};
