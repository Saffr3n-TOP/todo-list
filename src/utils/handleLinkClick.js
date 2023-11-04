// @ts-check
import changePage from './changePage';

/** @param {MouseEvent} e  */
export default function handleLinkClick(e) {
  e.preventDefault();

  const link = /** @type {HTMLAnchorElement} */ (e.currentTarget);
  const origin = window.location.origin + '/';
  const [mainPath, subPath] = link.href.replace(origin, '').split('/');

  const activeLinkClass = 'nav__link_active';
  const currActiveLink = document.querySelector(`.${activeLinkClass}`);
  const nextActiveLink = document.querySelector(
    `.nav__link[href="./${mainPath}${
      subPath === 'today' || subPath === 'week' ? `/${subPath}` : ''
    }"]`
  );

  currActiveLink?.classList.remove(activeLinkClass);
  nextActiveLink?.classList.add(activeLinkClass);

  import(`../components/${mainPath}`).then(({ default: Component }) => {
    changePage(Component(subPath));
  });
}
