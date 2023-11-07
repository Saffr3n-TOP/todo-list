// @ts-check
import createElement from '../utils/createElement';

import '../../assets/styles/main.css';
import Todos from './todos';

export default function Main() {
  const main = createElement('main', {
    className: 'main',
    children: [Todos()]
  });

  return main;
}
