export class ListLvl2Item {
  constructor({
    contentSelector,
    lvl2Data,
    changeEvent: { addItem, delItem },
  }) {
    this.contentSelector = contentSelector;
    this.addItem = addItem;
    this.delItem = delItem;
    this.lvl2Data = lvl2Data;

    this.$listLvl2ContentContainer = document.querySelector(
      this.contentSelector,
    );
    // this.initialize();
  }

  initialize() {
    this.render();
  }

  render({ lvl, id, upperLvlId, title, time, pomoCnt, isFinish }) {
    this.$listLvl2ContentContainer.innerHTML = '';

    this.$listLvl2Item = document.createElement('div');
    this.$listLvl2Item.classList.add('listLvl2-item');
    this.$listLvl2Item.dataset.index = id;
    let listLvl2HeaderTemplate = `
      <div class="listLvl2-item-left">
        <div class="listLvl2-check">
          <input type="checkbox" />
        </div>
        <div class="listLvl2-item-title-outer">
          <label class="listLv2-item-title">
            ${title}
          </label>
        </div>
        <div class="listLvl2-item-time-outer">
          <label class="listLv2-item-time">(${time})</label>
        </div>
        <div class="listLvl2-item-pomo-icon icon-container">
          <label class="listLv1-item-icon">🎖</label>
        </div>
        <div class="listLv2-item-pomo-count-outer">
          <label class="listLv2-item-pomo-count">3</label>
        </div>
      </div>
      <div class="listLvl2-item-right">
        <div class="listLvl2-item-time-count-outer">
          <label class="listLv2-item-time-count">09:33</label>
        </div>
        <div class="listLvl2-item-status">
          <div class="listLvl2-item-start hidden">
            <label class="">▶️</label>
          </div>
          <div class="listLvl2-item-pause hidden">
            <label class="">⏸</label>
          </div>
          <div class="listLvl2-item-stop">
            <label class="">⏹</label>
          </div>
        </div>
        <div class="listLvl2-item-status-del icon-container">
          <label class="del-icon"></label>
        </div>
      </div>
    `;

    this.$listLvl2Item.insertAdjacentHTML('afterbegin', listLvl2HeaderTemplate);
    this.$listLvl2Item.inst = this;

    this.eventBinding();
  }

  eventBinding() {
    //todo
  }
  getDom() {
    return this.$listLvl2Item;
  }
}
