import { defineStore } from 'pinia'
import type { FoilCriteria, SelectedFoil } from '../types/po'
import { matchFoils } from '../data/foilMappings'

export interface MatchResult {
  foils: SelectedFoil[];
  status: 'success' | 'no_match' | 'conflict' | 'out_of_scope' | 'incomplete' | 'invalid_combination';
  message: string;
  conflicts?: string[];
  issues?: string[];
  suggestions?: string[];
  alternativeSuggestions?: string[];
}

export const initialFormState: FoilCriteria = {
  foilArea: '',
  foilPattern: '',
  surfaceTreatment: '',
  processOrder: '',
  color: undefined,
  application: undefined,
  requiresUV: false
}

export const useFoilStore = defineStore('foil', {
  state: () => ({
    form: { ...initialFormState },
    recommendedFoils: [] as SelectedFoil[],
    selectedFoil: null as SelectedFoil | null,
    hasSearched: false,
    matchResult: null as MatchResult | null
  }),

  actions: {
    updateForm(formData: Partial<FoilCriteria>) {
      this.form = { ...this.form, ...formData }
    },

    searchFoils(): MatchResult {
      this.hasSearched = true
      const result = matchFoils(this.form)
      
      this.matchResult = result
      this.recommendedFoils = result.foils

      return result
    },

    selectFoil(foil: SelectedFoil) {
      this.selectedFoil = { ...foil }
    },

    reset() {
      this.form = { ...initialFormState }
      this.resetResults()
      this.resetSelection()
    },

    resetResults() {
      this.recommendedFoils = []
      this.hasSearched = false
      this.matchResult = null
    },

    resetSelection() {
      this.selectedFoil = null
    }
  }
})