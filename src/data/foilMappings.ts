import { FoilMapping, FoilCriteria } from '../types/po'
import type { MatchResult } from '../stores/foilStore'

// ... (保留现有的 options 定义)

export const matchFoils = (criteria: FoilCriteria): MatchResult => {
  // 验证必填参数
  if (!criteria.foilArea || !criteria.foilPattern) {
    return {
      foils: [],
      status: 'incomplete',
      message: '请填写必要的参数：烫金面积和图案类型',
      suggestions: ['选择烫金面积', '选择图案类型']
    }
  }

  // 检查工艺冲突
  const conflicts = checkProcessConflicts(criteria)
  if (conflicts.length > 0) {
    return {
      foils: [],
      status: 'conflict',
      message: '存在工艺冲突，请调整以下参数：',
      conflicts,
      suggestions: generateConflictSuggestions(conflicts)
    }
  }

  // 检查参数组合是否在合理范围内
  const validationResult = validateParameterCombination(criteria)
  if (!validationResult.valid) {
    return {
      foils: [],
      status: 'invalid_combination',
      message: '当前参数组合不合理：',
      issues: validationResult.issues,
      suggestions: validationResult.suggestions
    }
  }

  // 匹配烫金纸
  const matches = foilMappings.filter(mapping => {
    return mapping.supplierCodes.some(supplier => {
      // ... (保留现有的匹配逻辑)
    })
  })

  // 转换匹配结果
  const foils = matches.map(mapping => {
    const supplier = mapping.supplierCodes[0]
    return {
      companyCode: mapping.companyCode,
      supplierCode: supplier.code,
      series: supplier.series,
      category: supplier.category,
      usage: supplier.usage,
      mainApplication: supplier.mainApplication,
      suitableSize: supplier.suitableSize,
      tension: supplier.tension,
      uvCompatible: supplier.uvCompatible,
      color: supplier.color
    }
  })

  // 检查是否超出规则定义范围
  if (foils.length === 0) {
    const outOfScopeResult = checkOutOfScope(criteria)
    if (outOfScopeResult.isOutOfScope) {
      return {
        foils: [],
        status: 'out_of_scope',
        message: '当前参数组合超出规则定义范围：',
        issues: outOfScopeResult.issues,
        suggestions: outOfScopeResult.suggestions,
        alternativeSuggestions: outOfScopeResult.alternatives
      }
    }

    // 如果没有匹配结果但参数合理，提供优化建议
    return {
      foils: [],
      status: 'no_match',
      message: '未找到完全匹配的烫金纸，建议调整以下参数：',
      suggestions: generateOptimizationSuggestions(criteria)
    }
  }

  return {
    foils,
    status: 'success',
    message: `找到 ${foils.length} 个匹配结果`,
    suggestions: foils.length === 1 ? [] : generateRefinementSuggestions(criteria, foils)
  }
}

// 检查工艺冲突
const checkProcessConflicts = (criteria: FoilCriteria): string[] => {
  const conflicts: string[] = []

  // UV工艺冲突检查
  if (criteria.requiresUV && criteria.surfaceTreatment?.includes('powderSurface')) {
    conflicts.push('UV工艺与粉纸面处理不兼容，请选择其他表面处理方式')
  }

  // 工艺顺序冲突检查
  if (criteria.processOrder === 'foilThenUv' && criteria.surfaceTreatment === 'uvCoating') {
    conflicts.push('UV涂层表面不适合后续UV处理，建议调整工艺顺序')
  }

  // 图案类型与面积冲突检查
  if (criteria.foilPattern === 'fine' && criteria.foilArea === 'large') {
    conflicts.push('大面积不适合幼细线条图案，建议选择较小面积或更改图案类型')
  }

  return conflicts
}

// 生成冲突解决建议
const generateConflictSuggestions = (conflicts: string[]): string[] => {
  return conflicts.map(conflict => {
    if (conflict.includes('UV工艺与粉纸面处理不兼容')) {
      return '建议选择普通纸张或UV涂层表面'
    }
    if (conflict.includes('UV涂层表面不适合后续UV处理')) {
      return '建议选择"UV后烫金"或更换表面处理方式'
    }
    if (conflict.includes('大面积不适合幼细线条图案')) {
      return '建议选择中小面积或更改为普通图案类型'
    }
    return conflict
  })
}

// 验证参数组合是否合理
const validateParameterCombination = (criteria: FoilCriteria) => {
  const issues: string[] = []
  const suggestions: string[] = []

  // 检查面积与图案的匹配度
  if (criteria.foilArea === 'small' && criteria.foilPattern === 'textured') {
    issues.push('小面积不适合复杂的立体纹理效果')
    suggestions.push('建议选择更大的烫金面积或更简单的图案类型')
  }

  // 检查应用场景与工艺的匹配度
  if (criteria.application === 'greetingCard' && criteria.processOrder === 'foilThenPrint') {
    issues.push('贺卡工艺通常不建议烫金后印刷')
    suggestions.push('建议选择"UV后烫金"或"烫金后UV"工艺')
  }

  return {
    valid: issues.length === 0,
    issues,
    suggestions
  }
}

// 检查是否超出规则定义范围
const checkOutOfScope = (criteria: FoilCriteria) => {
  const issues: string[] = []
  const suggestions: string[] = []
  const alternatives: string[] = []

  // 特殊组合检查
  if (criteria.foilPattern === 'textured' && criteria.requiresUV) {
    issues.push('立体纹理效果与UV工艺组合超出现有工艺范围')
    suggestions.push('建议选择普通图案类型或放弃UV工艺')
    alternatives.push('可以考虑使用专用的UV烫金纸')
  }

  if (criteria.foilArea === 'large' && criteria.foilPattern === 'halftone') {
    issues.push('大面积渐变网点效果超出工艺稳定范围')
    suggestions.push('建议分割为多个中等面积区域')
    alternatives.push('可以考虑使用特殊系列烫金纸')
  }

  return {
    isOutOfScope: issues.length > 0,
    issues,
    suggestions,
    alternatives
  }
}

// 生成优化建议
const generateOptimizationSuggestions = (criteria: FoilCriteria): string[] => {
  const suggestions: string[] = []

  // 根据不同参数生成具体建议
  if (criteria.foilPattern === 'fine') {
    suggestions.push('考虑选择 SY6-系列 或 A23系列 烫金纸，它们更适合细线条效果')
  }

  if (criteria.application === 'greetingCard') {
    suggestions.push('建议尝试 SY1-系列，该系列特别适合贺卡应用')
  }

  if (criteria.requiresUV) {
    suggestions.push('可以考虑使用 ST系列 或 GN系列，它们具有良好的UV兼容性')
  }

  return suggestions
}

// 生成结果优化建议
const generateRefinementSuggestions = (criteria: FoilCriteria, foils: any[]): string[] => {
  const suggestions: string[] = []

  if (foils.length > 3) {
    if (!criteria.color) {
      suggestions.push('可以通过选择具体颜色来缩小范围')
    }
    if (!criteria.application) {
      suggestions.push('建议选择具体的应用场景以获得更精准的匹配')
    }
  }

  return suggestions
}