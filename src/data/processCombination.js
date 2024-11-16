// 工艺组合数据
export const processOptions = {
  // 基础工艺选项
  baseProcesses: [
    { label: '单一烫金', value: 'single', description: '适用于普通烫金效果' },
    { label: '精细图案烫金', value: 'fine', description: '适用于细节丰富的图案' },
    { label: '大面积烫金', value: 'large', description: '适用于大面积覆盖' }
  ],

  // 组合工艺选项
  combinedProcesses: [
    { label: '过胶', value: 'coating', description: '增强附着力和保护' },
    { label: 'UV', value: 'uv', description: '增加光泽或哑光效果' },
    { label: '压纹', value: 'emboss', description: '增加立体效果' },
    { label: '丝印LED UV洒闪粉', value: 'ledUvGlitter', description: '增加特殊视觉效果' }
  ],

  // 应用场景选项
  applications: [
    { label: '高端包装', value: 'premium_packaging', description: '适用于高档产品包装' },
    { label: '精装书', value: 'hardcover_book', description: '适用于精装书籍封面' },
    { label: '礼盒', value: 'gift_box', description: '适用于各类礼品盒' },
    { label: '纪念册', value: 'memorial_album', description: '适用于纪念相册等' },
    { label: '高端贺卡', value: 'premium_card', description: '适用于高档贺卡' }
  ],

  // 表面材质选项
  surfaceMaterials: [
    { label: '普通纸张', value: 'normal_paper', description: '常规纸张材质' },
    { label: '布面纸', value: 'cloth_paper', description: '带有布纹的特种纸' },
    { label: '荧光油墨面', value: 'fluorescent_ink', description: '带有荧光效果的表面' },
    { label: '特殊涂布纸', value: 'special_coated', description: '特殊涂布处理的纸张' }
  ]
}

// 工艺组合规则
export const processCombinationRules = [
  {
    id: 'coating_rule',
    name: '烫金+过胶',
    baseProcess: 'single',
    combinedProcess: 'coating',
    processFlow: [
      { name: '表面处理', description: '确保表面平整' },
      { name: '烫金', description: '执行烫金工序' },
      { name: '过胶', description: '增加保护层' }
    ],
    parameters: {
      temperature: { label: '温度', value: '95', unit: '°C' },
      pressure: { label: '压力', value: '1.5', unit: 'MPa' },
      dwellTime: { label: '停留时间', value: '0.8', unit: 's' },
      waitTime: { label: '过胶等待时间', value: '24', unit: 'h' }
    },
    precautions: [
      '过胶后需调整烫金压力，避免压穿',
      '建议24小时后进行烫金工序',
      '注意控制过胶均匀性'
    ],
    materialSuggestions: {
      foilType: { label: '推荐烫金纸', value: 'ST系列或GN系列' },
      coating: { label: '推荐过胶材料', value: '高附着力UV胶' }
    }
  },
  {
    id: 'uv_rule',
    name: '烫金+UV',
    baseProcess: 'single',
    combinedProcess: 'uv',
    processFlow: [
      { name: 'UV涂层', description: '应用UV底层' },
      { name: '烫金', description: '执行烫金工序' },
      { name: 'UV上光', description: '增加保护和光泽' }
    ],
    parameters: {
      temperature: { label: '温度', value: '85', unit: '°C' },
      pressure: { label: '压力', value: '1.2', unit: 'MPa' },
      dwellTime: { label: '停留时间', value: '0.6', unit: 's' },
      uvPower: { label: 'UV功率', value: '80', unit: '%' }
    },
    precautions: [
      'UV涂层需完全固化',
      '控制烫金温度避免UV层变形',
      '注意UV光源稳定性'
    ],
    materialSuggestions: {
      foilType: { label: '推荐烫金纸', value: 'UV专用烫金纸' },
      uvCoating: { label: '推荐UV涂料', value: '高附着力UV涂料' }
    }
  },
  {
    id: 'emboss_rule',
    name: '烫金+压纹',
    baseProcess: 'single',
    combinedProcess: 'emboss',
    processFlow: [
      { name: '烫金', description: '执行烫金工序' },
      { name: '压纹', description: '立即进行压纹，避免表面硬化' }
    ],
    parameters: {
      temperature: { label: '温度', value: '90', unit: '°C' },
      pressure: { label: '压力', value: '2.0', unit: 'MPa' },
      dwellTime: { label: '停留时间', value: '1.0', unit: 's' },
      embossPressure: { label: '压纹压力', value: '2.5', unit: 'MPa' }
    },
    precautions: [
      '烫金后立即进行压纹',
      '控制压纹压力避免破坏烫金层',
      '注意压纹深度均匀性'
    ],
    materialSuggestions: {
      foilType: { label: '推荐烫金纸', value: '高强度烫金纸' },
      embossTool: { label: '推荐压纹模具', value: '精密雕刻模具' }
    }
  },
  {
    id: 'glitter_rule',
    name: '烫金+闪粉',
    baseProcess: 'single',
    combinedProcess: 'ledUvGlitter',
    processFlow: [
      { name: '丝印UV', description: '应用LED UV技术喷涂闪粉' },
      { name: '烫金', description: '在闪粉表面实施烫金' }
    ],
    parameters: {
      temperature: { label: '温度', value: '80', unit: '°C' },
      pressure: { label: '压力', value: '1.8', unit: 'MPa' },
      dwellTime: { label: '停留时间', value: '0.7', unit: 's' },
      uvPower: { label: 'UV功率', value: '70', unit: '%' }
    },
    precautions: [
      '控制闪粉颗粒大小≤50μm',
      '使用高压缩烫金纸避免断裂',
      '注意UV固化完全性'
    ],
    materialSuggestions: {
      foilType: { label: '推荐烫金纸', value: '高压缩烫金纸' },
      glitter: { label: '推荐闪粉', value: '细腻闪粉(≤50μm)' }
    }
  }
]

// 匹配工艺参数函数
export const matchProcessParameters = (formData) => {
  // 查找匹配的工艺规则
  const matchedRule = processCombinationRules.find(rule => 
    rule.baseProcess === formData.baseProcess && 
    rule.combinedProcess === formData.combinedProcess
  )

  if (!matchedRule) return null

  // 根据应用场景和表面材质调整参数
  const result = { ...matchedRule }

  // 调整温度参数
  if (formData.surfaceMaterial === 'cloth_paper') {
    result.parameters.temperature.value = 
      (parseInt(result.parameters.temperature.value) + 20).toString()
    result.precautions.push('布面纸需要更高温度，注意控制')
  }

  if (formData.surfaceMaterial === 'fluorescent_ink') {
    result.parameters.temperature.value = 
      (parseInt(result.parameters.temperature.value) - 10).toString()
    result.precautions.push('荧光油墨面需要降低温度，避免破坏荧光效果')
  }

  return result
}