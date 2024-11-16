// 确保正确导出所有选项
export const processCombinationOptions = [
  { label: '过胶', value: 'coating' },
  { label: 'UV', value: 'uv' },
  { label: '压纹', value: 'emboss' },
  { label: '丝印LED UV洒闪粉', value: 'led_uv_glitter' }
];

// 导出其他必要的选项
export const areaOptions = [
  { label: '请选择面积大小', value: '' },
  { label: '小面积 (<50mm x 50mm)', value: 'small' },
  { label: '中面积 (50-100mm x 50-100mm)', value: 'medium' },
  { label: '大面积 (≥100mm x 100mm)', value: 'large' }
];

export const patternTypeOptions = [
  { label: '请选择图案类型', value: '' },
  { label: '幼细线条', value: 'fine' },
  { label: '渐变网点', value: 'gradient' },
  { label: '普通图案', value: 'normal' },
  { label: '立体纹理', value: 'textured' }
];