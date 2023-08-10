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