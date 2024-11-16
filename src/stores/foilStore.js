import { defineStore } from 'pinia'
import { matchFoils } from '../data/foilMappings'

export const useFoilStore = defineStore('foil', {
  state: () => ({
    hasSearched: false,
    recommendedFoils: [],
    selectedFoil: null,
    matchResult: null,
    currentForm: {
      foilArea: '',
      foilPattern: '',
      color: '',
      application: '',
      surfaceTreatment: '',
      processOrder: '',
      requiresUV: false
    }
  }),

  actions: {
    updateForm(formData) {
      this.currentForm = { ...formData }
    },

    searchFoils() {
      this.hasSearched = true
      
      // 验证必填参数
      if (!this.currentForm.foilArea || !this.currentForm.foilPattern) {
        this.recommendedFoils = []
        this.matchResult = {
          status: 'incomplete',
          message: '请完善必要参数',
          suggestions: [
            !this.currentForm.foilArea && '选择烫金面积',
            !this.currentForm.foilPattern && '选择图案类型'
          ].filter(Boolean)
        }
        return this.matchResult
      }

      // 检查工艺冲突
      const conflicts = this.checkProcessConflicts()
      if (conflicts.length > 0) {
        this.recommendedFoils = []
        this.matchResult = {
          status: 'conflict',
          message: '存在工艺冲突',
          conflicts,
          suggestions: this.generateConflictSuggestions(conflicts)
        }
        return this.matchResult
      }

      const result = matchFoils(this.currentForm)
      this.recommendedFoils = result.foils
      this.matchResult = result

      return result
    },

    checkProcessConflicts() {
      const conflicts = []
      const { requiresUV, surfaceTreatment, processOrder, foilPattern, foilArea } = this.currentForm

      // UV工艺冲突检查
      if (requiresUV && surfaceTreatment?.includes('powderSurface')) {
        conflicts.push('UV工艺与粉纸面处理不兼容')
      }

      // 工艺顺序冲突检查
      if (processOrder === 'foilThenUv' && surfaceTreatment === 'uvCoating') {
        conflicts.push('UV涂层表面不适合后续UV处理')
      }

      // 图案类型与面积冲突检查
      if (foilPattern === 'fine' && foilArea === 'large') {
        conflicts.push('大面积不适合幼细线条图案')
      }

      return conflicts
    },

    generateConflictSuggestions(conflicts) {
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
    },

    selectFoil(foil) {
      this.selectedFoil = foil
    },

    reset() {
      this.hasSearched = false
      this.recommendedFoils = []
      this.selectedFoil = null
      this.matchResult = null
      this.currentForm = {
        foilArea: '',
        foilPattern: '',
        color: '',
        application: '',
        surfaceTreatment: '',
        processOrder: '',
        requiresUV: false
      }
    }
  }
})