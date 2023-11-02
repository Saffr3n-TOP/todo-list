// @ts-check
// @ts-ignore
import logoIconSrc from '../../assets/icons/logo.svg';
import createElement from '../utils/createElement';
import '../../assets/styles/logo.css';

export default function Logo() {
  const icon = createElement('img', {
    src: logoIconSrc,
    alt: 'Todo list home page',
    className: 'logo__icon'
  });

  const text = createElement('span', {
    className: 'logo__text',
    textContent: 'Todo List',
    attributes: [{ key: 'aria-hidden', value: 'true' }]
  });

  const logo = createElement('a', {
    href: './',
    className: 'logo',
    children: [icon, text]
  });

  return logo;
}
