console.log('### listLvl1.js');

export class listLvl1 {
  constructor({
    selector,
    headerSelector,
    contentSelector,
    data,
    dataField,
    changeEvent,
  }) {
    console.log(
      '### listLvl1 > constructor',
      selector,
      headerSelector,
      contentSelector,
      data,
      dataField,
    );

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
    // dropdownLabel.classList.add('dropdown-select-label-container');
    // let render = `
    // const dropdownLabel = document.createElement('div');
    //         <span class="dropdown-select-label">${emptyLabel}</span>
    //         <div class="dropdown-select-arrow-container">
    //             <div class="dropdown-select-arrow"></div>
    //         </div>
    //     `;
    // dropdownLabel.insertAdjacentHTML('afterbegin', render);
    // selector.appendChild(dropdownLabel);
    // 생성된 라벨 영역을 리턴해준다.
    // return dropdownLabel;

    // # lvl1 header
    //  * 추가 기능

    const $listLvl1Header = document.createElement('div');
    $listLvl1Header.classList.add(...['listLvl1-header', 'list-header']);
    const listLvl1HeaderTemplate = `
      <label class="listLvl1-title header-title">목록</label>
      <div class="icon-container">
        <label class="add-icon"></label>
      </div>
    `;
    $listLvl1Header.insertAdjacentHTML('afterbegin', listLvl1HeaderTemplate);
    $listLvl1HeaderContainer.appendChild($listLvl1Header);

    // # lvl1 content
    //  * 삭제 기능
    // const $listLvl1Content = document.createElement('div');
    // $listLvl1Content.classList.add('listLvl1-content');
    // const listLvl1ContentTemplate = `
    //   <div class="listLvl1-item" data-index=${idField}>
    //     <div class="listLv1-item-left">
    //       <div class="icon-container">
    //         <label class="listLv1-item-icon">🔥</label>
    //       </div>
    //       <div class="listLv1-item-title-outer">
    //         <label class="listLv1-item-title item-title">${titleField}</label>
    //       </div>
    //     </div>
    //     <div class="listLv1-item-right">
    //       <div class="icon-container">
    //         <label class="del-icon"></label>
    //       </div>
    //       <div class="listLv1-item-count-outer">
    //         <label class="listLv1-item-count">${countField}</label>
    //       </div>
    //     </div>
    //   </div>
    // `;
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
    template += '</div>';
    $listLvl1ContentContainer.innerHTML = template;
    const $listLvl1Content = document.querySelector('.listLvl1-content');
    return { $listLvl1Header, $listLvl1Content };
  }

  eventBinding() {
    // 목록 추가
    // 목록 리스트 삭제
    // 목록 리스트 클릭 -> 할일 list render
  }
}
