const toggleMenu = document.querySelector('.nav .toggle-menu');
const nav = document.querySelector('.nav .navbar-nav');

toggleMenu.addEventListener('click', function () {
    nav.classList.toggle('show');
});