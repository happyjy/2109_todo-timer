// console.log('### listLvl2.js');

import { ListHeader } from './header';

export class listLvl2 {
  constructor({ selector, headerSelector, contentSelector, data }) {
    console.log({ selector, headerSelector, contentSelector, data });

    this.selector = selector;
    this.headerSelector = headerSelector;
    this.contentSelector = contentSelector;
    this.data = data;

    this.$listLvl2HeaderContainer = document.querySelector(this.headerSelector);

    this.eventBinding();

    this.ListHeader = new ListHeader({
      headerSelector,
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
}
