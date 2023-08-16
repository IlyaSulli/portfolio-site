/* Theme setting */

document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.querySelectorAll('.themeToggle');
    const body = document.body;
    const darkMode = document.getElementById('themeSwitchContainer');
    const darkModeMobile = document.getElementById('themeSwitchContainerMobile');

    // Function to toggle the theme
    function toggleTheme() {
        body.classList.toggle('darkTheme');
        darkMode.classList.toggle('active');
        darkModeMobile.classList.toggle('active');
        saveThemePreference();
    }

    // Apply the respective theme based on the device theme
    function applyTheme() {
        const isDarkThemePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (isDarkThemePreferred) {
            body.classList.add('darkTheme');
            darkMode.classList.add('active');
            darkModeMobile.classList.add('active');
        } else {
            body.classList.remove('darkTheme');
            darkMode.classList.remove('active');
            darkModeMobile.classList.remove('active');
        }
    }

    // Initial application of theme
    applyTheme();

    // Event listener for the theme toggle button
    themeToggle.forEach((themeToggleButtons) => {
        themeToggleButtons.addEventListener('click', () => {
            toggleTheme();
        });
    });


    // Listen for changes in the user's preferred color scheme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        applyTheme();
    });

    // Save the user's theme preference to localStorage
    function saveThemePreference() {
        localStorage.setItem('themePreference', body.classList.contains('darkTheme') ? 'dark' : 'light');
    }

    // Get the user's theme preference from localStorage
    function getThemePreference() {
        return localStorage.getItem('themePreference');
    }

    // Set the user's theme preference to localStorage
    function setThemePreference() {
        const themePreference = getThemePreference();
        if (themePreference === 'dark') {
            body.classList.add('darkTheme');
            darkMode.classList.add('active');
            darkModeMobile.classList.add('active');
        } else {
            body.classList.remove('darkTheme');
            darkMode.classList.remove('active');
            darkModeMobile.classList.remove('active');
        }
    }

    // Set the user's theme preference on load
    setThemePreference();
});

console.log("%cHello developer 👋, I hope you enjoy the code!", "background-color: black; color:cyan; font-size:24px; padding: 30px 100px; align-text: center;")


/* -------------------- */
/* Parallax coming soon */
/* -------------------- */

/* Cursor switch */

document.addEventListener('DOMContentLoaded', function () {
    // Get the elements
    var hideCursorContainer = document.querySelectorAll('.hideCursor');
    var cursor = document.getElementById('cursor');

    hideCursorContainer.forEach((hideCursor) => {
        hideCursor.addEventListener('mouseenter', function () {
            // On hover in, add the 'inactive' class to the 'cursor' element
            cursor.classList.add('inactive');
        });
        hideCursor.addEventListener('mouseleave', function () {
            // On hover out, remove the 'inactive' class from the 'cursor' element
            cursor.classList.remove('inactive');
        });
    });

});

/* Hamburger menu switch */

function hamburgerToggle() {
    var hamburger = document.getElementById('headerHamburgerWrapper');
    var hamburgerMenu = document.getElementById('hamburgerMenu');
    const body = document.body;
    hamburger.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
    body.classList.toggle('disableScroll');
}

/* Block Magnet */

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

