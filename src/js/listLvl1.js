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
    // lvlField, idField, labelField, countField
    this.onAddListLvl1 = changeEvent.onAddListLvl1;
    this.onDelListLvl1 = changeEvent.onDelListLvl1;
    this.onModifyListLvl1 = changeEvent.onModifyListLvl1;
    this.onClickListLvlItem = changeEvent.onClickListLvlItem;
  }
}
