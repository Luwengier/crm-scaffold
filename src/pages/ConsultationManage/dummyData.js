const getSerialText = numb => {
  return `寺躲讀眼枝星草神叫學怎包沒寺老原物意聲自戶。游雨苦只文共力自能虎百書師。聲穴葉父問服穴支洋美眼馬哭巾牛，都房穿往朱陽，反五哭村喜小毛畫們爪背卜波巴山弓連個吹毛入。
珠夕經老荷加花，枝她隻由像她雞抄錯借金色大屋、女古美拍來法員旦瓜對要游主苦助能波立動，乞很生玉種年耍後。

家他明像它次害古還黃汁節，新布和停，英哪王像百跑回，高助做寫海面氣封內馬金乾許花；升習十能書意足放一完${numb}。`
}

export const dummyData = [
  {
    id: 't1',
    isCompleted: false,
    text: getSerialText(1),
    principal: {
      id: 'p1',
      name: '金小城',
    },
    category: {
      id: 't1',
      name: '商品諮詢',
    },
    propertyTags: [
      {
        id: 'pt1',
        name: '緊急',
      },
      {
        id: 'pt2',
        name: '重要',
      },
      {
        id: 'pt3',
        name: '一般',
      },
      {
        id: 'pt4',
        name: '次要',
      },
      {
        id: 'cdf556',
        name: '派發工單',
      },
    ],
  },
  {
    id: 't2',
    isCompleted: false,
    text: getSerialText(2),
    principal: {
      id: 'p2',
      name: '林昱梅',
    },
    category: {
      id: 't2',
      name: '客訴案件',
    },
  },
  {
    id: 'c3',
    isCompleted: true,
    completedAt: '2021/09/05 下午 04:30',
    text: getSerialText(3),
    principal: {
      id: 'p3',
      name: '沈明傑',
    },
    category: {
      id: 't1',
      name: '商品諮詢',
    },
  },
  {
    id: 'c4',
    isCompleted: false,
    text: getSerialText(4),
    principal: {
      id: 'p1',
      name: '金小城',
    },
    category: {
      id: 't2',
      name: '客訴案件',
    },
  },
  {
    id: 'c5',
    isCompleted: true,
    completedAt: '2021/09/02 下午 01:20',
    text: getSerialText(5),
    principal: {
      id: 'p1',
      name: '金小城',
    },
    category: {
      id: 't1',
      name: '商品諮詢',
    },
  },
  {
    id: 'c6',
    isCompleted: true,
    completedAt: '2021/09/02 下午 01:20',
    text: getSerialText(6),
    principal: {
      id: 'p2',
      name: '林昱梅',
    },
    category: {
      id: 't2',
      name: '客訴案件',
    },
  },
  {
    id: 'c7',
    isCompleted: true,
    completedAt: '2021/09/02 下午 01:20',
    text: getSerialText(7),
    principal: {
      id: 'p1',
      name: '金小城',
    },
    category: {
      id: 't1',
      name: '商品諮詢',
    },
  },
  {
    id: 'c8',
    isCompleted: true,
    completedAt: '2021/09/02 下午 01:20',
    text: getSerialText(8),
    principal: {
      id: 'p2',
      name: '林昱梅',
    },
    category: {
      id: 't2',
      name: '客訴案件',
    },
  },
]

export const principals = [
  {
    id: 'p1',
    name: '金小城',
  },
  {
    id: 'p2',
    name: '林昱梅',
  },
  {
    id: 'p3',
    name: '沈明傑',
  },
]

export const principalMapping = {
  'p1': '金小城',
  'p2': '林昱梅',
  'p3': '沈明傑',
}

export const consultationCategories = [
  {
    id: 't1',
    name: '商品諮詢',
  },
  {
    id: 't2',
    name: '客訴案件',
  },
]

export const consultationMapping = {
  't1': '商品諮詢',
  't2': '客訴案件',
}

export const propertyTags = [
  {
    id: 'cdf556',
    name: '派發工單',
  },
  {
    id: 'cgt67',
    name: '自訂標籤',
  },
  {
    id: 'bvd234',
    name: '自訂',
  },
]



