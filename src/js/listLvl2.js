// console.log('### listLvl2.js');

import { getDomHasInst } from './common';
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

    this.filteredListLvl2 = [];
    this.listLvl2ItemInstList = [];

    this.addListLvl2Item = addListLvl2Item;
    this.renderListLvl1 = renderListLvl1;

    this.$listLvl2HeaderContainer = document.querySelector(this.headerSelector);
    this.$listLvl2ContentContainer = document.querySelector(
      this.contentSelector,
    );
    this.$addItemLvl2Container = document.querySelector(
      this.addItemLvl2Selector,
    );

    this.ListHeaderInst = new ListHeader({
      headerSelector,
      addItemLvl2Selector: this.addItemLvl2Selector,
      changeEvent: {
        toggleItemLvl2: (opt) => this.toggleItemLvl2(opt),
      },
    });

    this.eventBinding();
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
    this.ListHeaderInst.render({
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
          toggleItemLvl2: this.toggleItemLvl2.bind(this),
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
    // const $addItemLvl2Container = document.querySelector('.add-item-lvl2-container');
    const $listLvl2ItemLeft = document.querySelector('.listLvl2-item-left');
    const $listLv2ItemTitleList = document.querySelectorAll(
      '.listLv2-item-title',
    );

    const $pomoTitle = document.querySelector('#pomo-title');
    const $pomoTime = document.querySelector('#pomo-time');
    const $pomoSave = document.querySelector('#pomo-save');
    const $pomoCancle = document.querySelector('#pomo-cancle');

    // // title 클릭 -> 내용 수정
    // $listLv2ItemTitleList.forEach(($listLv2ItemTitle) => {
    //   $listLv2ItemTitle.addEventListener('click', (e) => {
    //     const domHasInst = getDomHasInst(e.target);
    //     if (domHasInst) {
    //       const clickedData = domHasInst.inst.lvl2Data;
    //       const title = clickedData.title;
    //       const time = clickedData.time;
    //       $pomoTitle.value = title;
    //       $pomoTime.value = time;

    //       this.toggleItemLvl2({ id: clickedData.id, isNew: false });
    //     }
    //   });
    // });

    // 할일 추가 버튼
    this.$addItemLvl2Container.addEventListener('click', function (e) {
      if (this.dataset.isNew === 'true') {
        e.target.value = '';
      }
    });

    $pomoTitle.addEventListener('click', (e) => {});
    $pomoTime.addEventListener('keyup', ({ target }) => {
      if (target.value > 60) {
        target.value = '';
        alert('60분 이하로 작성해주세요');
      }
    });
    $pomoSave.addEventListener('click', (e) => {
      e.stopPropagation();
      let pomoTitleValue = $pomoTitle.value.trim();
      let pomoTimeValue = $pomoTime.value.trim();

      if (!pomoTitleValue || !pomoTimeValue) {
        alert('빠짐 없이 입력해주세요.');
        return;
      }

      // 신규, 수정 구분
      if (this.$addItemLvl2Container.dataset.isNew === 'true') {
        // 할 일 추가
        let biggestNum =
          this.listLvl2Dummy.length === 0
            ? 0
            : [...this.listLvl2Dummy].sort((a, b) => b.id - a.id)[0].id;

        const newListLvl2Item = {
          lvl: 2,
          id: ++biggestNum,
          upperLvlId: this.clickedListLvl1Inst.id,
          title: pomoTitleValue,
          time: pomoTimeValue,
          pomoCnt: 0,
          isFinish: false,
        };

        this.listLvl2Dummy.splice(
          this.listLvl2Dummy.length,
          0,
          newListLvl2Item,
        );

        $pomoTitle.value = '';
        $pomoTime.value = '';

        this.filteredListLvl2 = this.listLvl2Dummy.filter(
          (v) => v.upperLvlId === this.clickedListLvl1Inst.id,
        );

        // 목록 update
        const modifiedLvl1Data = this.listLvl1Dummy.map((v) => {
          if (v.id === this.clickedListLvl1Inst.id) {
            ++v.count;
          }
          return v;
        });
        this.renderListLvl1(modifiedLvl1Data);
      } else {
        const id = parseInt(this.$addItemLvl2Container.dataset.id);
        this.filteredListLvl2 = this.filteredListLvl2.map((v) => {
          if (v.id === id) {
            v.title = pomoTitleValue;
            v.time = pomoTimeValue;
          }
          return v;
        });
        // this.filteredListLvl2 =
      }

      // update
      // 할 일 update
      this.render(this.clickedListLvl1Inst, this.filteredListLvl2);
      this.toggleItemLvl2();
    });
    $pomoCancle.addEventListener('click', (e) => {
      $pomoTitle.value = '';
      $pomoTime.value = '';
      this.toggleItemLvl2();
    });
  }

  toggleItemLvl2() {
    if (arguments.length === 1) {
      const { id, isNew } = arguments[0];

      if (this.$addItemLvl2Container.dataset.id !== id + '') {
        this.$addItemLvl2Container.classList.remove('hidden');
      } else {
        this.$addItemLvl2Container.classList.toggle('hidden');
      }

      this.$addItemLvl2Container.dataset.isNew = isNew + '' || '';
      this.$addItemLvl2Container.dataset.id = id;
    } else if (arguments.length === 0) {
      this.$addItemLvl2Container.classList.toggle('hidden');

      this.$addItemLvl2Container.dataset.isNew = '';
      this.$addItemLvl2Container.dataset.id = '';
    }
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
