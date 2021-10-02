// console.log('### listLvl2.js');

import { ListHeader } from './header';
import { ListLvl2Item } from './listLvl2Item';

export class listLvl2 {
  constructor({
    selector,
    headerSelector,
    contentSelector,
    addItemLvl2Selector,
    data: { listLvl1Dummy, listLvl2Dummy },
    changeEvent: { addListLvl2Item, renderListLvl1 },
  }) {
    this.selector = selector;
    this.headerSelector = headerSelector;
    this.contentSelector = contentSelector;
    this.addItemLvl2Selector = addItemLvl2Selector;
    this.listLvl1Dummy = listLvl1Dummy;
    this.listLvl2Dummy = listLvl2Dummy;

    this.addListLvl2Item = addListLvl2Item;
    this.renderListLvl1 = renderListLvl1;

    this.filteredListLvl2 = [];

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

  render(clickedListLvl1Inst, filteredListLvl2) {
    if (arguments.length === 1) {
      this.filteredListLvl2 = this.listLvl2Dummy.filter(
        (v) => v.upperLvlId === clickedListLvl1Inst.id,
      );
    } else if (arguments.length === 2) {
      this.filteredListLvl2 = filteredListLvl2;
    }

    this.clickedListLvl1Inst = clickedListLvl1Inst;

    // lvl2 header
    this.ListHeader.render({
      lvl1Inst: clickedListLvl1Inst,
      data: this.filteredListLvl2,
    });

    // lvl2 content
    this.$listLvl2ContentContainer.innerHTML = '';
    const $listLvl2Content = document.createElement('div');
    $listLvl2Content.classList.add('listLvl2-content');
    this.filteredListLvl2.forEach((v) => {
      const listLvl2ItemInst = new ListLvl2Item({
        contentSelector: this.contentSelector,
        lvl1Inst: clickedListLvl1Inst,
        lvl2Data: v,
        changeEvent: {
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

      let biggestNum =
        this.listLvl2Dummy.length === 0
          ? 0
          : [...this.listLvl2Dummy].sort((a, b) => b.id - a.id)[0].id;
      this.filteredListLvl2 = this.addListLvl2Item({
        id: ++biggestNum,
        pomoTitle: $pomoTitle.value,
        pomoTime: $pomoTime.value,
      });

      $pomoTitle.value = '';
      $pomoTime.value = '';

      const modifiedLvl1Data = this.listLvl1Dummy.map((v) => {
        debugger;
        if (v.id === this.clickedListLvl1Inst.id) {
          v.count = this.filteredListLvl2.length;
        }
        return v;
      });

      this.toggleItemLvl2();
      this.render(this.clickedListLvl1Inst, this.filteredListLvl2);
      this.renderListLvl1(modifiedLvl1Data);
    });

    $pomoCancle.addEventListener('click', (e) => {
      $pomoTitle.value = '';
      $pomoTime.value = '';
      this.toggleItemLvl2();
    });
  }

  toggleItemLvl2() {
    this.$addItemLvl2Container.classList.toggle('hidden');
  }

  delItem(id) {
    console.log('### delItem');
    const delUpperLvlId = this.filteredListLvl2[0].upperLvlId;

    const idArr = this.listLvl2Dummy.map((v) => v.id);
    const idIdx = idArr.indexOf(id);
    this.listLvl2Dummy.splice(idIdx, 1);

    // const result = this.listLvl2Dummy.filter((v) => v.id !== id);
    // console.log(this.listLvl2Dummy);
    this.filteredListLvl2 = this.listLvl2Dummy.filter(
      (v) => v.upperLvlId === delUpperLvlId,
    );
    // this.filteredListLvl2 = this.filteredListLvl2.filter((v) => v.id !== id);

    const modifiedLvl1Data = this.listLvl1Dummy.map((v) => {
      if (v.id === delUpperLvlId) {
        v.count = this.filteredListLvl2.length;
      }
      return v;
    });

    this.render(this.clickedListLvl1Inst, this.filteredListLvl2);
    this.renderListLvl1(modifiedLvl1Data);
    return this.listLvl2Dummy;
  }
}
