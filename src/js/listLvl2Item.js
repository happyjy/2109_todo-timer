import { getDomHasInst } from './common';
import { Timer } from './Timer';
// import { Timer } from './Timer';

export class ListLvl2Item {
  constructor({
    contentSelector,
    lvl1Inst,
    lvl2Data,
    timer,
    timerStatus: { setPending, getPending },
    changeEvent: {
      toggleItemLvl2,
      delItem,
      clearTodoTime,
      finishTodo,
      pomoStop,
      unCheckTodo,
    },
  }) {
    this.contentSelector = contentSelector;
    this.toggleItemLvl2 = toggleItemLvl2;
    this.delItem = delItem;
    this.clearTodoTime = clearTodoTime;
    this.finishTodo = finishTodo;
    this.pomoStop = pomoStop;
    this.unCheckTodo = unCheckTodo;
    this.lvl1Inst = lvl1Inst;
    this.lvl2Data = lvl2Data;

    this.timer = timer;
    this.timerStatus = { setPending, getPending };

    this.pomoCountSelector = '.pomo-count';
    this.pomoStatusSelector = '.pomo-status';
    this.pomoDelSelector = '.pomo-del';

    this.$listLvl2ContentContainer = document.querySelector(
      this.contentSelector,
    );
  }

  render({ lvl, id, upperLvlId, title, time, pomoCnt, isFinish }) {
    this.$listLvl2ContentContainer.innerHTML = '';

    this.$listLvl2Item = document.createElement('div');
    this.$listLvl2Item.classList.add('listLvl2-item');
    this.$listLvl2Item.dataset.index = id;
    let listLvl2HeaderTemplate = `
      <div class="listLvl2-item-left ${isFinish ? 'finishTodo' : ''}">
        <div class="listLvl2-check">
          <input ${
            isFinish ? ' checked ' : ' disabled '
          }class="pomo-check" type="checkbox" />
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
          <label class="pomo-count listLv2-item-pomo-count">${pomoCnt}</label>
        </div>
      </div>
      <div class="listLvl2-item-right">
        <div class="listLvl2-item-time-count-outer">
          <label class="pomo-time-count listLv2-item-time-count"></label>
        </div>
        <div class="pomo-status listLvl2-item-status ${
          isFinish ? 'hidden' : ''
        }">
          <div class="listLvl2-item-start">
            <label class="pomo-start cursor-pointer">▶️</label>
          </div>
          <div class="listLvl2-item-pause ">
            <label class="pomo-pause cursor-pointer hidden">⏸</label>
          </div>
          <div class="listLvl2-item-stop ">
            <label class="pomo-stop cursor-pointer hidden">⏹</label>
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

    let data = this.lvl2Data;

    const $pomoLeftContainer = this.$listLvl2Item.querySelector(
      '.listLvl2-item-left',
    );
    const $pomoCheck = this.$listLvl2Item.querySelector('.pomo-check');
    const $pomoTimeCount = this.$listLvl2Item.querySelector('.pomo-time-count');
    const $pomoStatus = this.$listLvl2Item.querySelector('.pomo-status');
    const $pomoStart = this.$listLvl2Item.querySelector('.pomo-start');
    const $pomoPause = this.$listLvl2Item.querySelector('.pomo-pause');
    const $pomoStop = this.$listLvl2Item.querySelector('.pomo-stop');

    $pomoCheck.addEventListener('change', (e) => {
      const domHasInst = getDomHasInst(e.target);
      this.unCheckTodo(domHasInst.inst.lvl2Data.id);
    });

    const $headerPomoStart = document.querySelector('.header-pomo-start');
    const $headerPomoPause = document.querySelector('.header-pomo-pause');
    const $headerPomoStop = document.querySelector('.header-pomo-stop');

    const $headerDefaultTitle = document.querySelector('.header-default-title');
    const $headerCustomCheckbox = document.querySelector(
      '.header-custom-checkbox',
    );
    const $headerCustomTitle = document.querySelector('.header-custom-title');
    const $headerTitle = document.querySelector('.header-title');
    const $headerPomoTimeCount = document.querySelector(
      '.header-pomo-time-count',
    );

    this.$listLvl2Item
      .querySelector(this.pomoStatusSelector)
      .addEventListener('click', (e) => {
        // HEADER 설정
        $headerDefaultTitle.classList.add('hidden');
        $headerCustomTitle.classList.remove('hidden');
        $headerPomoStart.classList.add('hidden');
        $headerPomoPause.classList.remove('hidden');
        $headerCustomCheckbox.checked = false;
        $headerTitle.innerHTML = `${this.lvl1Inst.title} / ${this.lvl2Data.title}`;

        if (e.target.classList.contains('pomo-start')) {
          const { time } = data;
          this.clearTodoTime();
          this.timer.setTargetDom($pomoTimeCount);
          this.timer.setStatusDom({
            $pomoStatus,
            $pomoStart,
            $pomoPause,
            $pomoStop,
            $headerCustomCheckbox,
            $headerPomoTimeCount,
          });
          this.timer.setIsRunning(true);
          this.timer.setPending(false);
          $pomoTimeCount.innerHTML = `${time}:00`;
          this.timer.setMinute(time);
          this.timer.startCountDownTimer(time);
          this.timer.finishTodo(() => {
            const domHasInst = getDomHasInst(e.target);
            this.finishTodo(domHasInst.inst.lvl2Data.id);
            this.timer.stopCountDownTimer(false);
          });
        } else if (e.target.classList.contains('pomo-stop')) {
          this.timer.stopCountDownTimer();
          this.timer.setIsRunning(false);
          this.pomoStop();

          $headerDefaultTitle.classList.remove('hidden');
          $headerCustomTitle.classList.add('hidden');
        }
      });
  }

  getDom() {
    return this.$listLvl2Item;
  }
}
