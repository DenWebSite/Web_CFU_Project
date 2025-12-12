let isGameOver = false;
let isPause = false;

function carMoveToTop(car, carInfo) {
    if (isGameOver || isPause) return;
    return () => {
        const newY = carInfo.coords.y - 5;

        if (newY < 0) {
            return;
        }

        carInfo.coords.y = newY;
        carMoveset(car, carInfo.coords.x, newY);
        carInfo.move.top = requestAnimationFrame(carMoveToTop(car, carInfo));
    }

}

function carMoveToBottom(car, carInfo) {
    if (isGameOver || isPause) return;
    return () => {
        const newY = carInfo.coords.y + 5;

        if (newY > roadHeight - carInfo.height) {
            return;
        }

        carInfo.coords.y = newY;
        carMoveset(car, carInfo.coords.x, newY);
        carInfo.move.bottom = requestAnimationFrame(carMoveToBottom(car, carInfo))
    };
}

function carMoveToLeft(car, carInfo) {
    if (isGameOver || isPause) return;
    return () => {
        const newX = carInfo.coords.x - 5;
        if (newX < -((roadWidth / 2) - (carInfo.width / 2) + 5)) {
            return;
        }

        carInfo.coords.x = newX;
        carMoveset(car, newX, carInfo.coords.y);
        carInfo.move.left = requestAnimationFrame(carMoveToLeft(car, carInfo));
    }

}

function carMoveToRight(car, carInfo) {
    if (isGameOver || isPause) return;
    return () => {
        const newX = carInfo.coords.x + 5;

        if (newX > ((roadWidth / 2) - (carInfo.width / 2) + 5)) {
            return;
        }

        carInfo.coords.x = newX;
        carMoveset(car, newX, carInfo.coords.y);
        carInfo.move.right = requestAnimationFrame(carMoveToRight(car, carInfo));
    }

}

function carMoveset(car, x, y) {
    car.style.transform = `translate(${x}px, ${y}px)`;
}
