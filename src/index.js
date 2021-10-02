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
    console.log(listLvl2Dummy);
  };

  const updateCurrentListLvl1Id = (id) => {
    debugger;
    state.currentListLvl1Id = id;
    console.log({ state });
  };

  // 할 일 리스트(List level2)
  console.log({ state });
  const listLvl2Inst = new listLvl2({
    selector: '#listLvl2',
    headerSelector: '#listLvl2-header',
    contentSelector: '#listLvl2-content',
    addItemLvl2Selector: '#add-item-lvl2',
    data: listLvl2Dummy,
    state,
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
    },
  });

  const listLvl1Inst = new listLvl1({
    selector: '#listLvl1',
    headerSelector: '#listLvl1-header',
    contentSelector: '#listLvl1-content',
    addItemLvl1Selector: '#add-item-lvl1',
    data: listLvl1Dummy,
    state,
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
})();
