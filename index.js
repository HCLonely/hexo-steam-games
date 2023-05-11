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
        if (!this.config.steam.steamId && !this.config.steam.steamInfos) {
            log.info("Please add steamId/steamInfos to _config.yml");
            return;
        }
        if (!this.config.steam.apiKey) {
            log.info("Please add apiKey to _config.yml");
            return;
        }
        if (this.config.steam.steamId) {
            updateSteamGames(this.config.steam.steamId, this.config.steam.apiKey, this.config.steam.tab, this.config.steam.length, this.config.steam.proxy, this.config.steam.freeGames);
        } else if (this.config.steam.steamInfos) {
            this.config.steam.steamInfos.forEach(steamInfo => {

                updateSteamGames(steamInfo.id, this.config.steam.apiKey, steamInfo.tab || this.config.steam.tab, steamInfo.length || this.config.steam.length, steamInfo.proxy || this.config.steam.proxy, steamInfo.freeGames || this.config.steam.freeGames);
            });
        }
    } else {
        console.error("Unknown command, please use \"hexo bangumi -h\" to see the available commands")
    }
});

function updateSteamGames(steamId, apiKey, tab = "recent", length = 1000, proxy = false, freeGames = false) {
    log.info(`Getting steam(${steamId}) games, please wait...`);
    let options = {
        method: "GET",
        url: `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=true${freeGames ? '&include_played_free_games=true' : ''}`,
        timeout: 30 * 60 * 1000,
        responseType: "json",
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
            const games = (tab == 'recent') ? response.data.response.games.sort((a, b) =>
                b.rtime_last_played - a.rtime_last_played
            ) : response.data.response.games;
            if (games.length === 0) {
                log.error('No game data obtained.')
                return;
            }
            if (!fs.existsSync(path.join(__dirname, "/data/"))) {
                fs.mkdirsSync(path.join(__dirname, "/data/"));
            }
            let gameData = games.slice(0, length);
            fs.writeFile(path.join(__dirname, `/data/${steamId}.json`), JSON.stringify(gameData), err => {
                if (err) {
                    log.info(`Failed to write data to ${steamId}.json`);
                    console.log(err);
                } else {
                    log.info(`${gameData.length} games(${steamId}) data are saved.`);
                }
            });
        } else {
            console.error('ERROR: ' + response.status)
        }
    }).catch(error => {
        console.log(error);
    });
}
