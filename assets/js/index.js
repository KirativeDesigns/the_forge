/*
   Start headerObserver
   Controls the header transitions when scrolled
*/

const header = document.querySelector('#primary-header');
const scrollCheck = document.createElement('div');

scrollCheck.setAttribute('data-scroll-check', '');
header.before(scrollCheck);

const headerObserver = new IntersectionObserver((entries) => {
    header.classList.toggle('fixed', !entries[0].isIntersecting)
});

headerObserver.observe(scrollCheck);

/*
   End headerObserver
*/

/*
   Start menu event listeners
*/

//When the menu button is clicked, or menu is clicked out of, transiton display and accessibility attributes

document.addEventListener('click', (e) => {
    let overflowArray = [];

    const body = document.body;
    const html = document.documentElement;

    overflowArray.push(body, html);

    const menuButton = document.querySelector('.mobile-menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    const primaryNav = document.querySelector('.primary-navigation');
    const navItems = document.querySelectorAll('.nav-item');
    const nonNavItems = document.querySelectorAll('a:not(.nav-item)');

    const menuButtonAriaValue = menuButton.getAttribute('aria-expanded');
    const isMenuButton = e.target === menuButton || e.target.closest('.mobile-menu-toggle') === menuButton;

    if (isMenuButton) {
        const isOpen = menuButtonAriaValue === 'true' ? 'false' : 'true';

        menuButton.setAttribute('aria-expanded', isOpen);
        navWrapper.classList.toggle('open', isOpen === 'true');
        primaryNav.setAttribute('aria-hidden', isOpen === 'false');
        navItems.forEach(navItem => navItem.setAttribute('tabindex', isOpen === 'true' ? '0' : '-1'));
        nonNavItems.forEach(nonNavItem => nonNavItem.setAttribute('tabindex', isOpen === 'true' ? '-1' : '0'));
        overflowArray.forEach(overflowItem => overflowItem.classList.toggle('overflow-hidden', isOpen === 'true'));

    } else if (navWrapper.classList.contains('open') && !e.target.closest('.primary-navigation')) {
        menuButton.setAttribute('aria-expanded', 'false');
        navWrapper.classList.toggle('open');
        primaryNav.setAttribute('aria-hidden', 'true');
        navItems.forEach(navItem => navItem.setAttribute('tabindex', '-1'));
        nonNavItems.forEach(nonNavItem => nonNavItem.setAttribute('tabindex', '0'));
        overflowArray.forEach(overflowItem => overflowItem.classList.toggle('overflow-hidden'));
    }
});