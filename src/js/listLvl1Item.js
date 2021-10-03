export class ListLvl1Item {
  constructor({ id, title, count }) {
    this.id = id;
    this.title = title;
    this.count = count;
  }

  render() {
    this.$listLvl1Item = document.createElement('div');
    this.$listLvl1Item.classList.add('listLvl1-item');
    this.$listLvl1Item.dataset.index = this.id;
    const listLvl1ItemTemplate = `
      <div class="listLv1-item-left">
        <div class="icon-container">
          <label class="listLv1-item-icon">🔥</label>
        </div>
        <div class="listLv1-item-title-outer">
          <label class="listLv1-item-title item-title">${this.title}</label>
        </div>
      </div>
      <div class="listLv1-item-right">
        <div class="icon-container">
          <label class="delListLvl1 del-icon"></label>
        </div>
        <div class="listLv1-item-count-outer">
          <label class="listLv1-item-count">${this.count}</label>
        </div>
      </div>
    `;
    this.$listLvl1Item.insertAdjacentHTML('afterbegin', listLvl1ItemTemplate);
    this.$listLvl1Item.inst = this;
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
