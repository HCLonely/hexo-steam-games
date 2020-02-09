Element.prototype.siblings = function () {
    let siblingElement = [];
    let sibs = this.parentNode.children;
    for (let i = 0; i < sibs.length; i++) {
        if (sibs[i] !== this) {
            siblingElement.push(sibs[i]);
        }
    }
    return siblingElement;
};
function tabClick() {
    //修改标签样式
    this.classList.add('steam-game-active');
    let sibs = this.siblings();
    for (let j = 0; j < sibs.length; j++) {
        sibs[j].classList.remove('steam-game-active');
    }
    //显示对应板块
    let itemId = this.id.replace('tab', 'item');
    let target = document.getElementById(itemId);
    target.classList.remove('steam-game-hide');
    target.classList.add('steam-game-show');
    sibs = document.getElementById(itemId).siblings();
    for (let k = 0; k < sibs.length; k++) {
        sibs[k].classList.remove('steam-game-show');
        sibs[k].classList.add('steam-game-hide');
    }
}
let tabs = document.getElementsByClassName("steam-game-tab");
for (let i = 0; i < tabs.length; i++) {
    tabs[i].onclick = tabClick;
    tabs[i].onclick.apply(tabs[i]);
}