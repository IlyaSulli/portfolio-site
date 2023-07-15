const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const darkMode = document.getElementById('themeSwitchContainer');

// Function to toggle the theme
function toggleTheme() {
    body.classList.toggle('darkTheme');
    darkMode.classList.toggle('active');

}

// Apply the respective theme based on the device theme
function applyTheme() {
    const isDarkThemePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.classList.toggle('darkTheme', isDarkThemePreferred);
    darkMode.classList.toggle('active');
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
