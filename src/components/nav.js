// @ts-check
import createElement from '../utils/createElement';

import '../../assets/styles/nav.css';

export default function Nav() {
  const heading = /** @type {HTMLHeadingElement} */ (
    createElement('h1', {
      className: 'heading heading_primary nav__heading',
      textContent: 'Menu'
    })
  );

  const todosLink = /** @type {HTMLAnchorElement} */ (
    createElement('a', {
      href: './todos',
      className: 'nav__link nav__link_primary nav__link_active',
      textContent: 'Todos',
      onclick: navLinkClickHandler
    })
  );

  const todayTodosLink = /** @type {HTMLAnchorElement} */ (
    createElement('a', {
      href: './todos/today',
      className: 'nav__link nav__link_secondary',
      textContent: 'Today',
      onclick: navLinkClickHandler
    })
  );

  const todayTodosItem = /** @type {HTMLLIElement} */ (
    createElement('li', {
      className: 'nav__item nav__item_secondary',
      children: [todayTodosLink]
    })
  );

  const weekTodosLink = /** @type {HTMLAnchorElement} */ (
    createElement('a', {
      href: './todos/week',
      className: 'nav__link nav__link_secondary',
      textContent: 'Week',
      onclick: navLinkClickHandler
    })
  );

  const weekTodosItem = /** @type {HTMLLIElement} */ (
    createElement('li', {
      className: 'nav__item nav__item_secondary',
      children: [weekTodosLink]
    })
  );

  const todosSubmenu = /** @type {HTMLUListElement} */ (
    createElement('ul', {
      className: 'nav__menu nav__menu_secondary',
      children: [todayTodosItem, weekTodosItem]
    })
  );

  const todosItem = /** @type {HTMLLIElement} */ (
    createElement('li', {
      className: 'nav__item nav__item_primary',
      children: [todosLink, todosSubmenu]
    })
  );

  const projectsLink = /** @type {HTMLAnchorElement} */ (
    createElement('a', {
      href: './projects',
      className: 'nav__link nav__link_primary',
      textContent: 'Projects',
      onclick: navLinkClickHandler
    })
  );

  const projectsItem = /** @type {HTMLLIElement} */ (
    createElement('li', {
      className: 'nav__item nav__item_primary',
      children: [projectsLink]
    })
  );

  const menu = /** @type {HTMLUListElement} */ (
    createElement('ul', {
      className: 'nav__menu nav__menu_primary',
      children: [todosItem, projectsItem]
    })
  );

  const nav = /** @type {HTMLElement} */ (
    createElement('nav', {
      className: 'nav',
      children: [heading, menu]
    })
  );

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
