const fs = require('hexo-fs');
const path = require('path');
const log = require('hexo-log')({
    debug: false,
    silent: false
});
const axios = require('axios-https-proxy-fix');
const cheerio = require('cheerio');

let options = {
    options: [
        { name: '-u, --update', desc: 'Update steam games data' },
        { name: '-d, --delete', desc: 'Delete steam games data' }
    ]
};

hexo.extend.generator.register('steamgames', function (locals) {
    if (!this.config.steam || !this.config.steam.enable) {
        return;
    }
    return require('./lib/steam-games-generator').call(this, locals);
});
hexo.extend.console.register('steam', 'Update steam games data', options, function (args) {
    if (args.d) {
        if (fs.existsSync(path.join(__dirname, "/data/"))) {
            fs.rmdirSync(path.join(__dirname, "/data/"));
            log.info('Steam games data has been deleted');
        }
    } else if (args.u) {
        if (!this.config.steam || !this.config.steam.enable) {
            log.info("Please add config to _config.yml");
            return;
        }
        if (!this.config.steam.steamId) {
            log.info("Please add steamId to _config.yml");
            return;
        }
        updateSteamGames(this.config.steam.steamId, this.config.steam.tab, this.config.steam.length, this.config.steam.proxy);
    } else {
        console.error("Unknown command, please use \"hexo bangumi -h\" to see the available commands")
    }
});

function updateSteamGames(steamId, tab = "recent", length = 1000, proxy = false) {
    log.info("Getting steam games, please wait...");
    let options = {
        method: "GET",
        url: `https://steamcommunity.com/profiles/${steamId}/games/?tab=${tab}`,
        timeout: 30 * 60 * 1000,
        responseType: "text",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36"
        }
    };
    if (proxy && proxy.host && proxy.port) {
        options.proxy = {
            host: proxy.host,
            port: proxy.port
        };
    }
    axios(options).then(response => {
        if (response.status === 200) {
            let $ = cheerio.load(response.data);
            let script = $('script[language="javascript"]');
            var games = [];
            for (let i = 0; i < script.length; i++) {
                if (script.eq(i).html().includes("rgGames")) {
                    let rgGames = script.eq(i).html().match(/var.*?rgGames.*?=.*?(\[[\w\W]*?\}\}\]);/);
                    if (rgGames) {
                        games = JSON.parse(rgGames[1]);
                        break;
                    }
                }
            }
            if (games.length === 0) {
                log.error('No game data obtained.')
                return;
            }
            if (!fs.existsSync(path.join(__dirname, "/data/"))) {
                fs.mkdirsSync(path.join(__dirname, "/data/"));
            }
            let gameData = games.slice(0, length);
            fs.writeFile(path.join(__dirname, "/data/games.json"), JSON.stringify(gameData), err => {
                if (err) {
                    log.info("Failed to write data to games.json");
                    console.log(err);
                } else {
                    log.info(gameData.length + "game data are saved.");
                }
            });
        } else {
            console.error('ERROR: ' + response.status)
        }
    }).catch(error => {
        console.log(error);
    });
}