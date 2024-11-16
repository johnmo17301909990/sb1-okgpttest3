// 尺寸描述
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

// 松紧度描述
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

// UV处理描述
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