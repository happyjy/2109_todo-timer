export const state = { currentListLvl1Id: 0 };

export const getListLvl1Dummy = () => {
  let result;
  const localStorageListLvl1 =
    JSON.parse(localStorage.getItem('listLvl1')) || [];

  const init = [
    { lvl: 1, id: 1, title: '회사업무' },
    { lvl: 1, id: 2, title: '집안 일' },
    { lvl: 1, id: 3, title: '일어야할 책' },
  ];
  if (localStorageListLvl1.length != 0) {
    result = localStorageListLvl1;
  } else {
    result = init;
  }
  return result;
};

export const getListLvl2Dummy = () => {
  let result;
  const localStorageListLvl2 =
    JSON.parse(localStorage.getItem('listLvl2')) || [];
  const init = [
    {
      lvl: 2,
      id: 1,
      upperLvlId: 1,
      title: '상위 lvlid1 - A 프로젝트 회의 참석',
      time: 1,
      pomoCnt: 1,
      isFinish: false,
    },
    {
      lvl: 2,
      id: 2,
      upperLvlId: 1,
      title: '상위 lvlid1 - B 프로젝트 회의 참석',
      time: 2,
      pomoCnt: 2,
      isFinish: false,
    },
    {
      lvl: 2,
      id: 3,
      upperLvlId: 1,
      title: '상위 lvlid1 - C 프로젝트 회의 참석',
      time: 35,
      pomoCnt: 3,
      isFinish: false,
    },
    {
      lvl: 2,
      id: 4,
      upperLvlId: 1,
      title: '상위 lvlid1 - D 프로젝트 회의 참석',
      time: 60,
      pomoCnt: 1,
      isFinish: false,
    },

    {
      lvl: 2,
      id: 5,
      upperLvlId: 2,
      title: '상위 lvlid2 - A 프로젝트 회의 참석',
      time: 20,
      pomoCnt: 2,
      isFinish: false,
    },
    {
      lvl: 2,
      id: 6,
      upperLvlId: 2,
      title: '상위 lvlid2 - B 프로젝트 회의 참석',
      time: 35,
      pomoCnt: 3,
      isFinish: false,
    },
    {
      lvl: 2,
      id: 7,
      upperLvlId: 2,
      title: '상위 lvlid2 - C 프로젝트 회의 참석',
      time: 60,
      pomoCnt: 1,
      isFinish: false,
    },

    {
      lvl: 2,
      id: 8,
      upperLvlId: 3,
      title: '상위 lvlid3 - B 프로젝트 회의 참석',
      time: 20,
      pomoCnt: 2,
      isFinish: false,
    },
    {
      lvl: 2,
      id: 9,
      upperLvlId: 3,
      title: '상위 lvlid3 - A 프로젝트 회의 참석',
      time: 35,
      pomoCnt: 3,
      isFinish: false,
    },
    {
      lvl: 2,
      id: 10,
      upperLvlId: 3,
      title: '상위 lvlid3 - B 프로젝트 회의 참석',
      time: 60,
      pomoCnt: 1,
      isFinish: false,
    },
  ];
  if (localStorageListLvl2.length != 0) {
    result = localStorageListLvl2;
  } else {
    result = init;
  }

  return result;
};
