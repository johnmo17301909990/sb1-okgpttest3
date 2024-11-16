import { defineStore } from 'pinia'
import { processOptions, processCombinationRules, matchProcessParameters } from '../data/processCombination'

export const useProcessCombinationStore = defineStore('processCombination', {
  state: () => ({
    form: {
      baseProcess: '',
      combinedProcess: '',
      application: '',
      surfaceMaterial: '',
      additionalRequirements: {
        deliveryPriority: false,
        costPriority: false,
        qualityPriority: false,
        temperatureRange: null,
        customNotes: ''
      }
    },
    matchResult: null,
    sortBy: 'default'
  }),

  actions: {
    updateForm(formData) {
      this.form = { ...this.form, ...formData }
    },

    updateAdditionalRequirements(requirements) {
      this.form.additionalRequirements = {
        ...this.form.additionalRequirements,
        ...requirements
      }
    },

    async matchProcess() {
      const result = matchProcessParameters(this.form)
      if (result) {
        // Sort results based on priority
        if (this.sortBy === 'delivery') {
          result.alternatives = this.sortByDelivery(result.alternatives)
        } else if (this.sortBy === 'cost') {
          result.alternatives = this.sortByCost(result.alternatives)
        }
        this.matchResult = result
        return true
      }
      return false
    },

    setSortBy(sortType) {
      this.sortBy = sortType
      if (this.matchResult) {
        this.matchProcess() // Re-sort results
      }
    },

    sortByDelivery(alternatives) {
      return [...alternatives].sort((a, b) => 
        a.deliveryTime - b.deliveryTime
      )
    },

    sortByCost(alternatives) {
      return [...alternatives].sort((a, b) => 
        a.estimatedCost - b.estimatedCost
      )
    },

    reset() {
      this.form = {
        baseProcess: '',
        combinedProcess: '',
        application: '',
        surfaceMaterial: '',
        additionalRequirements: {
          deliveryPriority: false,
          costPriority: false,
          qualityPriority: false,
          temperatureRange: null,
          customNotes: ''
        }
      }
      this.matchResult = null
      this.sortBy = 'default'
    }
  }
})