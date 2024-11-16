// 选项定义
export const applicationOptions = [
  { label: '请选择应用场景', value: '' },
  { label: '贺卡', value: 'greetingCard' },
  { label: '精装书', value: 'hardcoverBook' },
  { label: '包装', value: 'packaging' },
  { label: '综合印刷', value: 'general' }
];

export const areaOptions = [
  { label: '请选择烫金面积', value: '' },
  { label: '小面积 (<50mm x 50mm)', value: 'small' },
  { label: '中面积 (50-100mm x 50-100mm)', value: 'medium' },
  { label: '大面积 (≥100mm x 100mm)', value: 'large' }
];

export const patternOptions = [
  { label: '请选择图案类型', value: '' },
  { label: '幼细线条、文字', value: 'fine' },
  { label: '渐变、网点', value: 'halftone' },
  { label: '普通图案', value: 'normal' },
  { label: '立体、磨砂、有纹理效果', value: 'textured' }
];

export const surfaceOptions = [
  { label: '请选择表面处理', value: '' },
  { label: '普通纸张', value: 'normal' },
  { label: 'UV涂层(亮光)', value: 'uvCoating' },
  { label: 'UV涂层(哑光)', value: 'mattUvCoating' },
  { label: '粉纸面', value: 'powderSurface' },
  { label: '无粉纸面', value: 'nonPowderSurface' }
];

export const colorOptions = [
  { label: '请选择颜色', value: '' },
  { label: '金色', value: 'gold' },
  { label: '银色', value: 'silver' },
  { label: '哑光金', value: 'mattGold' },
  { label: '哑光银', value: 'mattSilver' }
];

export const processCombinationOptions = [
  { label: '过胶', value: 'coating' },
  { label: 'UV', value: 'uv' },
  { label: '压纹', value: 'emboss' },
  { label: '丝印LED UV洒闪粉', value: 'led_uv_glitter' }
];

// 匹配函数
export const matchFoils = (criteria) => {
  const matchingSteps = []
  const suggestions = []

  // 步骤1：参数验证
  matchingSteps.push({
    title: '参数验证',
    description: '检查必填参数是否完整',
    type: 'primary',
    color: '#409EFF',
    important: true
  })

  if (!criteria.foilArea || !criteria.foilPattern) {
    matchingSteps.push({
      title: '验证失败',
      description: '缺少必要参数',
      type: 'danger',
      color: '#F56C6C',
      important: true,
      details: [
        !criteria.foilArea && '未选择烫金面积',
        !criteria.foilPattern && '未选择图案类型'
      ].filter(Boolean)
    })
    return {
      status: 'incomplete',
      message: '请完善必要参数',
      matchingSteps,
      suggestions: ['请选择烫金面积', '请选择图案类型']
    }
  }

  // 步骤2：工艺冲突检查
  matchingSteps.push({
    title: '工艺冲突检查',
    description: '检查选择的工艺参数是否存在冲突',
    type: 'warning',
    color: '#E6A23C',
    important: true
  })

  const conflicts = []

  // 检查面积与图案的冲突
  if (criteria.foilPattern === 'fine' && criteria.foilArea === 'large') {
    conflicts.push('大面积不适合幼细线条图案')
  }

  // 检查特殊工艺冲突
  if (criteria.foilPattern === 'textured') {
    if (criteria.foilArea === 'small') {
      conflicts.push('立体纹理效果不适合小面积应用')
    }
    if (criteria.foilArea === 'large' && criteria.application === 'hardcoverBook') {
      conflicts.push('精装书大面积立体纹理效果不稳定')
    }
  }

  if (conflicts.length > 0) {
    matchingSteps.push({
      title: '发现工艺冲突',
      description: '当前参数组合存在以下冲突',
      type: 'danger',
      color: '#F56C6C',
      details: conflicts
    })
    return {
      status: 'conflict',
      message: '存在工艺冲突，请调整参数',
      matchingSteps,
      suggestions: conflicts.map(conflict => `请解决：${conflict}`)
    }
  }

  // 步骤3：匹配过程
  matchingSteps.push({
    title: '开始匹配',
    description: '根据选择的参数匹配合适的烫金纸',
    type: 'primary',
    color: '#409EFF'
  })

  const matches = []
  
  // 模拟供应商数据
  const suppliers = [
    {
      companyCode: 'HS#1G',
      supplierCode: 'SH111',
      series: 'SH的标准金纸',
      usage: '金色烫金纸，适用于高端印刷项目',
      mainApplication: '贺卡',
      supportedPatterns: ['fine', 'normal'],
      suitableSizes: ['小面积', '中面积'],
      uvCompatible: true
    },
    {
      companyCode: 'HS#2G',
      supplierCode: 'SY606',
      series: 'SY6-系列',
      usage: '金色烫金纸，适用于综合印刷',
      mainApplication: '综合',
      supportedPatterns: ['normal'],
      suitableSizes: ['中面积'],
      uvCompatible: true
    },
    {
      companyCode: 'HS#ST1',
      supplierCode: 'ST111',
      series: 'ST系列',
      usage: '金色烫金纸，适用于特殊效果',
      mainApplication: '精装书',
      supportedPatterns: ['textured'],
      suitableSizes: ['中面积', '大面积'],
      uvCompatible: true
    }
  ]

  suppliers.forEach(supplier => {
    let isMatch = true
    let matchScore = 0
    const matchDetails = []

    // 面积匹配
    const sizeMap = {
      small: '小面积',
      medium: '中面积',
      large: '大面积'
    }
    const currentSize = sizeMap[criteria.foilArea]
    if (!supplier.suitableSizes.includes(currentSize)) {
      isMatch = false
      matchDetails.push(`面积不匹配：需要 ${currentSize}，供应商支持 ${supplier.suitableSizes.join('、')}`)
    } else {
      matchScore += 2
    }

    // 图案类型匹配
    if (!supplier.supportedPatterns.includes(criteria.foilPattern)) {
      isMatch = false
      matchDetails.push(`图案类型不匹配：需要 ${criteria.foilPattern}`)
    } else {
      matchScore += 2
    }

    // 应用场景匹配
    if (criteria.application && 
        supplier.mainApplication !== '综合' && 
        supplier.mainApplication !== criteria.application) {
      matchScore -= 1
      matchDetails.push(`应用场景不是最优：需要 ${criteria.application}，供应商主要应用于 ${supplier.mainApplication}`)
    } else {
      matchScore += 1
    }

    if (isMatch) {
      matches.push({
        ...supplier,
        matchScore
      })
    } else {
      matchingSteps.push({
        title: `排除供应商 ${supplier.supplierCode}`,
        description: '不满足匹配条件',
        type: 'info',
        color: '#909399',
        hollow: true,
        details: matchDetails
      })
    }
  })

  // 按匹配分数排序
  matches.sort((a, b) => b.matchScore - a.matchScore)

  // 步骤4：结果分析
  matchingSteps.push({
    title: '匹配完成',
    description: `找到 ${matches.length} 个匹配结果`,
    type: matches.length > 0 ? 'success' : 'warning',
    color: matches.length > 0 ? '#67C23A' : '#E6A23C',
    important: true
  })

  if (matches.length === 0) {
    suggestions.push('考虑放宽匹配条件，如：')
    suggestions.push('- 尝试选择相邻的烫金面积')
    suggestions.push('- 调整图案类型要求')
    if (criteria.color) {
      suggestions.push('- 暂时不指定具体颜色')
    }
    return {
      status: 'no_match',
      message: '未找到完全匹配的烫金纸',
      matchingSteps,
      suggestions
    }
  }

  return {
    status: 'success',
    message: `找到 ${matches.length} 个匹配结果`,
    foils: matches,
    matchingSteps
  }
};