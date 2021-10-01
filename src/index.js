import './js/init.js';
import './css/common.css';
import './css/header.css';
import './css/listLvl1.css';
import './css/listLvl2.css';
import './css/reset.css';

console.log('index.js');

import addIcon from './assets/addIcon.png';

const img = document.createElement('img');
img.src = addIcon;

const root = document.querySelector('#root');

root.appendChild(img);
