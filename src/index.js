import './js/init.js';
import './js/common.js';
import './js/header.js';
import './js/listLvl1Item';
import './js/listLvl2Item';
import './js/listLvl1.js';
import './js/listLvl2.js';

import './css/common.css';
import './css/header.css';
import './css/listLvl1.css';
import './css/listLvl2.css';
import './css/reset.css';

import {
  state,
  listLvl1Dummy,
  listLvl2Dummy,
  // getListLvl1Dummy,
  // getListLvl2Dummy,
} from './js/dummyData.js';
import { listLvl1 } from './js/listLvl1.js';
import { listLvl2 } from './js/listLvl2.js';
(() => {
  const localStorageListLvl1 =
    JSON.parse(localStorage.getItem('listLvl1')) || [];
  const localStorageListLvl2 =
    JSON.parse(localStorage.getItem('listLvl2')) || [];

  let listLvl1DummyCopy = [...listLvl1Dummy];
  if (localStorageListLvl1.length != 0 && listLvl1Dummy) {
    listLvl1DummyCopy = localStorageListLvl1;
  }
  let listLvl2DummyCopy = [...listLvl2Dummy];
  if (localStorageListLvl2.length != 0 && listLvl2Dummy) {
    listLvl2DummyCopy = localStorageListLvl2;
  }

  listLvl1DummyCopy.map((listLvl1Data) => {
    listLvl1Data.count = listLvl2DummyCopy.filter((listLvl2Data) => {
      return listLvl2Data.upperLvlId === listLvl1Data.id;
    }).length;
    return listLvl1Data;
  });

  const updateCurrentListLvl1Id = (id) => {
    state.currentListLvl1Id = id;
  };

  // 할 일 리스트(List level2)
  const listLvl2Inst = new listLvl2({
    selector: '#listLvl2',
    headerSelector: '#listLvl2-header',
    contentSelector: '#listLvl2-content',
    addItemLvl2Selector: '#add-item-lvl2',
    data: {
      listLvl1Dummy: listLvl1DummyCopy,
      listLvl2Dummy: listLvl2DummyCopy,
    },
    changeEvent: {
      renderListLvl1,
    },
  });

  const listLvl1Inst = new listLvl1({
    selector: '#listLvl1',
    headerSelector: '#listLvl1-header',
    contentSelector: '#listLvl1-content',
    addItemLvl1Selector: '#add-item-lvl1',
    addItemLvl2Selector: '#add-item-lvl2',
    data: listLvl1DummyCopy,
    listLvl2Inst,
    changeEvent: {
      updateCurrentListLvl1Id,
    },
  });

  function renderListLvl1(data) {
    return listLvl1Inst.renderListLvl1(data);
  }
})();
