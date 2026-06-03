const assert = require('assert');
const generator = require('../lib/steam-games-generator');

async function renderSteamPage(steamConfig) {
    const result = await generator.call({
        source_dir: __dirname,
        config: {
            root: '/',
            language: 'zh-CN',
            steam: {
                enable: true,
                steamId: '76561198000000000',
                title: 'Steam Games',
                ...steamConfig
            }
        }
    });

    return result.data.content;
}

(async function () {
    const lightContent = await renderSteamPage({ theme: 'light' });
    assert(
        lightContent.includes('steam-games-theme-light'),
        'expected light theme config to render steam-games-theme-light class'
    );

    const darkContent = await renderSteamPage({});
    assert(
        darkContent.includes('steam-games-theme-dark'),
        'expected missing theme config to default to steam-games-theme-dark class'
    );
})();
