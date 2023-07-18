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

    // Apply the respective theme based on the device theme or user preference
    function applyTheme() {
        const isDarkThemePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const userPreference = getThemePreference();

        if (userPreference === 'dark') {
            body.classList.add('darkTheme');
            darkMode.classList.add('active');
        } else if (userPreference === 'light') {
            body.classList.remove('darkTheme');
            darkMode.classList.remove('active');
        } else {
            body.classList.toggle('darkTheme', isDarkThemePreferred);
            darkMode.classList.toggle('active', isDarkThemePreferred);
        }
    }

    // Initial application of theme
    applyTheme();

    // Event listener for the theme toggle button
    themeToggle.addEventListener('click', function () {
        toggleTheme();
    });

    // Listen for changes in the user's preferred color scheme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        applyTheme();
    });

    // Save the user's theme preference to localStorage
    function saveThemePreference() {
        const themePreference = body.classList.contains('darkTheme') ? 'dark' : 'light';
        localStorage.setItem('themePreference', themePreference);
    }

    // Get the user's theme preference from localStorage
    function getThemePreference() {
        return localStorage.getItem('themePreference');
    }

    // Set the user's theme preference on load
    function setThemePreference() {
        const userPreference = getThemePreference();

        if (userPreference === 'dark') {
            body.classList.add('darkTheme');
            darkMode.classList.add('active');
        } else if (userPreference === 'light') {
            body.classList.remove('darkTheme');
            darkMode.classList.remove('active');
        }
    }

    // Set the user's theme preference on load
    setThemePreference();
});
