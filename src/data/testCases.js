// 可以匹配的测试案例
export const testCases = [
  {
    name: '贺卡细线条',
    description: '适用于贺卡的幼细线条烫金工艺',
    params: {
      application: 'greetingCard',
      foilArea: 'small',
      foilPattern: 'fine',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    }
  },
  {
    name: '精装书普通图案',
    description: '适用于精装书的普通图案烫金',
    params: {
      application: 'hardcoverBook',
      foilArea: 'medium',
      foilPattern: 'normal',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    }
  },
  {
    name: '包装立体效果',
    description: '适用于包装的立体纹理效果',
    params: {
      application: 'packaging',
      foilArea: 'medium',
      foilPattern: 'textured',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    }
  },
  {
    name: '贺卡渐变效果',
    description: '适用于贺卡的渐变网点烫金',
    params: {
      application: 'greetingCard',
      foilArea: 'small',
      foilPattern: 'halftone',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    }
  },
  {
    name: '精装书立体纹理',
    description: '适用于精装书的立体磨砂效果',
    params: {
      application: 'hardcoverBook',
      foilArea: 'medium',
      foilPattern: 'textured',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    }
  },
  {
    name: '包装普通图案',
    description: '适用于包装的普通烫金效果',
    params: {
      application: 'packaging',
      foilArea: 'medium',
      foilPattern: 'normal',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    }
  },
  {
    name: '哑光金贺卡',
    description: '适用于贺卡的哑光金效果',
    params: {
      application: 'greetingCard',
      foilArea: 'small',
      foilPattern: 'normal',
      color: 'mattGold',
      surfaceTreatment: 'normal',
      requiresUV: false
    }
  },
  {
    name: '精装书细线条',
    description: '适用于精装书的幼细线条效果',
    params: {
      application: 'hardcoverBook',
      foilArea: 'small',
      foilPattern: 'fine',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    }
  }
]

// 不能匹配的测试案例(附带原因说明)
export const unmatchableTestCases = [
  // 颜色支持不足案例
  {
    name: '银色贺卡',
    description: '贺卡银色烫金效果',
    params: {
      application: 'greetingCard',
      foilArea: 'small',
      foilPattern: 'normal',
      color: 'silver',
      surfaceTreatment: 'normal',
      requiresUV: false
    },
    reason: '当前供应商数据中只支持金色(gold)和哑光金(mattGold),不支持银色烫金纸'
  },
  {
    name: '铜色包装',
    description: '包装铜色烫金效果',
    params: {
      application: 'packaging',
      foilArea: 'medium',
      foilPattern: 'normal',
      color: 'copper',
      surfaceTreatment: 'normal',
      requiresUV: false
    },
    reason: '当前供应商数据中只支持金色(gold)和哑光金(mattGold),不支持铜色烫金纸'
  },
  // 尺寸覆盖不全案例
  {
    name: '小面积精装书立体效果',
    description: '精装书小面积立体纹理',
    params: {
      application: 'hardcoverBook',
      foilArea: 'small',
      foilPattern: 'textured',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    },
    reason: 'ST111系列不支持小面积立体纹理效果,仅支持中面积和大面积'
  },
  {
    name: '大面积贺卡',
    description: '贺卡大面积烫金',
    params: {
      application: 'greetingCard',
      foilArea: 'large',
      foilPattern: 'normal',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    },
    reason: 'SH111和SY606系列不支持大面积贺卡应用,仅支持小面积和中面积'
  },
  // 应用场景有限案例
  {
    name: '精平装细线条',
    description: '精平装幼细线条效果',
    params: {
      application: 'finePerfectBinding',
      foilArea: 'small',
      foilPattern: 'fine',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    },
    reason: '当前供应商主要支持贺卡、精装书、包装场景,缺少对精平装的专门支持'
  },
  {
    name: '卡书渐变效果',
    description: '卡书渐变网点效果',
    params: {
      application: 'cardBook',
      foilArea: 'medium',
      foilPattern: 'halftone',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    },
    reason: '当前供应商主要支持贺卡、精装书、包装场景,缺少对卡书的专门支持'
  },
  // 图案类型支持不完整案例
  {
    name: '大面积渐变包装',
    description: '包装大面积渐变网点',
    params: {
      application: 'packaging',
      foilArea: 'large',
      foilPattern: 'halftone',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    },
    reason: '大面积渐变网点效果不稳定,建议分割为多个中等面积区域'
  },
  {
    name: '精装书复杂纹理',
    description: '精装书复杂立体纹理',
    params: {
      application: 'hardcoverBook',
      foilArea: 'large',
      foilPattern: 'textured',
      color: 'gold',
      surfaceTreatment: 'normal',
      requiresUV: false
    },
    reason: '复杂立体纹理效果在大面积应用时不稳定,建议简化纹理或减小面积'
  }
]