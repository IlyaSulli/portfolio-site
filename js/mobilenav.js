document.getElementById('HamburgerIcon').addEventListener('click', function () {
    const navActive = document.getElementById("MobileNavContainer");
    navActive.preventDefault();
    navActive.classList.toggle("active");
});