document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("gridViewButton").onclick = function () { displayGrid() };
    document.getElementById("listViewButton").onclick = function () { displayList() };

    function displayGrid() {
        var grid = document.getElementById('portfolioImages');
        var list = document.getElementById('portfolioList');
        var listButton = document.getElementById('listViewButton');
        var gridButton = document.getElementById('gridViewButton');

        grid.classList.add('active');
        list.classList.remove('active');
        listButton.classList.remove('active');
        gridButton.classList.add('active');
    };

    function displayList() {
        var grid = document.getElementById('portfolioImages');
        var list = document.getElementById('portfolioList');
        var listButton = document.getElementById('listViewButton');
        var gridButton = document.getElementById('gridViewButton');

        grid.classList.remove('active');
        list.classList.add('active');
        listButton.classList.add('active');
        gridButton.classList.remove('active');
    }


});