// console.log('### listLvl2.js');

import { ListHeader } from './header';
import { ListLvl2Item } from './listLvl2Item';

export class listLvl2 {
  constructor({
    selector,
    headerSelector,
    contentSelector,
    addItemLvl2Selector,
    data,
    changeEvent: { addListLvl2Item },
  }) {
    this.selector = selector;
    this.headerSelector = headerSelector;
    this.contentSelector = contentSelector;
    this.addItemLvl2Selector = addItemLvl2Selector;
    this.data = data;
    this.addListLvl2Item = addListLvl2Item;

    this.filteredDataList = [];

    this.$listLvl2HeaderContainer = document.querySelector(this.headerSelector);
    this.$listLvl2ContentContainer = document.querySelector(
      this.contentSelector,
    );
    this.$addItemLvl2Container = document.querySelector(
      this.addItemLvl2Selector,
    );

    this.eventBinding();

    this.ListHeader = new ListHeader({
      headerSelector,
      changeEvent: {
        toggleItemLvl2: () => this.toggleItemLvl2(),
      },
    });

    this.listLvl2ItemInstList = [];
  }

  render(clickedListLvl1Inst) {
    this.filteredDataList = this.data.filter(
      (v) => v.upperLvlId === clickedListLvl1Inst.id,
    );

    // lvl2 header
    this.ListHeader.render({
      lvl1Inst: clickedListLvl1Inst,
      data: this.filteredDataList,
    });

    // lvl2 content
    const $listLvl2Content = document.createElement('div');
    $listLvl2Content.classList.add('listLvl2-content');
    this.filteredDataList.forEach((v) => {
      const listLvl2ItemInst = new ListLvl2Item({
        contentSelector: this.contentSelector,
        lvl1Inst: clickedListLvl1Inst,
        lvl2Data: this.data,
        changeEvent: {
          addItem: this.addItem.bind(this),
          delItem: this.delItem.bind(this),
        },
      });

      listLvl2ItemInst.render(v);
      this.listLvl2ItemInstList.push(listLvl2ItemInst);
      $listLvl2Content.appendChild(listLvl2ItemInst.getDom());
    });

    this.$listLvl2ContentContainer.append($listLvl2Content);
  }

  eventBinding() {
    const $pomoTitle = document.querySelector('#pomo-title');
    const $pomoTime = document.querySelector('#pomo-time');
    const $pomoSave = document.querySelector('#pomo-save');
    const $pomoCancle = document.querySelector('#pomo-cancle');

    $pomoTime.addEventListener('keyup', ({ target }) => {
      if (target.value > 60) {
        target.value = '';
        alert('60분 이하로 작성해주세요');
      }
    });

    $pomoSave.addEventListener('click', (e) => {
      let pomoTitleValue = $pomoTitle.value.trim();
      let pomoTimeValue = $pomoTime.value.trim();

      if (!pomoTitleValue || !pomoTimeValue) {
        alert('빠짐 없이 입력해주세요.');
        return;
      }

      let biggestNum = [...this.filteredDataList].sort((a, b) => b.id - a.id)[0]
        .id;

      this.addListLvl2Item({
        id: ++biggestNum,
        pomoTitle: $pomoTitle.value,
        pomoTime: $pomoTime.value,
      });
      // todo : render list lvl2
      // this.addItem({ pomoTitle: $pomoTitle.value, pomoTime: $pomoTime.value });
    });

    $pomoCancle.addEventListener('click', (e) => {
      pomoTitle.value = '';
      pomoTime.value = '';
      this.toggleItemLvl2;
    });
  }

  toggleItemLvl2() {
    this.$addItemLvl2Container.classList.toggle('hidden');
  }

  addItem({ pomoTitle, pomoTime }) {
    // const newId;
    // const upperLvlId;
    // const newListLvl2Item = {
    //   lvl: 2,
    //   id: newId,
    //   upperLvlId: upperLvlId,
    //   title: pomoTitle,
    //   time: 0,
    //   pomoCnt: pomoTime,
    //   isFinish: false,
    // };
  }
  delItem() {}
}
