game();

function game() {

    let animationId = null;

    let speed = 3;

    let score = 0;

    const finishScreen = document.querySelector('.backdrop');
    const finishScoreText = document.querySelector('.finish-score');
    const restartButton = document.querySelector('.restart-button');

    const coin = document.querySelector('.money');
    const coinInfo = createElementInfo(coin);

    const arrow = document.querySelector('.arrow');
    const arrowInfo = createElementInfo(arrow);

    const death = document.querySelector('.death');
    const deathInfo = createElementInfo(death);

    const car = document.querySelector('.car');
    const carInfo = {
        ...createElementInfo(car),
        move: {
            top: null,
            bottom: null,
            left: null,
            right: null,
        }
    }

    const gameScore = document.querySelector('.game-score');

    

    document.addEventListener('keydown', (event) => {
        if (isPause) {
            return;
        }

        const code = event.code;

        if (code === 'ArrowUp' || code === 'KeyW' && carInfo.move.top === null) {
            carInfo.move.top = requestAnimationFrame(carMoveToTop(car, carInfo));
        }
        else if (code === 'ArrowDown' || code === 'KeyS' && carInfo.move.bottom === null) {
            carInfo.move.bottom = requestAnimationFrame(carMoveToBottom(car, carInfo));
        }
        else if (code === 'ArrowLeft' || code === 'KeyA' && carInfo.move.left === null) {
            carInfo.move.left = requestAnimationFrame(carMoveToLeft(car, carInfo));
        }
        else if (code === 'ArrowRight' || code === 'KeyD' && carInfo.move.right === null) {
            carInfo.move.right = requestAnimationFrame(carMoveToRight(car, carInfo));
        }

    });

    document.addEventListener('keyup', (event) => {
        const code = event.code;

        if (code === 'ArrowUp' || code === 'KeyW') {
            cancelAnimationFrame(carInfo.move.top);
            carInfo.move.top = null;
        }
        else if (code === 'ArrowDown' || code === 'KeyS') {
            cancelAnimationFrame(carInfo.move.bottom);
            carInfo.move.bottom = null;
        }
        else if (code === 'ArrowLeft' || code === 'KeyA') {
            cancelAnimationFrame(carInfo.move.left);
            carInfo.move.left = null;
        }
        else if (code === 'ArrowRight' || code === 'KeyD') {
            cancelAnimationFrame(carInfo.move.right);
            carInfo.move.right = null;
        }
    });

    animationId = requestAnimationFrame(startGame);

    function startGame() {
        elementAnimation(death, deathInfo, -500, speed);

        if (deathInfo.visible && hasCollision(carInfo, deathInfo)) {
            finishGame();
            return;
        }

        animationId = requestAnimationFrame(startGame);
        lampsAnimation(speed);
        roadlinesAnimation(speed);

        elementAnimation(coin, coinInfo, -100, speed);
        elementAnimation(arrow, arrowInfo, -400, speed);

        if (coinInfo.visible && hasCollision(carInfo, coinInfo)) {
            score++;
            gameScore.innerHTML = score;
            coin.style.display = 'none';
            coinInfo.visible = false;

            if (score % 3 === 0) {
                speed += 1;
            }
        }

        if (arrowInfo.visible && hasCollision(carInfo, arrowInfo)) {
            arrow.style.display = 'none';
            arrowInfo.visible = false;

            death.style.opacity = 0.5;
            deathInfo.visible = false;

            speed += 7;

            arrowInfo.ignoreAppereance = true;
            deathInfo.ignoreAppereance = true;

            setTimeout(() => {
                death.style.opacity = 1;

                speed -= 7;

                setTimeout(() => {
                    deathInfo.visible = true;
                    arrowInfo.ignoreAppereance = false;
                    deathInfo.ignoreAppereance = false;
                }, 600);
            }, 1500);
        }
    }


    function cancelAnimation() {
        cancelAnimationFrame(animationId);

        cancelAnimationFrame(carInfo.move.top);
        cancelAnimationFrame(carInfo.move.bottom);
        cancelAnimationFrame(carInfo.move.left);
        cancelAnimationFrame(carInfo.move.right);
    }

    function finishGame() {
        cancelAnimation();
        isGameOver = true;
        isPause = true;

        finishScreen.style.display = 'flex';
        finishScoreText.innerHTML = score;

        gameScore.style.display = 'none';
        gameButton.style.display = 'none';
    }

    const gameButton = document.querySelector('.game-button');

    gameButton.addEventListener('click', () => {
        isPause = !isPause;

        if (isPause) {
            cancelAnimation();

            gameButton.children[0].style.display = 'none';
            gameButton.children[1].style.display = 'initial';
        }
        else {
            animationId = requestAnimationFrame(startGame);
            gameButton.children[0].style.display = 'initial';
            gameButton.children[1].style.display = 'none';
        }
    })

    restartButton.addEventListener('click', () => {
        window.location.reload();
    })
}