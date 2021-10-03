export class ListLvl1Item {
  constructor({ id, title, count }) {
    this.id = id;
    this.title = title;
    this.count = count;
  }

  render() {
    this.$listLvl1Item = document.createElement('div');
    this.$listLvl1Item.classList.add(...['listLvl1-item', 'cursor-pointer']);
    this.$listLvl1Item.dataset.index = this.id;
    const listLvl1ItemTemplate = `
      <div class="listLvl1-item-left">
        <div class="icon-container">
          <label class="listLvl1-item-icon">🔥</label>
        </div>
        <div class="listLvl1-item-title-outer">
          <label class="listLvl1-item-title item-title">${this.title}</label>
        </div>
      </div>
      <div class="listLvl1-item-right">
        <div class="lvl1-item-del icon-container">
          <label class="delListLvl1 del-icon"></label>
        </div>
        <div class="listLvl1-item-count-outer">
          <label class="listLvl1-item-count">${this.count}</label>
        </div>
      </div>
    `;
    this.$listLvl1Item.insertAdjacentHTML('afterbegin', listLvl1ItemTemplate);
    this.$listLvl1Item.inst = this;

    this.eventBinding();
  }
  eventBinding() {
    // this.$listLvl1Item
    //   .querySelector('.lvl1-item-del')
    //   .addEventListener('click', (e) => {});
    // this.$listLvl1Item.addEventListener('click', (e) => {});
  }

  heighLight(id) {}
  getDom() {
    return this.$listLvl1Item;
  }
  getHtml() {
    // return this.template;
    return this.$listLvl1Item.outerHTML;
  }
  getIndex() {
    return this.id;
  }
  getInst() {
    return this;
  }
}
