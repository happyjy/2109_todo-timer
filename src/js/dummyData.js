export const state = { currentListLvl1Id: 0 };

export const listLvl1Dummy = [
  { lvl: 1, id: 1, title: '회사업무' /* , count: 2 */ },
  { lvl: 1, id: 2, title: '집안 일' /* , count: 1 */ },
  { lvl: 1, id: 3, title: '일어야할 책' /* , count: 1 */ },
];

export const listLvl2Dummy = [
  {
    lvl: 2,
    id: 1,
    upperLvlId: 1,
    title: '상위 lvlid1 - A 프로젝트 회의 참석',
    time: 10,
    pomoCnt: 1,
    isFinish: false,
  },
  {
    lvl: 2,
    id: 2,
    upperLvlId: 1,
    title: '상위 lvlid1 - B 프로젝트 회의 참석',
    time: 20,
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
