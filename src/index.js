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

  // 할 일 리스트(List level2)
  const listLvl2Inst = new listLvl2({
    selector: '#listLvl2',
    headerSelector: '#listLvl2-header',
    contentSelector: '#listLvl2-content',
    addItemLvl2Selector: '#add-item-lvl2',
    data: listLvl2Dummy,
    // dataField: {
    //   lvlField: 'lvl',
    //   idField: 'id',
    //   titleField: 'title',
    //   countField: 'count',
    // },
  });

  // 목록(List level1)
  // const listLvl1HeaderInst = new ListHeader({
  //   selector: '#listLvl1-header',
  //   event: {
  //     addData: function (title) {
  //       console.log(listLvl1Dummy);
  //       let biggestNum = [...listLvl1Dummy].sort((a, b) => b.id - a.id)[0].id;
  //       const listData = {
  //         lvl: 1,
  //         id: ++biggestNum,
  //         title,
  //         count: 0,
  //       };
  //       listLvl1Dummy.push(listData);
  //       this.renderListLvl1(this.$listLvl1ContentContainer, listLvl1Dummy);
  //     },
  //   },
  // });
  const listLvl1Inst = new listLvl1({
    selector: '#listLvl1',
    headerSelector: '#listLvl1-header',
    contentSelector: '#listLvl1-content',
    addItemLvl1Selector: '#add-item-lvl1',
    data: listLvl1Dummy,
    dataField: {
      lvlField: 'lvl',
      idField: 'id',
      titleField: 'title',
      countField: 'count',
    },
    // header: listLvl1HeaderInst,
    // content: new ListContent(),
    listLvl2Inst,
    event: {
      addDate: (title) => {
        listLvl1HeaderInst.addDate(title);
      },
    },
  });

  // const listLvl1ContainerInst = new listLvl1ContainerInst({
  //   listLvl1HeaderInst,
  //   listLvl1Inst,
  // });
})();

// const img = document.createElement('img');
// img.src = addIcon;

// const root = document.querySelector('#root');

// root.appendChild(img);
