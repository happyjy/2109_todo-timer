// console.log('### listLvl1.js');

import { bind } from 'file-loader';

export class listLvl1 {
  constructor({
    selector,
    headerSelector,
    contentSelector,
    data,
    dataField,
    changeEvent,
  }) {
    // console.log(
    //   '### listLvl1 > constructor',
    //   selector,
    //   headerSelector,
    //   contentSelector,
    //   data,
    //   dataField,
    // );

    this.selector = selector;
    this.headerSelector = headerSelector;
    this.contentSelector = contentSelector;
    this.data = data;
    this.dataField = dataField;
    // lvlField, idField, titleField, countField

    this.$listLvl1HeaderContainer = document.querySelector(headerSelector);
    this.$listLvl1ContentContainer = document.querySelector(contentSelector);

    const { listLvl1Header, listLvl1Content } = this.initialize(
      [this.$listLvl1HeaderContainer, this.$listLvl1ContentContainer],
      data,
    );
    this.eventBinding();

    this.onAddListLvl1 = changeEvent.onAddListLvl1;
    this.onDelListLvl1 = changeEvent.onDelListLvl1;
    this.onModifyListLvl1 = changeEvent.onModifyListLvl1;
    this.onClickListLvlItem = changeEvent.onClickListLvlItem;
  }

  initialize([$listLvl1HeaderContainer, $listLvl1ContentContainer], listData) {
    // # lvl1 header
    //  * 추가 기능
    const $listLvl1Header = document.createElement('div');
    $listLvl1Header.classList.add(...['listLvl1-header', 'list-header']);
    const listLvl1HeaderTemplate = `
      <label class="listLvl1-title header-title">목록</label>
      <div id="addListLvl1" class="icon-container">
        <label class="add-icon"></label>
      </div>
    `;
    $listLvl1Header.insertAdjacentHTML('afterbegin', listLvl1HeaderTemplate);
    $listLvl1HeaderContainer.appendChild($listLvl1Header);

    // # lvl1 content
    //  * 삭제 기능
    const $listLvl1Content = this.renderListLvl1(
      $listLvl1ContentContainer,
      listData,
    );

    return { $listLvl1Header, $listLvl1Content };
  }

  renderListLvl1($listLvl1ContentContainer, listData) {
    debugger;
    if ($listLvl1ContentContainer.innerHTML) {
      $listLvl1ContentContainer.innerHTML = '';
    }

    let template = '<div class="listLvl1-content">';
    this.listLvl1ItemInst = [];
    listData.forEach((v) => {
      const inst = new listLvl1Item(v);
      this.listLvl1ItemInst.push(inst);
      template += inst.getHtml();
    });

    // listData.forEach((data) => {
    //   // lvlField, idField, titleField, countField
    //   template += `
    //     <div class="listLvl1-item" data-index=${data.id}>
    //       <div class="listLv1-item-left">
    //         <div class="icon-container">
    //           <label class="listLv1-item-icon">🔥</label>
    //         </div>
    //         <div class="listLv1-item-title-outer">
    //           <label class="listLv1-item-title item-title">${data.title}</label>
    //         </div>
    //       </div>
    //       <div class="listLv1-item-right">
    //         <div id="delListLvl1" class="icon-container" data-index=${data.id}>
    //           <label class="del-icon"></label>
    //         </div>
    //         <div class="listLv1-item-count-outer">
    //           <label class="listLv1-item-count">${data.count}</label>
    //         </div>
    //       </div>
    //     </div>
    //   `;
    // });
    template += '</div>';
    $listLvl1ContentContainer.innerHTML = template;
    const $listLvl1Content = document.querySelector('.listLvl1-content');
  }

  eventBinding() {
    /*
      [x]목록 추가 클릭
      [x]목록 추가 취소 (esc)
      [x]목록 추가 (enter)
      []목록 리스트 삭제
      []목록 리스트 클릭 -> 할일 list render
     */
    const $listLv1ItemInput = document.querySelector('#listLv1-item-input');
    // 목록 추가 클릭
    document.querySelector('#addListLvl1').addEventListener('click', () => {
      // 목록 추가 input dom
      this.$displayAddListLvl1 = this.displayAddListLvl1();
      $listLv1ItemInput.focus();
    });
    // 목록 추가 취소 (esc)
    // 목록 추가 (enter)
    $listLv1ItemInput.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'Escape':
          //keyCode 27
          e.target.value = '';
          this.displayAddListLvl1();
          break;
        case 'Enter':
          //keyCode 13
          this.addDate(e.target.value);
          this.renderListLvl1(this.$listLvl1ContentContainer, this.data);
          // this.displayAddListLvl1();
          break;

        default:
          break;
      }
    });
    // 목록 리스트 삭제
    document.querySelector('#delListLvl1').addEventListener('click', (e) => {
      debugger;
      this.data = this.data.filter((v) => v.id !== e.target.dataset.index);
      this.renderListLvl1(this.$listLvl1ContentContainer, this.data);
    });
    // 목록 리스트 클릭 -> 할일 list render
  }

  displayAddListLvl1() {
    const target = document.querySelector('#add-listLvl1-item');
    target.classList.toggle('hidden');
  }

  addDate(title) {
    let biggestNum = [...this.data].sort((a, b) => b.id - a.id)[0].id;
    const listData = {
      lvl: 1,
      id: ++biggestNum,
      title,
      count: 0,
    };
    this.data.push(listData);

    e.target.value = '';
  }

  removeData() {}

  getData() {
    return this.data;
  }
}

export class listLvl1Item {
  constructor({ id, title, count }) {
    this.id = id;
    this.title = title;
    this.count = count;
    this.template = `
      <div class="listLvl1-item" data-index=${id}>
        <div class="listLv1-item-left">
          <div class="icon-container">
            <label class="listLv1-item-icon">🔥</label>
          </div>
          <div class="listLv1-item-title-outer">
            <label class="listLv1-item-title item-title">${title}</label>
          </div>
        </div>
        <div class="listLv1-item-right">
          <div id="delListLvl1" class="icon-container">
            <label class="del-icon"></label>
          </div>
          <div class="listLv1-item-count-outer">
            <label class="listLv1-item-count">${count}</label>
          </div>
        </div>
      </div>
    `;
  }
  getHtml() {
    return this.template;
  }
  getIndex() {
    return this.id;
  }
}
