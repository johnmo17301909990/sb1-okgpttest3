// 在 script setup 部分，更新 rules.value 的初始数据：

const rules = ref([
  {
    id: 1,
    name: '贺卡渐变烫金规则',
    description: '适用于贺卡的渐变网点烫金工艺，使用 SY1-系列烫金纸',
    priority: 1,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'foilPattern', operator: 'equals', value: 'halftone' },
      { field: 'application', operator: 'equals', value: 'greetingCard' }
    ]
  },
  {
    id: 2,
    name: '精装书幼细线条规则',
    description: '适用于精装书的幼细线条和文字烫金，使用 SY6-系列烫金纸',
    priority: 2,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'foilPattern', operator: 'equals', value: 'fine' },
      { field: 'application', operator: 'equals', value: 'hardcoverBook' }
    ]
  },
  {
    id: 3,
    name: '包装大面积规则',
    description: '适用于包装的大面积烫金，使用 SY+系列烫金纸',
    priority: 3,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'foilArea', operator: 'equals', value: 'large' },
      { field: 'application', operator: 'equals', value: 'packaging' }
    ]
  },
  {
    id: 4,
    name: 'UV涂层烫金规则',
    description: '适用于UV涂层上的烫金工艺，使用 ST系列或 GN系列烫金纸',
    priority: 4,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'surfaceTreatment', operator: 'contains', value: 'uvCoating' }
    ]
  },
  {
    id: 5,
    name: '烫金后UV规则',
    description: '需要烫金后过UV的工艺，使用耐高温的 ST系列烫金纸',
    priority: 5,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'processOrder', operator: 'equals', value: 'foilThenUv' }
    ]
  },
  {
    id: 6,
    name: '烫金后过胶规则',
    description: '需要烫金后过胶的工艺，使用 G1系列、G6系列或 KM系列烫金纸',
    priority: 6,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'processOrder', operator: 'equals', value: 'foilThenCoating' }
    ]
  },
  {
    id: 7,
    name: '特殊效果烫金规则',
    description: '适用于立体、磨砂、有纹理效果的烫金，使用 ST系列、GN系列或 SST系列烫金纸',
    priority: 7,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'foilPattern', operator: 'equals', value: 'textured' }
    ]
  },
  {
    id: 8,
    name: '金色烫金规则',
    description: '适用于金色烫金纸的选择',
    priority: 8,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'color', operator: 'equals', value: 'gold' }
    ]
  },
  {
    id: 9,
    name: '银色烫金规则',
    description: '适用于银色烫金纸的选择',
    priority: 9,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'color', operator: 'equals', value: 'silver' }
    ]
  },
  {
    id: 10,
    name: '哑光金属烫金规则',
    description: '适用于哑光金属效果的烫金纸选择',
    priority: 10,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'color', operator: 'contains', value: 'matt' }
    ]
  },
  {
    id: 11,
    name: '小面积精细规则',
    description: '适用于小面积精细图案的烫金工艺',
    priority: 11,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'foilArea', operator: 'equals', value: 'small' },
      { field: 'foilPattern', operator: 'equals', value: 'fine' }
    ]
  },
  {
    id: 12,
    name: '中面积普通规则',
    description: '适用于中面积普通图案的烫金工艺',
    priority: 12,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'foilArea', operator: 'equals', value: 'medium' },
      { field: 'foilPattern', operator: 'equals', value: 'normal' }
    ]
  },
  {
    id: 13,
    name: '贺卡专用规则',
    description: '适用于贺卡类产品的烫金工艺选择',
    priority: 13,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'application', operator: 'equals', value: 'greetingCard' }
    ]
  },
  {
    id: 14,
    name: '精装书专用规则',
    description: '适用于精装书类产品的烫金工艺选择',
    priority: 14,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'application', operator: 'equals', value: 'hardcoverBook' }
    ]
  },
  {
    id: 15,
    name: '包装专用规则',
    description: '适用于包装类产品的烫金工艺选择',
    priority: 15,
    enabled: true,
    createdAt: new Date('2023-12-20'),
    conditions: [
      { field: 'application', operator: 'equals', value: 'packaging' }
    ]
  }
])