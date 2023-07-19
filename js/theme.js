window.onload = function () {

    document.addEventListener('DOMContentLoaded', function () {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const darkMode = document.getElementById('themeSwitchContainer');

        // Function to toggle the theme
        function toggleTheme() {
            body.classList.toggle('darkTheme');
            darkMode.classList.toggle('active');
            saveThemePreference();
        }

        // Apply the respective theme based on the device theme
        function applyTheme() {
            const isDarkThemePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (isDarkThemePreferred) {
                body.classList.add('darkTheme');
                darkMode.classList.add('active');
            } else {
                body.classList.remove('darkTheme');
                darkMode.classList.remove('active');
            }
        }

        // Initial application of theme
        applyTheme();

        // Event listener for the theme toggle button
        themeToggle.addEventListener('click', () => {
            toggleTheme();
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
            } else {
                body.classList.remove('darkTheme');
                darkMode.classList.remove('active');
            }
        }

        // Set the user's theme preference on load
        setThemePreference();

        // TODO: Fix the theme toggle button not working on click due to the page being loaded after. Getting error "Uncaught TypeError: Cannot read properties of null (reading 'classList')"

        document.getElementById('HamburgerIcon').addEventListener('click', function () {
            const navActive = document.getElementById("MobileNavContainer");
            navActive.classList.toggle("active");
        });
    });

};