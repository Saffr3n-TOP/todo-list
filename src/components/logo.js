// @ts-check
import createElement from '../utils/createElement';

// @ts-ignore
import logoIconSrc from '../../assets/icons/logo.svg';
import '../../assets/styles/logo.css';

export default function Logo() {
  const icon = /** @type {HTMLImageElement} */ (
    createElement('img', {
      src: logoIconSrc,
      alt: 'Todo list home page',
      className: 'logo__icon'
    })
  );

  const text = /** @type {HTMLSpanElement} */ (
    createElement('span', {
      className: 'logo__text',
      textContent: 'Todo List',
      attributes: [{ key: 'aria-hidden', value: 'true' }]
    })
  );

  const logo = /** @type {HTMLAnchorElement} */ (
    createElement('a', {
      href: './',
      className: 'logo',
      children: [icon, text]
    })
  );

  return logo;
}
