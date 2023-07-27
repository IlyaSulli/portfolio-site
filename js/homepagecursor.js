document.addEventListener('DOMContentLoaded', function () {
    // Get the elements
    var hideCursorContainer = document.querySelectorAll('.hideCursor');
    var cursor = document.getElementById('cursor');

    // Listen for hover on the footerItemContainer element
    hideCursorContainer.addEventListener('mouseenter', function () {
        console.log('hovered')
        // On hover in, add the 'inactive' class to the 'cursor' element
        cursor.classList.add('inactive');
    });

    hideCursorContainer.addEventListener('mouseleave', function () {
        // On hover out, remove the 'inactive' class from the 'cursor' element
        cursor.classList.remove('inactive');
    });
});