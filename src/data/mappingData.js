// Size options
export const sizes = [
  { label: '请选择烫金面积', value: '' },
  { label: '小面积 (<50mm x 50mm)', value: 'small' },
  { label: '中面积 (50-100mm x 50-100mm)', value: 'medium' },
  { label: '大面积 (≥100mm x 100mm)', value: 'large' }
];

// Pattern type options
export const patternTypes = [
  { label: '请选择烫金图案类型', value: '' },
  { label: '幼细线条、文字', value: 'fine' },
  { label: '渐变、网点', value: 'halftone' },
  { label: '普通图案', value: 'normal' },
  { label: '立体、磨砂、有纹理效果', value: 'textured' }
];

// Surface treatment options
export const surfaceOptions = [
  { label: '请选择表面处理', value: '' },
  { label: '普通纸张', value: 'normal' },
  { label: 'UV涂层(亮光)', value: 'uvCoating' },
  { label: 'UV涂层(哑光)', value: 'mattUvCoating' },
  { label: '粉纸面', value: 'powderSurface' },
  { label: '无粉纸面', value: 'nonPowderSurface' }
];

// Process order options
export const processOrders = [
  { label: '请选择工艺顺序', value: '' },
  { label: 'UV后烫金', value: 'uvThenFoil' },
  { label: '烫金后UV', value: 'foilThenUv' },
  { label: '烫金后过胶', value: 'foilThenCoating' },
  { label: '烫金后印刷', value: 'foilThenPrint' }
];

// Color options
export const colorOptions = [
  { label: '请选择颜色', value: '' },
  { label: '金色', value: 'gold' },
  { label: '银色', value: 'silver' },
  { label: '哑光金', value: 'mattGold' },
  { label: '哑光银', value: 'mattSilver' },
  { label: '黑色', value: 'black' }
];

// Application options
export const applications = [
  { label: '请选择应用场景', value: '' },
  { label: '贺卡', value: 'greetingCard' },
  { label: '精装书', value: 'hardcoverBook' },
  { label: '包装', value: 'packaging' },
  { label: '综合印刷', value: 'general' }
];

// Categories
export const categories = [
  '普通金纸',
  '普通银纸',
  '普通耐磨',
  '特殊效果'
];

// Series
export const series = [
  'SH的标准金纸',
  'G1系列',
  'SY1-系列',
  'ST系列',
  'A23系列',
  'SY6-系列',
  'L817系列',
  'GN系列',
  'SY+系列'
];

// Tensions
export const tensions = [
  { label: '请选择松紧度', value: '' },
  { label: '紧身', value: 'tight' },
  { label: '松身', value: 'loose' },
  { label: '标准', value: 'standard' }
];

// Rest of the file remains unchanged...
export const mappingData = [
  {
    companyCode: 'HS#1G',
    supplierCodes: [
      {
        code: 'SH111',
        series: 'SH的标准金纸',
        category: 'normalGold',
        usage: '金色烫金纸，适用于高端印刷项目，渐变、网点烫金。',
        mainApplication: ['贺卡'],
        suitableSize: ['small', 'large'],
        tension: 'standard',
        uvCompatible: true,
        color: 'gold'
      },
      {
        code: 'G1-Y17',
        series: 'G1系列',
        category: 'normalGold',
        usage: '金色烫金纸，普通烫金、烫后过胶，适用于综合、卡书、精平装。',
        mainApplication: ['general', 'cardBook', 'finePerfectBinding'],
        suitableSize: ['medium'],
        tension: 'standard',
        uvCompatible: true,
        color: 'gold'
      }
    ]
  },
  {
    companyCode: 'HS#2G',
    supplierCodes: [
      {
        code: 'SY606-',
        series: 'SY6-系列',
        category: 'normalGold',
        usage: '金色烫金纸，幼细线条、文字，普通烫金，适用于综合、卡书、精平装。',
        mainApplication: ['general', 'cardBook', 'finePerfectBinding'],
        suitableSize: ['small', 'medium'],
        tension: 'standard',
        uvCompatible: true,
        color: 'gold'
      }
    ]
  },
  {
    companyCode: 'HS#1S',
    supplierCodes: [
      {
        code: 'L817-OL5',
        series: 'L817系列',
        category: 'normalSilver',
        usage: '银色烫金纸，普通图案，适用于贺卡、精装书。',
        mainApplication: ['greetingCard', 'hardcoverBook'],
        suitableSize: ['small', 'medium'],
        tension: 'standard',
        uvCompatible: true,
        color: 'silver'
      }
    ]
  },
  {
    companyCode: 'HS#ST1',
    supplierCodes: [
      {
        code: 'ST111',
        series: 'ST系列',
        category: 'wearResistant',
        usage: '金色烫金纸，立体、磨砂、纹理效果，适用于高端印刷。',
        mainApplication: ['greetingCard', 'hardcoverBook'],
        suitableSize: ['small', 'medium'],
        tension: 'standard',
        uvCompatible: true,
        color: 'gold'
      }
    ]
  }
];

// Size descriptions
export const sizeDescriptions = {
  small: {
    name: '小面积',
    description: '< 50mm x 50mm'
  },
  medium: {
    name: '中面积',
    description: '50mm x 50mm ≤ X < 100mm x 100mm'
  },
  large: {
    name: '大面积',
    description: '≥ 100mm x 100mm'
  }
};

// Tension descriptions
export const tensionDescriptions = {
  tight: {
    name: '紧身',
    description: 'SY1-系列（如 SY611-、SY118-A）'
  },
  loose: {
    name: '松身',
    description: '带有"+"符号的系列（如 SY-0182+，属于 SY+系列）'
  },
  standard: {
    name: '标准',
    description: '其他系列（如 SY6-系列、G1系列 等）'
  }
};

// UV compatibility descriptions
export const uvDescriptions = {
  compatible: {
    name: '能过UV',
    description: '适用于需要UV上光的印刷品'
  },
  incompatible: {
    name: '不能过UV',
    description: '需注意避免在需要UV工艺的场合使用'
  }
};