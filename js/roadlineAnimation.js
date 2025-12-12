const roadlines = document.querySelectorAll('.road-line');
const step = 120;


roadlines.forEach((el, i) => {
    const y = i * step;
    el.style.position = 'absolute';
    el.style.top = y + 'px';
    el.style.left = '50%';
    el.style.transform = 'translateX(-50%)';
});

function roadlinesAnimation(speed) {
    roadlines.forEach(el => {
        let y = parseFloat(el.style.top) || 0;
        y += speed;

        if (y > window.innerHeight + 100) {
            let minY = Infinity;

            roadlines.forEach(e => {
                const ty = parseFloat(e.style.top) || 0;
                if (ty < minY) minY = ty;
            });
            
            y = minY - step;
        }

        el.style.top = y + 'px';
    });
}
