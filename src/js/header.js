export class ListHeader {
  constructor({
    headerSelector,
    /* , event */
    toggleAddList,
    changeEvent: { toggleItemLvl2 },
  }) {
    // this.$listLvl1HeaderContainer = document.querySelector(selector);
    this.headerSelector = headerSelector;
    this.addItemId = 'addItem';
    this.toggleAddList = toggleAddList;

    this.toggleItemLvl2 = toggleItemLvl2;
    this.$listLvl2HeaderContainer = document.querySelector(this.headerSelector);
  }

  initialize() {
    this.render();
  }

  render({ lvl1Inst, data }) {
    this.$listLvl2HeaderContainer.innerHTML = '';

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
        <div class="listLvl2-Count">0/${filteredDataList.length}</div>
      </div>
    `;
    $listHeader.insertAdjacentHTML('afterbegin', listLvl2HeaderTemplate);
    this.$listLvl2HeaderContainer.appendChild($listHeader);

    this.eventBinding();
  }

  eventBinding() {
    const $addItem = document.querySelector(`#${this.addItemId}`);
    const $listLv1ItemInput = document.querySelector('#listLv1-item-input');

    // 목록 추가 클릭
    $addItem.addEventListener('click', () => {
      // 목록 추가 input dom
      this.$displayAddListLvl1 = this.toggleItemLvl2();
      $listLv1ItemInput.focus();
    });
    // 목록 추가 클릭
    document.querySelector('#addListLvl1').addEventListener('click', () => {
      // 목록 추가 input dom
      this.$displayAddListLvl1 = this.toggleItemLvl1();
      $listLv1ItemInput.focus();
    });

    // 목록 추가 취소 (esc)
    // 목록 추가 (enter)
    $listLv1ItemInput.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'Escape':
          //keyCode 27
          e.target.value = '';
          this.toggleItemLvl1();
          break;
        case 'Enter':
          //keyCode 13
          this.addDate(e.target.value);
          this.toggleItemLvl1();
          e.target.value = '';
          break;

        default:
          break;
      }
    });
  }

  toggleItemLvl1() {
    const target = document.querySelector('#add-item-lvl1');
    target.classList.toggle('hidden');
  }

  // addDate(title) {
  //   let biggestNum = [...this.data].sort((a, b) => b.id - a.id)[0].id;
  //   const listData = {
  //     lvl: 1,
  //     id: ++biggestNum,
  //     title,
  //     count: 0,
  //   };
  //   this.data.push(listData);
  //   this.renderListLvl1(this.$listLvl1ContentContainer, this.data);
  //   return this.data;
  // }
}
