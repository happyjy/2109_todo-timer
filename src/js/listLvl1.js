import { getDomHasInst } from './common';
import { ListLvl1Item } from './listLvl1Item';

export class listLvl1 {
  constructor({
    selector,
    headerSelector,
    contentSelector,
    addItemLvl1Selector,
    addItemLvl2Selector,
    data,
    listLvl2Inst,
    changeEvent: { updateCurrentListLvl1Id },
  }) {
    this.selector = selector;
    this.headerSelector = headerSelector;
    this.contentSelector = contentSelector;
    this.addItemLvl1Selector = addItemLvl1Selector;
    this.addItemLvl2Selector = addItemLvl2Selector;

    // # upper layer에서 data를 관리 할 필요 있음.
    //  * listLvl1ItemInst, data
    this.data = data;
    this.listLvl1ItemInstList = [];
    // this.dataField = dataField;
    // lvlField, idField, titleField, countField

    this.updateCurrentListLvl1Id = updateCurrentListLvl1Id;

    this.$listLvl1HeaderContainer = document.querySelector(this.headerSelector);
    this.$listLvl1ContentContainer = document.querySelector(
      this.contentSelector,
    );
    // this.$addItemLvl2Container = document.querySelector(
    //   this.addItemLvl2Selector,
    // );

    const { listLvl1Header, listLvl1Content } = this.initialize(
      [this.$listLvl1HeaderContainer, this.$listLvl1ContentContainer],
      this.data,
    );
    this.eventBinding();

    this.listLvl2Inst = listLvl2Inst;
  }

  initialize([$listLvl1HeaderContainer, $listLvl1ContentContainer], listData) {
    /*
      # lvl1 header
       * 추가 기능
     */
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
    /*
      # lvl1 content
        * 삭제 기능
     */
    const $listLvl1Content = this.renderListLvl1(listData);

    return { $listLvl1Header, $listLvl1Content };
  }

  renderListLvl1(listData = this.data) {
    if (this.$listLvl1ContentContainer.innerHTML) {
      this.$listLvl1ContentContainer.innerHTML = '';
    }

    // # List lvl1 item
    const $listLvl1Content = document.createElement('div');
    $listLvl1Content.classList.add('listLvl1-content');
    listData.forEach((v) => {
      const inst = new ListLvl1Item(v);
      inst.render();
      this.listLvl1ItemInstList.push(inst);
      $listLvl1Content.appendChild(inst.getDom());
    });

    this.$listLvl1ContentContainer.append($listLvl1Content);
  }

  eventBinding() {
    /*
      [x]목록 추가 버튼 클릭
      [x]목록 추가 취소 (esc)
      [x]목록 추가 (enter)
      [x]목록 리스트 삭제
      [x]목록 리스트 클릭
        - [x]할일 list render
        - [x]hight-light
     */
    const $listLvl1ItemInput = document.querySelector('#listLvl1-item-input');
    // 목록 추가 버튼 클릭
    document.querySelector('#addListLvl1').addEventListener('click', () => {
      // 목록 추가 input dom
      this.$displayAddListLvl1 = this.toggleItemLvl1();
      $listLvl1ItemInput.focus();
    });
    // 목록 추가 취소 (esc)
    // 목록 추가 (enter)
    $listLvl1ItemInput.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'Escape':
          //keyCode 27
          e.target.value = '';
          this.toggleItemLvl1();
          break;
        case 'Enter':
          //keyCode 13
          this.addData(e.target.value);
          this.toggleItemLvl1();
          e.target.value = '';

          console.log({
            data: this.data,
            listLvl1ItemInst: this.listLvl1ItemInstList,
          });
          break;

        default:
          break;
      }
    });

    // 목록 리스트 삭제
    // 목록 리스트 클릭(할일 list render, hight-light)
    document
      .querySelector('#listLvl1-content')
      .addEventListener('click', (e) => {
        if (e.target.classList.contains('delListLvl1')) {
          // 삭제 버튼
          const result = confirm('삭제하시겠습니까?');
          if (result == true) {
            const domHasInst = getDomHasInst(e.target);
            this.removeData(domHasInst.inst.id);
          }
          return;
        }

        let target = e.target;
        while (!target.classList.contains('listLvl1-item')) {
          target = target.parentElement;
        }
        if (target.classList.contains('listLvl1-item')) {
          // hieghtlight
          this.listLvl1ItemInstList.forEach((listLvl1ItemInst) => {
            listLvl1ItemInst.getDom().classList.remove('high-light');
          });
          getDomHasInst(target).classList.add('high-light');
          // 목록 item 클릭 -> 할일 header, list render
          const clickedListLvl1Inst = getDomHasInst(target).inst;
          this.listLvl2Inst.render(clickedListLvl1Inst);
          // 클릭 한 list lvl1 id
          this.listLvl2Inst.ListHeaderInst.close();
          this.updateCurrentListLvl1Id(clickedListLvl1Inst.id);

          // const addItemLvl2Container = document.querySelector(
          //   this.addItemLvl2Selector,
          // );
          // addItemLvl2Container && addItemLvl2Container.classList.add('hidden');
          return;
        }
      });
  }

  toggleItemLvl1() {
    const target = document.querySelector(this.addItemLvl1Selector);
    target.classList.toggle('hidden');
  }

  addData(title) {
    let biggestNum = [...this.data].sort((a, b) => b.id - a.id)[0].id;
    const newListLvl1Item = {
      lvl: 1,
      id: ++biggestNum,
      title,
      count: 0,
    };
    // this.data.push(listData);
    this.data.splice(this.data.length, 0, newListLvl1Item);
    this.renderListLvl1(this.data);

    return this.data;
  }

  removeData(id) {
    const idArr = this.data.map((v) => v.id);
    const idIdx = idArr.indexOf(id);

    this.data.splice(idIdx, 1);
    this.renderListLvl1(this.data);
    return this.data;
  }

  getData() {
    return this.data;
  }
}
