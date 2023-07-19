function flickerText() {
    var flickerElement = document.getElementById('flicker');
    var isOn = Math.random() < 0.8; // Adjust the probability (0-1) for the element to be on

    if (isOn) {
        flickerElement.classList.remove('active');
    } else {
        flickerElement.classList.add('active');
    }
}

setInterval(flickerText, 200); // Adjust the interval (in milliseconds) to control the flickering speed

var clickCount = 0;
var lastClickTime = 0;
var flickerElement = document.getElementById('flicker');

flickerElement.addEventListener('click', function () {
    var now = new Date().getTime();

    if (now - lastClickTime < 5000) {
        clickCount++;
        if (clickCount === 5) {
            const end = Date.now() + 0.5 * 1000;

            // go Buckeyes!
            const colors = ["58ead5"];

            (function frame() {
                confetti({
                    particleCount: 1,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors,
                });

                confetti({
                    particleCount: 1,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors,
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
            clickCount = 0;
        }
    } else {
        clickCount = 1;
    }

    lastClickTime = now;
});