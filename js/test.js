// 在 index.js 文件中
const worldMap = require('./worldMap');
const chinaMap = require('./chinaMap');

const container = document.querySelector('#main');
let currentMap = worldMap;

currentMap(container);

// 切换地图的按钮点击事件
const changeMapButton = document.querySelector('#changeMapButton');
changeMapButton.addEventListener('click', () => {
    container.innerHTML = '';

    if (currentMap === worldMap) {
        currentMap = chinaMap;
    } else {
        currentMap = worldMap;
    }

    currentMap(container);
});