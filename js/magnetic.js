document.addEventListener('DOMContentLoaded', function () {
    var magnets = document.querySelectorAll('.magnetic')
    var lightMagnets = document.querySelectorAll('.lightMagnetic')
    var lightStrength = 10
    var strength = 20

    magnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', moveMagnet);
        magnet.addEventListener('mouseout', function (event) {
            TweenMax.to(event.currentTarget, 1, { x: 0, y: 0, ease: Power4.easeOut })
        });
    });

    function moveMagnet(event) {
        var magnetButton = event.currentTarget
        var bounding = magnetButton.getBoundingClientRect()

        TweenMax.to(magnetButton, 1, {
            x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * strength,
            y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * strength,
            ease: Power4.easeOut
        })
    }

    lightMagnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', moveMagnetLight);
        magnet.addEventListener('mouseout', function (event) {
            TweenMax.to(event.currentTarget, 1, { x: 0, y: 0, ease: Power4.easeOut })
        });
    });

    function moveMagnetLight(event) {
        var magnetButton = event.currentTarget
        var bounding = magnetButton.getBoundingClientRect()

        TweenMax.to(magnetButton, 1, {
            x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * lightStrength,
            y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * lightStrength,
            ease: Power4.easeOut
        })
    }
});