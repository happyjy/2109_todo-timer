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
  }) {
    this.selector = selector;
    this.headerSelector = headerSelector;
    this.contentSelector = contentSelector;
    this.addItemLvl2Selector = addItemLvl2Selector;
    this.data = data;

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
        // [issue]scope
        toggleItemLvl2: () => this.toggleItemLvl2(),
      },
    });

    this.listLvl2ItemInstList = [];
  }

  renderList(clickedListLvl1Inst) {
    const filteredDataList = this.data.filter(
      (v) => v.upperLvlId === clickedListLvl1Inst.id,
    );

    // lvl2 header
    this.ListHeader.render({
      lvl1Inst: clickedListLvl1Inst,
      data: filteredDataList,
    });

    // lvl2 content
    const $listLvl2Content = document.createElement('div');
    $listLvl2Content.classList.add('listLvl2-content');
    filteredDataList.forEach((v) => {
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

  eventBinding() {}

  toggleItemLvl2() {
    this.$addItemLvl2Container.classList.toggle('hidden');
  }

  addItem() {}
  delItem() {}
}
