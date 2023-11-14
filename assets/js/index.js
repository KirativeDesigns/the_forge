const header = document.querySelector('#primary-header');
const scrollCheck = document.createElement('div');

scrollCheck.setAttribute('data-scroll-check', '');
header.before(scrollCheck);

const headerObserver = new IntersectionObserver((entries) => {
    header.classList.toggle('fixed', !entries[0].isIntersecting)
});

headerObserver.observe(scrollCheck);

const menuButton = document.querySelector('.mobile-menu-toggle');

menuButton.addEventListener('click', () => {
    const isOpened = menuButton.getAttribute('aria-expanded');
    const navWrapper = document.querySelector('.nav-wrapper');
    const primaryNav = document.querySelector('.primary-navigation');

    if (isOpened === 'false') {
        menuButton.setAttribute('aria-expanded', 'true');
        navWrapper.classList.toggle('open');
        primaryNav.setAttribute('aria-hidden', 'false');
    } else {
        menuButton.setAttribute('aria-expanded', 'false');
        navWrapper.classList.toggle('open');
        primaryNav.setAttribute('aria-hidden', 'true');
    }
});