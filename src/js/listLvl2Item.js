import { getDomHasInst } from './common';

export class ListLvl2Item {
  constructor({
    contentSelector,
    lvl2Data,
    changeEvent: { delItem, toggleItemLvl2 },
  }) {
    this.contentSelector = contentSelector;
    this.delItem = delItem;
    this.toggleItemLvl2 = toggleItemLvl2;
    this.lvl2Data = lvl2Data;

    this.pomoCountSelector = '.pomo-count';
    this.pomoStatusSelector = '.pomo-status';
    this.pomoDelSelector = '.pomo-del';

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
          <label class="listLv2-item-title cursor-pointer">
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
          <label class="listLv2-item-pomo-count">${pomoCnt}</label>
        </div>
      </div>
      <div class="listLvl2-item-right">
        <div class="listLvl2-item-time-count-outer">
          <label class="pomo-count listLv2-item-time-count"></label>
        </div>
        <div class="pomo-status listLvl2-item-status">
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
        <div class="pomo-del listLvl2-item-status-del icon-container">
          <label class="del-icon"></label>
        </div>
      </div>
    `;

    this.$listLvl2Item.insertAdjacentHTML('afterbegin', listLvl2HeaderTemplate);
    this.$listLvl2Item.inst = this;

    this.eventBinding();
  }

  eventBinding() {
    /*
     * 1. stop, start
     * (pause, start는 header에서만 가능)
     * 2. delete Item lvl2
     */
    // 1. stop, start
    // 2. delete Item lvl2

    // this.$listLvl2Item
    //   .querySelector(this.pomoCountSelector)
    //   .addEventListener('click', () => {});
    // this.$listLvl2Item
    //   .querySelector(this.pomoStatusSelector)
    //   .addEventListener('click', () => {});
    const $pomoTitle = document.querySelector('#pomo-title');
    const $pomoTime = document.querySelector('#pomo-time');

    const $listLv2ItemTitleList = this.$listLvl2Item.querySelectorAll(
      '.listLv2-item-title',
    );
    // title 클릭 -> 내용 수정
    $listLv2ItemTitleList.forEach(($listLv2ItemTitle) => {
      $listLv2ItemTitle.addEventListener('click', (e) => {
        const domHasInst = getDomHasInst(e.target);
        if (domHasInst) {
          const clickedData = domHasInst.inst.lvl2Data;
          const title = clickedData.title;
          const time = clickedData.time;
          $pomoTitle.value = title;
          $pomoTime.value = time;

          this.toggleItemLvl2({ id: clickedData.id, isNew: false });
        }
      });
    });

    this.$listLvl2Item
      .querySelector(this.pomoDelSelector)
      .addEventListener('click', (e) => {
        const domHasInst = getDomHasInst(e.target);
        this.delItem(domHasInst.inst.lvl2Data.id);
      });
  }

  getDom() {
    return this.$listLvl2Item;
  }
}
