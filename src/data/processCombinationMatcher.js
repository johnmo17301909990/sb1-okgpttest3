// 工艺组合匹配逻辑
export const matchProcessCombination = (formData) => {
  const result = {
    status: '',
    message: '',
    primaryRecommendation: null,
    alternatives: []
  }

  // 验证必填参数
  if (!formData.application || !formData.surfaceMaterial || !formData.patternType || !formData.areaSize) {
    return {
      status: 'incomplete',
      message: '请完善必要参数',
      primaryRecommendation: null,
      alternatives: []
    }
  }

  // 根据表面材质和工艺组合进行匹配
  const matchedCombinations = []

  // 布面纸特殊处理
  if (formData.surfaceMaterial === 'cloth_paper') {
    matchedCombinations.push({
      processName: '布面纸烫金工艺',
      suitableMaterials: '布面纸、特种纸',
      deliveryTime: 5,
      estimatedCost: 3.5,
      processFlow: [
        { name: '表面整理', description: '布面纸预先刮平处理' },
        { name: '高温烫金', description: '使用特制模具，温度105℃-125℃' },
        { name: 'UV涂层', description: '可选增强光泽' }
      ],
      parameters: {
        temperature: '115℃',
        pressure: '2.0MPa',
        dwellTime: '1.2s'
      },
      notes: '推荐使用ST系列或GN系列烫金纸'
    })
  }

  // 荧光油墨面特殊处理
  if (formData.surfaceMaterial === 'fluorescent_ink') {
    matchedCombinations.push({
      processName: '荧光油墨面烫金工艺',
      suitableMaterials: '荧光油墨处理纸',
      deliveryTime: 6,
      estimatedCost: 4.0,
      processFlow: [
        { name: '荧光油墨喷涂', description: '完成基本图案' },
        { name: '低温烫金', description: '在图案表面实施烫印，温度80℃-95℃' }
      ],
      parameters: {
        temperature: '85℃',
        pressure: '1.8MPa',
        dwellTime: '0.7s'
      },
      notes: '使用光滑表面的高压缩烫金纸，防止油墨扩散'
    })
  }

  // 根据面积大小和图案类型匹配基础工艺
  const baseProcess = {
    processName: '标准烫金工艺',
    suitableMaterials: '普通纸张、涂布纸',
    deliveryTime: 4,
    estimatedCost: 3.0,
    processFlow: [
      { name: '表面处理', description: '确保表面平整清洁' },
      { name: '烫金', description: '执行标准烫金工序' }
    ],
    parameters: {
      temperature: '95℃',
      pressure: '1.5MPa',
      dwellTime: '0.8s'
    }
  }

  // 调整基础工艺参数
  if (formData.areaSize === 'large') {
    baseProcess.deliveryTime += 1
    baseProcess.estimatedCost += 0.5
    baseProcess.parameters.dwellTime = '1.0s'
  }

  if (formData.patternType === 'fine') {
    baseProcess.parameters.temperature = '90℃'
    baseProcess.parameters.pressure = '1.2MPa'
    baseProcess.notes = '使用精细烫金纸，控制压力均匀'
  }

  matchedCombinations.push(baseProcess)

  // 添加工艺组合建议
  if (formData.processCombination?.includes('foil_uv')) {
    matchedCombinations.push({
      processName: '烫金+UV工艺',
      suitableMaterials: '适用于UV涂布纸',
      deliveryTime: 6,
      estimatedCost: 4.5,
      processFlow: [
        { name: 'UV底涂', description: '应用UV底层' },
        { name: '烫金', description: '执行烫金工序' },
        { name: 'UV上光', description: '增加保护和光泽' }
      ],
      parameters: {
        temperature: '85℃',
        pressure: '1.2MPa',
        dwellTime: '0.6s',
        uvPower: '80%'
      },
      notes: '需使用UV专用烫金纸'
    })
  }

  if (formData.processCombination?.includes('foil_coating')) {
    matchedCombinations.push({
      processName: '烫金+过胶工艺',
      suitableMaterials: '适用于各类纸张',
      deliveryTime: 7,
      estimatedCost: 4.0,
      processFlow: [
        { name: '表面处理', description: '确保表面平整' },
        { name: '烫金', description: '执行烫金工序' },
        { name: '过胶', description: '增加保护层' }
      ],
      parameters: {
        temperature: '95℃',
        pressure: '1.5MPa',
        dwellTime: '0.8s'
      },
      notes: '过胶后需等待24小时再进行后续加工'
    })
  }

  // 根据匹配结果返回
  if (matchedCombinations.length === 0) {
    return {
      status: 'no_match',
      message: '未找到匹配的工艺组合',
      primaryRecommendation: null,
      alternatives: []
    }
  }

  // 排序匹配结果
  matchedCombinations.sort((a, b) => {
    // 按交期和成本综合排序
    const scoreA = a.deliveryTime * 0.6 + a.estimatedCost * 0.4
    const scoreB = b.deliveryTime * 0.6 + b.estimatedCost * 0.4
    return scoreA - scoreB
  })

  return {
    status: 'success',
    message: '找到匹配的工艺组合',
    primaryRecommendation: matchedCombinations[0],
    alternatives: matchedCombinations.slice(1)
  }
}