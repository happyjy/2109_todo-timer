import './js/init.js';
import './js/header.js';
import './js/listLvl2Item';
import './js/listLvl1.js';
import './js/listLvl2.js';

import './css/common.css';
import './css/header.css';
import './css/listLvl1.css';
import './css/listLvl2.css';
import './css/reset.css';
// import addIcon from './assets/addIcon.png';
import { state, listLvl1Dummy, listLvl2Dummy } from './js/dummyData.js';
import { listLvl1 } from './js/listLvl1.js';
import { listLvl2 } from './js/listLvl2.js';
import { ListHeader } from './js/header.js';
(() => {
  // data
  listLvl1Dummy.map((listLvl1Data) => {
    listLvl1Data.count = listLvl2Dummy.filter((listLvl2Data) => {
      return listLvl2Data.upperLvlId === listLvl1Data.id;
    }).length;
    return listLvl1Data;
  });

  // const abc = 0;
  // let state = {
  //   listLvl1Dummy,
  //   listLvl2Dummy,
  //   set currentListLvl1Id(id) {
  //     console.log('### setter: ', id);
  //     this.log.push();
  //     console.log('### setter > log: ', this.log);
  //   },
  //   log: [],

  //   currentState: function () {
  //     debugger;
  //     console.log(this);
  //   },
  //   changeEvent: {
  //     updateCurrentListLvl1Id: function (id) {
  //       debugger;
  //       console.log(this);
  //       this.currentListLvl1Id = id;
  //     },
  //   },
  // };

  // const delListLvl2Item = (id) => {
  // };
  const addListLvl2Item = ({ id, pomoTitle, pomoTime }) => {
    const newListLvl2Item = {
      lvl: 2,
      id,
      upperLvlId: state.currentListLvl1Id,
      title: pomoTitle,
      time: pomoTime,
      pomoCnt: 0,
      isFinish: false,
    };

    listLvl2Dummy.push(newListLvl2Item);
    console.log({ listLvl2Dummy, curr: state.currentListLvl1Id });

    return newListLvl2Item;
    // return listLvl2Dummy.filter(
    //   (v) => v.upperLvlId === state.currentListLvl1Id,
    // );
  };

  const updateCurrentListLvl1Id = (id) => {
    state.currentListLvl1Id = id;
  };

  // 할 일 리스트(List level2)
  console.log({ state });
  const listLvl2Inst = new listLvl2({
    selector: '#listLvl2',
    headerSelector: '#listLvl2-header',
    contentSelector: '#listLvl2-content',
    addItemLvl2Selector: '#add-item-lvl2',
    data: { listLvl1Dummy, listLvl2Dummy },
    dataField: {
      lvlField: 'lvl',
      idField: 'id',
      upperLvlIdField: 'upperLvlId',
      titleField: 'title',
      timeField: 'time',
      pomoCntField: 'pomoCnt',
      isFinishField: 'isFinish',
    },
    changeEvent: {
      addListLvl2Item,
      renderListLvl1,
    },
  });

  const listLvl1Inst = new listLvl1({
    selector: '#listLvl1',
    headerSelector: '#listLvl1-header',
    contentSelector: '#listLvl1-content',
    addItemLvl1Selector: '#add-item-lvl1',
    addItemLvl2Selector: '#add-item-lvl2',
    data: listLvl1Dummy,
    dataField: {
      lvlField: 'lvl',
      idField: 'id',
      titleField: 'title',
      countField: 'count',
    },
    listLvl2Inst,
    changeEvent: {
      updateCurrentListLvl1Id,
      // addData: (title) => {
      //   listLvl1HeaderInst.addData(title);
      // },
    },
  });

  function renderListLvl1(data) {
    return listLvl1Inst.renderListLvl1(data);
  }
})();
