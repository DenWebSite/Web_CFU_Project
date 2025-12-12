function createElementInfo(element) {
    return {
        coords: getCoords(element),
        height: element.clientHeight,
        width: element.clientWidth,
        visible: true,
        ignoreAppereance: false,
    }
}
// в анимках будет
function getCoords(element) {
    const matrix = window.getComputedStyle(element).transform;
    const array = matrix.split(',');
    const y = array[array.length - 1];
    const x = array[array.length - 2];
    const numericY = parseFloat(y);
    const numericX = parseFloat(x);

    return {
        x: numericX,
        y: numericY
    };
}

function hasCollision(element1Info, element2Info) {
    const carYTop = element1Info.coords.y;
    const carYBottom = element1Info.coords.y + element1Info.height;
    const carXLeft = element1Info.coords.x - element1Info.width / 2;
    const carXRight = element1Info.coords.x + element1Info.width / 2;

    const coinYTop = element2Info.coords.y;
    const coinYBottom = element2Info.coords.y + element2Info.height;
    const coinXLeft = element2Info.coords.x - element2Info.width / 2;
    const coinXRight = element2Info.coords.x + element2Info.width / 2;

    if (carYTop > coinYBottom || carYBottom < coinYTop) {
        return false;
    };

    if (carXLeft > coinXRight || carXRight < coinXLeft) {
        return false;
    };

    return true;
}


