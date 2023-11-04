// @ts-check
import DB from './db';

import '../assets/styles/style.css';
import Header from './components/header';
import Nav from './components/nav';
import Main from './components/main';

DB.initialize();

const root = document.querySelector('.root');
root?.append(Header(), Nav(), Main());
