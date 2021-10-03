export class ListHeader {
  constructor({
    headerSelector,
    addItemLvl2Selector,
    toggleAddList,
    changeEvent: { toggleItemLvl2 },
  }) {
    // this.$listLvl1HeaderContainer = document.querySelector(selector);
    this.headerSelector = headerSelector;
    this.addItemId = 'addItem';
    this.toggleAddList = toggleAddList;

    this.toggleItemLvl2 = toggleItemLvl2;
    this.$listLvl2HeaderContainer = document.querySelector(this.headerSelector);

    this.$addItemLvl2Container = document.querySelector(addItemLvl2Selector);

    this.$listLvl1ItemInput = document.querySelector('#listLvl1-item-input');
    this.$pomoTitle = document.querySelector('#pomo-title');
  }

  initialize() {
    this.render();
  }

  render({ lvl1Inst, data }) {
    this.$listLvl2HeaderContainer.innerHTML = '';

    const finishCnt = data.filter((v) => {
      return v.isFinish;
    }).length;
    const $listHeader = document.createElement('div');
    $listHeader.classList.add('list-header');
    const filteredDataList = data.filter((v) => v.upperLvlId === lvl1Inst.id);

    const listLvl2HeaderTemplate = `
      <div class="listLvl2-header-left">
        <div class="listLvl2-title header-title">${lvl1Inst.title}</div>
        <div id="${this.addItemId}" class="icon-container">
          <label class="add-icon"></label>
        </div>
      </div>
      <div class="listLvl2-header-right">
        <div class="listLvl2-Count"><label id="finishTodo">${finishCnt}</label>/${filteredDataList.length}</div>
      </div>
    `;
    $listHeader.insertAdjacentHTML('afterbegin', listLvl2HeaderTemplate);
    this.$listLvl2HeaderContainer.appendChild($listHeader);

    this.eventBinding();
  }

  eventBinding() {
    // 목록 추가 클릭
    this.$addItem = document.querySelector(`#${this.addItemId}`);
    this.$addItem.addEventListener('click', () => {
      // 목록 추가 input dom
      this.$displayAddListLvl1 = this.toggleItemLvl2({
        id: 'new',
        isNew: true,
      });
      // this.$pomoTitle.focus();
      this.$pomoTitle.value = '새로운 할 일 입력';
    });

    // // 목록 추가 클릭
    // document.querySelector('#addListLvl1').addEventListener('click', () => {
    //   // 목록 추가 input dom
    //   this.$displayAddListLvl1 = this.toggleItemLvl1();
    //   this.$listLvl1ItemInput.focus();
    // });

    // 목록 추가 취소 (esc)
    // 목록 추가 (enter)
    // this.$listLvl1ItemInput.addEventListener('keyup', (e) => {
    //   switch (e.key) {
    //     case 'Escape':
    //       //keyCode 27
    //       e.target.value = '';
    //       this.toggleItemLvl1();
    //       break;
    //     case 'Enter':
    //       //keyCode 13
    //       this.addData(e.target.value);
    //       this.toggleItemLvl1();
    //       e.target.value = '';
    //       break;

    //     default:
    //       break;
    //   }
    // });
  }

  close() {
    // this.$addItem = document.querySelector(`#${this.addItemId}`);
    this.$addItemLvl2Container.classList.add('hidden');
    this.$listLvl1ItemInput.value = '';
    this.$pomoTitle.value = '';
  }

  // toggleItemLvl1() {
  //   const target = document.querySelector('#add-item-lvl1');
  //   target.classList.toggle('hidden');
  // }
}
