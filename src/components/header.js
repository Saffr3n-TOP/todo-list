// @ts-check
import createElement from '../utils/createElement';

import '../../assets/styles/header.css';
import Logo from './logo';

export default function Header() {
  const header = /** @type {HTMLElement} */ (
    createElement('header', {
      className: 'header',
      children: [Logo()]
    })
  );

  return header;
}
