// console.log('### listLvl2.js');

import { ListHeader } from './header';

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
    this.$addItemLvl2Container = document.querySelector(
      this.addItemLvl2Selector,
    );

    this.eventBinding();

    this.ListHeader = new ListHeader({
      headerSelector,
      changeEvent: {
        // [issue]scope
        toggleItemLvl2: () => this.toggleItemLvl2(),
        // toggleItemLvl2: this.toggleItemLvl2.bind(this),
      },
    });

    console.log(this.ListHeader);
  }

  renderList(clickedListLvl1Inst) {
    this.ListHeader.render({
      lvl: 2,
      lvl1Inst: clickedListLvl1Inst,
      data: this.data,
      // target: this.$listLvl2HeaderContainer,
    });

    // lvl2 header
    // lvl2 content
  }

  eventBinding() {}

  toggleItemLvl2() {
    this.$addItemLvl2Container.classList.toggle('hidden');
  }
}
