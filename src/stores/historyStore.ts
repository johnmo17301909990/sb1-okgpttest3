import { defineStore } from 'pinia'
import type { ProcessHistory } from '../types/history'

export const useHistoryStore = defineStore('history', {
  state: () => ({
    records: [] as ProcessHistory[],
    statistics: {
      totalProcesses: 0,
      successRate: 0,
      averageParameters: {
        temperature: 0,
        pressure: 0,
        dwellTime: 0,
        speed: 0
      },
      commonIssues: [] as string[]
    }
  }),

  actions: {
    addRecord(record: ProcessHistory) {
      this.records.push(record)
      this.updateStatistics()
    },

    updateStatistics() {
      const total = this.records.length
      if (total === 0) return

      const successful = this.records.filter(r => r.result === 'success').length
      
      // 计算平均参数
      const params = this.records.reduce((acc, curr) => ({
        temperature: acc.temperature + curr.parameters.temperature,
        pressure: acc.pressure + curr.parameters.pressure,
        dwellTime: acc.dwellTime + curr.parameters.dwellTime,
        speed: acc.speed + curr.parameters.speed
      }), { temperature: 0, pressure: 0, dwellTime: 0, speed: 0 })

      // 统计常见问题
      const issues = this.records
        .filter(r => r.result === 'failure')
        .reduce((acc, curr) => {
          curr.quality.issues.forEach(issue => {
            acc[issue] = (acc[issue] || 0) + 1
          })
          return acc
        }, {} as Record<string, number>)

      this.statistics = {
        totalProcesses: total,
        successRate: (successful / total) * 100,
        averageParameters: {
          temperature: params.temperature / total,
          pressure: params.pressure / total,
          dwellTime: params.dwellTime / total,
          speed: params.speed / total
        },
        commonIssues: Object.entries(issues)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([issue]) => issue)
      }
    },

    clearHistory() {
      this.records = []
      this.updateStatistics()
    }
  }
})