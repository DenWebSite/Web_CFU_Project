const lamps = document.querySelectorAll('.lamp');
const lampsCoords = [];

for (let i = 0; i < lamps.length; i++) {
    const lamp = lamps[i];
    const coordLamp = getCoords(lamp);

    lampsCoords.push(coordLamp);
}

function lampsAnimation(speed) {
    for (let i = 0; i < lamps.length; i++) {
        const lamp = lamps[i];
        const coords = lampsCoords[i];

        let newYCoord = coords.y + speed;

        if (newYCoord > window.innerHeight) {
            newYCoord = -220;
        }

        lampsCoords[i].y = newYCoord;
        lamp.style.transform = `translate(${coords.x}px, ${newYCoord}px)`
    }
}