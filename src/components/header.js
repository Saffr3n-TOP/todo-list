// @ts-check
import createElement from '../utils/createElement';
import '../../assets/styles/header.css';

export default function Header() {
  const header = createElement('header', {
    className: 'header'
  });

  return header;
}
