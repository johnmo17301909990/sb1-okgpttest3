import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export function useRules() {
  const rules = ref([
    // 烫金面积规则组
    {
      id: 1,
      name: '小面积烫金规则',
      description: '适用于小面积(<50mm x 50mm)的烫金工艺',
      priority: 1,
      enabled: true,
      category: '烫金面积',
      conditions: [
        { field: 'foilArea', operator: 'equals', value: 'small' }
      ]
    },
    {
      id: 2,
      name: '中面积烫金规则',
      description: '适用于中面积(50-100mm x 50-100mm)的烫金工艺',
      priority: 2,
      enabled: true,
      category: '烫金面积',
      conditions: [
        { field: 'foilArea', operator: 'equals', value: 'medium' }
      ]
    },
    {
      id: 3,
      name: '大面积烫金规则',
      description: '适用于大面积(≥100mm x 100mm)的烫金工艺',
      priority: 3,
      enabled: true,
      category: '烫金面积',
      conditions: [
        { field: 'foilArea', operator: 'equals', value: 'large' }
      ]
    },

    // 烫金图案类型规则组
    {
      id: 4,
      name: '幼细线条烫金规则',
      description: '适用于幼细线条和文字的烫金工艺',
      priority: 4,
      enabled: true,
      category: '烫金图案类型',
      conditions: [
        { field: 'foilPattern', operator: 'equals', value: 'fine' }
      ]
    },
    {
      id: 5,
      name: '渐变网点烫金规则',
      description: '适用于渐变和网点效果的烫金工艺',
      priority: 5,
      enabled: true,
      category: '烫金图案类型',
      conditions: [
        { field: 'foilPattern', operator: 'equals', value: 'halftone' }
      ]
    },
    {
      id: 6,
      name: '立体纹理烫金规则',
      description: '适用于立体、磨砂和纹理效果的烫金工艺',
      priority: 6,
      enabled: true,
      category: '烫金图案类型',
      conditions: [
        { field: 'foilPattern', operator: 'equals', value: 'textured' }
      ]
    },

    // 颜色规则组
    {
      id: 7,
      name: '金色烫金规则',
      description: '适用于金色烫金纸的选择',
      priority: 7,
      enabled: true,
      category: '颜色',
      conditions: [
        { field: 'color', operator: 'equals', value: 'gold' }
      ]
    },
    {
      id: 8,
      name: '银色烫金规则',
      description: '适用于银色烫金纸的选择',
      priority: 8,
      enabled: true,
      category: '颜色',
      conditions: [
        { field: 'color', operator: 'equals', value: 'silver' }
      ]
    },
    {
      id: 9,
      name: '哑光金属烫金规则',
      description: '适用于哑光金属效果的烫金纸选择',
      priority: 9,
      enabled: true,
      category: '颜色',
      conditions: [
        { field: 'color', operator: 'contains', value: 'matt' }
      ]
    },

    // 应用场景规则组
    {
      id: 10,
      name: '贺卡应用规则',
      description: '适用于贺卡类产品的烫金工艺',
      priority: 10,
      enabled: true,
      category: '应用场景',
      conditions: [
        { field: 'application', operator: 'equals', value: 'greetingCard' }
      ]
    },
    {
      id: 11,
      name: '精装书应用规则',
      description: '适用于精装书类产品的烫金工艺',
      priority: 11,
      enabled: true,
      category: '应用场景',
      conditions: [
        { field: 'application', operator: 'equals', value: 'hardcoverBook' }
      ]
    },
    {
      id: 12,
      name: '包装应用规则',
      description: '适用于包装类产品的烫金工艺',
      priority: 12,
      enabled: true,
      category: '应用场景',
      conditions: [
        { field: 'application', operator: 'equals', value: 'packaging' }
      ]
    },

    // 表面处理规则组
    {
      id: 13,
      name: 'UV涂层烫金规则',
      description: '适用于UV涂层表面的烫金工艺',
      priority: 13,
      enabled: true,
      category: '表面处理',
      conditions: [
        { field: 'surfaceTreatment', operator: 'contains', value: 'uvCoating' }
      ]
    },
    {
      id: 14,
      name: '普通纸张烫金规则',
      description: '适用于普通纸张表面的烫金工艺',
      priority: 14,
      enabled: true,
      category: '表面处理',
      conditions: [
        { field: 'surfaceTreatment', operator: 'equals', value: 'normal' }
      ]
    },

    // 工艺顺序规则组
    {
      id: 15,
      name: '烫金后UV规则',
      description: '适用于需要烫金后过UV的工艺',
      priority: 15,
      enabled: true,
      category: '工艺顺序',
      conditions: [
        { field: 'processOrder', operator: 'equals', value: 'foilThenUv' }
      ]
    },
    {
      id: 16,
      name: '烫金后过胶规则',
      description: '适用于需要烫金后过胶的工艺',
      priority: 16,
      enabled: true,
      category: '工艺顺序',
      conditions: [
        { field: 'processOrder', operator: 'equals', value: 'foilThenCoating' }
      ]
    },

    // UV需求规则组
    {
      id: 17,
      name: 'UV兼容规则',
      description: '适用于需要UV处理的烫金工艺',
      priority: 17,
      enabled: true,
      category: 'UV需求',
      conditions: [
        { field: 'requiresUV', operator: 'equals', value: true }
      ]
    }
  ])

  const currentRule = ref(null)

  const addRule = (rule) => {
    rules.value.push(rule)
    ElMessage.success('规则添加成功')
  }

  const updateRule = (rule) => {
    const index = rules.value.findIndex(r => r.id === rule.id)
    if (index > -1) {
      rules.value[index] = rule
      ElMessage.success('规则更新成功')
    }
  }

  const removeRule = (rule) => {
    ElMessageBox.confirm('确定要删除这条规则吗？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      const index = rules.value.findIndex(r => r.id === rule.id)
      if (index > -1) {
        rules.value.splice(index, 1)
        ElMessage.success('删除成功')
      }
    })
  }

  const getRulesByCategory = () => {
    const categories = [
      '烫金面积',
      '烫金图案类型',
      '颜色',
      '应用场景',
      '表面处理',
      '工艺顺序',
      'UV需求'
    ]
    
    return categories.map(category => ({
      category,
      rules: rules.value.filter(rule => rule.category === category)
    }))
  }

  return {
    rules,
    currentRule,
    addRule,
    updateRule,
    removeRule,
    getRulesByCategory
  }
}