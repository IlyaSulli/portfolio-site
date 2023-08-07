document.addEventListener('DOMContentLoaded', function () {
    // Get the elements
    var hideCursorContainer = document.querySelectorAll('.hideCursor');
    var cursor = document.getElementById('cursor');



    hideCursorContainer.addEventListener('mouseout', function () {
        // On hover out, remove the 'inactive' class from the 'cursor' element
        cursor.classList.remove('inactive');
    });

    // Listen for hover on the footerItemContainer element
    hideCursorContainer.addEventListener('mousein', function () {
        // On hover in, add the 'inactive' class to the 'cursor' element
        cursor.classList.add('inactive');
    });
});