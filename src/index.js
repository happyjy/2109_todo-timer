import './js/init.js';
import './js/listLvl1.js';
import './js/listLvl2.js';
import './css/common.css';
import './css/header.css';
import './css/listLvl1.css';
import './css/listLvl2.css';
import './css/reset.css';
// import addIcon from './assets/addIcon.png';
import { listLvl1Dummy, listLvl2Dummy } from './js/dummyData.js';
import { listLvl1 } from './js/listLvl1.js';
console.log('### index.js: ' /* , listLvl1, listLvl1Dummy */);
(() => {
  // data

  listLvl1Dummy.map((listLvl1Data) => {
    listLvl1Data.count = listLvl2Dummy.filter((listLvl2Data) => {
      return listLvl2Data.upperLvlId === listLvl1Data.id;
    }).length;
    return listLvl1Data;
  });

  console.log({ listLvl1Dummy, listLvl2Dummy });

  const listLvl1Inst = new listLvl1({
    selector: '#listLvl1',
    headerSelector: '#listLvl1-header',
    contentSelector: '#listLvl1-content',
    data: listLvl1Dummy,
    dataField: {
      lvlField: 'lvl',
      idField: 'id',
      s: 'title',
      countField: 'count',
    },
    changeEvent: {
      onAddListLvl1: (event) => {
        console.log('# addListLvl1: ', event);
      },
      onDelListLvl1: (event) => {
        console.log('# delListLvl1: ', event);
      },
      onModifyListLvl1: (event) => {
        console.log('# modifyListLvl1: ', event);
      },
      onClickListLvlItem: (event) => {
        console.log('# clickListLvlItem: ', event);
      },
    },
  });
})();

// const img = document.createElement('img');
// img.src = addIcon;

// const root = document.querySelector('#root');

// root.appendChild(img);
