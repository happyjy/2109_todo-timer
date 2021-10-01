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
    this.selector = selector;
    this.headerSelector = headerSelector;
    this.contentSelector = contentSelector;
    this.data = data;
    this.listLvl1ItemInst = [];
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
    if ($listLvl1ContentContainer.innerHTML) {
      $listLvl1ContentContainer.innerHTML = '';
    }

    // # List lvl1 item
    const $listLvl1Content = document.createElement('div');
    $listLvl1Content.classList.add('listLvl1-content');
    // let template = '<div class="listLvl1-content">';
    listData.forEach((v) => {
      const inst = new listLvl1Item(v);
      this.listLvl1ItemInst.push(inst);
      $listLvl1Content.appendChild(inst.getDom());
    });

    // # add List lvl1 item
    // const $addListLvl1Item = document.createElement('div');
    // $addListLvl1Item.classList.add('hidden');
    // const addListLvl1Item = `
    //   <div class="add-listLvl1-item listLvl1-item">
    //     <div class="listLv1-item-left">
    //       <div class="icon-container">
    //         <label class="listLv1-item-icon">🔥</label>
    //       </div>
    //       <div class="listLv1-item-input-outer">
    //         <input id="listLv1-item-input" type="text" />
    //       </div>
    //     </div>
    //     <div class="listLv1-item-right">
    //       <div class="listLv1-item-count-outer">
    //         <label class="listLv1-item-count">0</label>
    //       </div>
    //     </div>
    //   </div>
    // `;
    // $addListLvl1Item.insertAdjacentHTML('afterbegin', addListLvl1Item);
    // $listLvl1Content.appendChild($listLvl1Header);

    $listLvl1ContentContainer.append($listLvl1Content);
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
      this.$displayAddListLvl1 = this.toggleAddListLvl1();
      $listLv1ItemInput.focus();
    });
    // 목록 추가 취소 (esc)
    // 목록 추가 (enter)
    $listLv1ItemInput.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'Escape':
          //keyCode 27
          e.target.value = '';
          this.toggleAddListLvl1();
          break;
        case 'Enter':
          //keyCode 13
          this.addDate(e.target.value);
          this.toggleAddListLvl1();
          e.target.value = '';
          break;

        default:
          break;
      }
    });

    // 목록 리스트 삭제
    document
      .querySelector('#listLvl1-content')
      .addEventListener('click', (e) => {
        if (e.target.classList.contains('delListLvl1')) {
          // 삭제 버튼
          const result = confirm('삭제하시겠습니까?');
          if (result == true) {
            const domHasInst = this.getDomHasInst(e.target);
            this.removeData(domHasInst.inst.id);
          }
          return;
        }

        let target = e.target;
        while (!target.classList.contains('listLvl1-item')) {
          target = target.parentElement;
        }
        if (target.classList.contains('listLvl1-item')) {
          // item click -> hieghtlight
          this.listLvl1ItemInst.forEach((listLvl1ItemInst) => {
            listLvl1ItemInst.getDom().classList.remove('high-light');
          });
          this.getDomHasInst(target).classList.add('high-light');
          return;
        }
      });
    // 목록 리스트 클릭 -> 할일 list render
  }

  getDomHasInst(target) {
    let targetDom = target;
    while (!targetDom.inst) {
      targetDom = targetDom.parentElement;
    }
    return targetDom;
  }

  toggleAddListLvl1() {
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
    this.renderListLvl1(this.$listLvl1ContentContainer, this.data);
    return this.data;
  }

  removeData(id) {
    this.data = this.data.filter((v) => v.id !== id);
    this.renderListLvl1(this.$listLvl1ContentContainer, this.data);
    return this.data;
  }

  getData() {
    return this.data;
  }
}

export class listLvl1Item {
  constructor({ id, title, count }) {
    this.id = id;
    this.title = title;
    this.count = count;

    this.$listLvl1Item = document.createElement('div');
    this.$listLvl1Item.classList.add('listLvl1-item');
    this.$listLvl1Item.dataset.index = id;
    const listLvl1ItemTemplate = `
      <div class="listLv1-item-left">
        <div class="icon-container">
          <label class="listLv1-item-icon">🔥</label>
        </div>
        <div class="listLv1-item-title-outer">
          <label class="listLv1-item-title item-title">${title}</label>
        </div>
      </div>
      <div class="listLv1-item-right">
        <div class="icon-container">
          <label class="delListLvl1 del-icon"></label>
        </div>
        <div class="listLv1-item-count-outer">
          <label class="listLv1-item-count">${count}</label>
        </div>
      </div>
    `;
    this.$listLvl1Item.insertAdjacentHTML('afterbegin', listLvl1ItemTemplate);
    this.$listLvl1Item.inst = this;

    // this.template = `
    //   <div class="listLvl1-item" data-index=${id}>
    //     <div class="listLv1-item-left">
    //       <div class="icon-container">
    //         <label class="listLv1-item-icon">🔥</label>
    //       </div>
    //       <div class="listLv1-item-title-outer">
    //         <label class="listLv1-item-title item-title">${title}</label>
    //       </div>
    //     </div>
    //     <div class="listLv1-item-right">
    //       <div class="delListLvl1 icon-container">
    //         <label class="del-icon"></label>
    //       </div>
    //       <div class="listLv1-item-count-outer">
    //         <label class="listLv1-item-count">${count}</label>
    //       </div>
    //     </div>
    //   </div>
    // `;
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
