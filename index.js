const fs = require('hexo-fs');
const log = require('hexo-log')({
    debug: false,
    silent: false
});
const axios = require('axios');
const cheerio = require('cheerio');
hexo.extend.generator.register('steamgames', function (locals) {
    if (!this.config.steam || !this.config.steam.enable) {
        return;
    }
    return require('./lib/steam-games-generator').call(this, locals);
});
hexo.extend.console.register('steam update', 'Generate pages from steamgames', function (args) {
    if (!this.config.steam || !this.config.steam.enable){
        log.info("Please add config to _config.yml");
        return;
    }
    if (!this.config.steam.steamId){
        log.info("Please add steamId to _config.yml");
        return;
    }
    updateSteamGames(this.config.steam.steamId, this.config.steam.tab ||"recent",this.config.steam.length);
});

function updateSteamGames(steamId, tab,length){
    log.info("Getting steam games, please wait...");
    let options={
        method: "GET",
        url: `https://steamcommunity.com/profiles/${steamId}/games/?tab=${tab}`,
        timeout: 0,
        responseType: "text",
        headers:{
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36"
        }
    };

    axios(options).then(response=>{
        if(response.status===200){
            let $ = cheerio.load(response.data);
            let script = $('script[language="javascript"]');
            var games=[];
            for (let i = 0; i < script.length;i++){
                if (script.eq(i).html().includes("rgGames")){
                    let rgGames = script.eq(i).html().match(/var.*?rgGames.*?=.*?(\[[\w\W]*?\}\}\]);/);
                    if (rgGames){
                        games = JSON.parse(rgGames[1]);
                        break;
                    }
                }
            }
            fs.writeFile("./data/games.json", JSON.stringify(games.slice(0,length||1000)),err=>{
                if(err){
                    log.info("Failed to write data to games.json");
                    console.log(err);
                }else{
                    log.info("Get steam games: complete!");
                }
            });
        }
    }).catch(error=>{
        console.log(error);
    });
}