function elementAnimation(element, elementInfo, elementInitialYCoord, speed) {
        let newYCoord = elementInfo.coords.y + speed;
        let newXCoord = elementInfo.coords.x;

        if (newYCoord > window.innerHeight) {
            newYCoord = elementInitialYCoord;

            const direction = parseInt(Math.random() * 2);
            const randomXCoord = parseInt(Math.random() * (roadWidth / 2 - elementInfo.width / 2));


            if (!elementInfo.ignoreAppereance) {
                element.style.display = 'initial';
                elementInfo.visible = true;
            }

            if (direction === 0) {
                newXCoord = -randomXCoord;
            }
            else if (direction === 1) {
                newXCoord = randomXCoord;
            }
        }

        elementInfo.coords.y = newYCoord;
        elementInfo.coords.x = newXCoord;
        element.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;
    }