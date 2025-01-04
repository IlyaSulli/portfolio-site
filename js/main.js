// Insert the footer and header to the html page

$(document).ready(function() {
    $("header").load("../template/header.html", function() {
        // Theme setting
        const themeToggle = document.querySelectorAll('.themeToggle');
        const darkMode = document.querySelector('.themeSwitchContainer');
        const body = document.body;

        function toggleTheme() {
            body.classList.toggle('darkTheme');
            darkMode.classList.toggle('active');
            saveThemePreference();
        }

        function applyTheme() {
            const isDarkThemePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const savedThemePreference = localStorage.getItem('themePreference');

            if (savedThemePreference === 'dark' || (savedThemePreference === null && isDarkThemePreferred)) {
                body.classList.add('darkTheme');
                darkMode.classList.add('active');
            } else {
                body.classList.remove('darkTheme');
                darkMode.classList.remove('active');
            }
        }

        function saveThemePreference() {
            localStorage.setItem('themePreference', body.classList.contains('darkTheme') ? 'dark' : 'light');
        }

        applyTheme();

        themeToggle.forEach((themeToggleButtons) => {
            themeToggleButtons.addEventListener('click', () => {
                toggleTheme();
            });
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            applyTheme();
        });

        // Initialize magnetic elements
        const magnets = document.querySelectorAll('.magnetic');
        magnets.forEach((magnet) => {
            magnet.addEventListener('mousemove', moveMagnet);
            magnet.addEventListener('mouseout', (event) => {
                gsap.to(event.currentTarget, { duration: 1, x: 0, y: 0, ease: "power4.out" });
            });
        });

        function moveMagnet(event) {
            const magnetButton = event.currentTarget;
            const bounding = magnetButton.getBoundingClientRect();

            gsap.to(magnetButton, {
                duration: 1,
                x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * 20,
                y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * 20,
                ease: "power4.out"
            });
        }

        // Initialize the cursor

        // Get the elements
        const cursor = document.getElementById('cursor');
        const links = document.querySelectorAll('.shrinkCursor');
        var hideCursorContainer = document.querySelectorAll('.hideCursor');

        let mouseX = 0, mouseY = 0; // Mouse position
        let cursorX = 0, cursorY = 0; // Cursor position

        // Update mouse position on mousemove
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smoothly update cursor position
        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.1; // Adjust the 0.1 for faster/slower trailing
            cursorY += (mouseY - cursorY) * 0.1;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            requestAnimationFrame(updateCursor);
        }

        updateCursor();

        // Shrink cursor on hover
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.classList.add('hover');
            });

            link.addEventListener('mouseleave', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.classList.remove('hover');
            });
        });
        
        // Hide cursor on hover
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
});

console.log("%cHello developer 👋, I hope you enjoy the code!", "background-color: black; color:white; font-size:24px; padding: 30px 100px; align-text: center;")
console.log("%cIf you want to see the code, you can find it here: https://github.com/IlyaSulli/portfolio-site", "background-color: black; color:white; font-size:16px; padding: 30px 100px; align-text: center;")


