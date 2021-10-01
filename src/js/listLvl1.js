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
    const { listLvl1Header, listLvl1Content } = this.initialize(
      [
        document.querySelector(headerSelector),
        document.querySelector(contentSelector),
      ],
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
    let template = '<div class="listLvl1-content">';
    listData.forEach((data) => {
      // lvlField, idField, titleField, countField
      template += `
        <div class="listLvl1-item" data-index=${data.id}>
          <div class="listLv1-item-left">
            <div class="icon-container">
              <label class="listLv1-item-icon">🔥</label>
            </div>
            <div class="listLv1-item-title-outer">
              <label class="listLv1-item-title item-title">${data.title}</label>
            </div>
          </div>
          <div class="listLv1-item-right">
            <div class="icon-container">
              <label class="del-icon"></label>
            </div>
            <div class="listLv1-item-count-outer">
              <label class="listLv1-item-count">${data.count}</label>
            </div>
          </div>
        </div>

      `;
    });
    // <!-- 추가 input template -->
    template += `
      <div id="add-listLvl1-item" class="hidden">
        <div class="add-listLvl1-item listLvl1-item">
          <div class="listLv1-item-left">
            <div class="icon-container">
              <label class="listLv1-item-icon">🔥</label>
            </div>
            <div class="listLv1-item-input-outer">
              <input id="listLv1-item-input" type="text" />
            </div>
          </div>
          <div class="listLv1-item-right">
            <div class="listLv1-item-count-outer">
              <label class="listLv1-item-count">0</label>
            </div>
          </div>
        </div>
      </div>
    `;
    template += '</div>';
    $listLvl1ContentContainer.innerHTML = template;
    const $listLvl1Content = document.querySelector('.listLvl1-content');
    return { $listLvl1Header, $listLvl1Content };
  }

  eventBinding() {
    /*
      목록 추가 클릭
      목록 추가 (enter)
      목록 추가 취소 (esc)
      목록 리스트 삭제
      목록 리스트 클릭 -> 할일 list render
     */
    // 목록 추가 클릭
    document.querySelector('#addListLvl1').addEventListener('click', () => {
      // 목록 추가 input dom
      this.$displayAddListLvl1 = this.displayAddListLvl1();

      // if (!this.$displayAddListLvl1) {
      //   this.$displayAddListLvl1
      //     .querySelector('#listLv1-item-input')
      //     .addEventListener('keyup', (e) => {
      //       debugger;
      //       console.log(e);
      //     });
      // }
    });
    // 목록 추가 (enter)
    document
      .querySelector('#listLv1-item-input')
      .addEventListener('keyup', (e) => {
        switch (e.key) {
          case 'Escape':
            //keyCode 27
            e.target.value = '';
            this.displayAddListLvl1();
            break;
          case 'Enter':
            //keyCode 13
            let biggestNum = this.data.sort((a, b) => b.id - a.id)[0].id;
            const listData = {
              lvl: 1,
              id: ++biggestNum,
              title: e.target.value,
              count: 0,
            };
            this.data.push(listData);
            this.displayAddListLvl1();
            break;

          default:
            break;
        }
      });
    // 목록 추가 취소 (esc)
    // 목록 리스트 삭제
    // 목록 리스트 클릭 -> 할일 list render
  }

  displayAddListLvl1() {
    const target = document.querySelector('#add-listLvl1-item');
    target.classList.toggle('hidden');
    // const template = `
    //   <div class="add-listLvl1-item listLvl1-item ">
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

    // target.innerHTML = template;
    // return target;
  }
}
