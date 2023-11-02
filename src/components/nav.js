// @ts-check
import createElement from '../utils/createElement';
import '../../assets/styles/nav.css';

export default function Nav() {
  const heading = createElement('h1', {
    className: 'heading heading_primary nav__heading',
    textContent: 'Menu'
  });

  const todosLink = createElement('a', {
    href: './todos',
    className: 'nav__link nav__link_active',
    textContent: 'Todos',
    onclick: navLinkClickHandler
  });

  const todayTodosLink = createElement('a', {
    href: './todos/today',
    className: 'nav__link nav__link_secondary',
    textContent: 'Today',
    onclick: navLinkClickHandler
  });

  const todayTodosItem = createElement('li', {
    className: 'nav__item nav__item_secondary',
    children: [todayTodosLink]
  });

  const weekTodosLink = createElement('a', {
    href: './todos/week',
    className: 'nav__link nav__link_secondary',
    textContent: 'Week',
    onclick: navLinkClickHandler
  });

  const weekTodosItem = createElement('li', {
    className: 'nav__item nav__item_secondary',
    children: [weekTodosLink]
  });

  const todosSubmenu = createElement('ul', {
    className: 'nav__menu nav__menu_secondary',
    children: [todayTodosItem, weekTodosItem]
  });

  const todosItem = createElement('li', {
    className: 'nav__item',
    children: [todosLink, todosSubmenu]
  });

  const projectsLink = createElement('a', {
    href: './projects',
    className: 'nav__link',
    textContent: 'Projects',
    onclick: navLinkClickHandler
  });

  const projectsItem = createElement('li', {
    className: 'nav__item',
    children: [projectsLink]
  });

  const menu = createElement('ul', {
    className: 'nav__menu',
    children: [todosItem, projectsItem]
  });

  const nav = createElement('nav', {
    className: 'nav',
    children: [heading, menu]
  });

  return nav;
}

/** @param {MouseEvent} e */
function navLinkClickHandler(e) {
  e.preventDefault();

  const activeLinkClass = 'nav__link_active';
  const currActiveLink = document.querySelector(`.${activeLinkClass}`);
  const nextActiveLink = /** @type {HTMLAnchorElement} */ (e.currentTarget);

  currActiveLink?.classList.remove(activeLinkClass);
  nextActiveLink.classList.add(activeLinkClass);
}
