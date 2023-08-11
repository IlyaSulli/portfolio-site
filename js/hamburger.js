

function hamburgerToggle() {
    var hamburger = document.getElementById('headerHamburgerWrapper');
    var hamburgerMenu = document.getElementById('hamburgerMenu');
    const body = document.body;
    hamburger.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
    body.classList.toggle('disableScroll');
}