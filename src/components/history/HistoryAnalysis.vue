<template>
  <div class="history-analysis">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>工艺历史分析</span>
          <div>
            <el-button type="success" @click="exportHistory">导出数据</el-button>
            <el-button type="danger" @click="confirmClear">清除历史</el-button>
          </div>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-statistic title="总工艺次数" :value="store.statistics.totalProcesses" />
        </el-col>
        <el-col :span="6">
          <el-statistic 
            title="成功率" 
            :value="store.statistics.successRate"
            :precision="2"
            suffix="%"
          />
        </el-col>
        <el-col :span="12">
          <h4>常见问题</h4>
          <el-tag 
            v-for="issue in store.statistics.commonIssues" 
            :key="issue"
            class="issue-tag"
          >
            {{ issue }}
          </el-tag>
        </el-col>
      </el-row>

      <el-divider>平均工艺参数</el-divider>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-statistic 
            title="温度" 
            :value="store.statistics.averageParameters.temperature"
            :precision="1"
            suffix="°C"
          />
        </el-col>
        <el-col :span="6">
          <el-statistic 
            title="压力" 
            :value="store.statistics.averageParameters.pressure"
            :precision="2"
            suffix="MPa"
          />
        </el-col>
        <el-col :span="6">
          <el-statistic 
            title="停留时间" 
            :value="store.statistics.averageParameters.dwellTime"
            :precision="1"
            suffix="s"
          />
        </el-col>
        <el-col :span="6">
          <el-statistic 
            title="生产速度" 
            :value="store.statistics.averageParameters.speed"
            :precision="1"
            suffix="m/min"
          />
        </el-col>
      </el-row>

      <el-divider>历史记录</el-divider>

      <el-table :data="store.records" style="width: 100%" :max-height="400">
        <el-table-column prop="timestamp" label="时间" width="180">
          <template #default="scope">
            {{ formatDate(scope.row.timestamp) }}
          </template>
        </el-table-column>
        <el-table-column prop="foilType" label="烫金纸型号" width="120" />
        <el-table-column prop="operator" label="操作员" width="100" />
        <el-table-column prop="result" label="结果" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.result === 'success' ? 'success' : 'danger'">
              {{ scope.row.result === 'success' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="质量评估">
          <template #default="scope">
            <el-tooltip 
              :content="getQualityDetails(scope.row.quality)"
              placement="top"
            >
              <div class="quality-summary">
                <el-rate
                  :model-value="getQualityScore(scope.row.quality)"
                  disabled
                  show-score
                />
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="notes" label="备注" show-overflow-tooltip />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox, ElMessage } from 'element-plus'
import { useHistoryStore } from '../../stores/historyStore'
import type { QualityControl } from '../../types/history'

const store = useHistoryStore()

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString()
}

const getQualityScore = (quality: QualityControl): number => {
  const scores = {
    excellent: 5,
    good: 4,
    fair: 3,
    poor: 1
  }
  
  const adhesionScore = scores[quality.adhesion]
  const uniformityScore = scores[quality.uniformity]
  const definitionScore = quality.definition === 'high' ? 5 : 
                         quality.definition === 'medium' ? 3 : 1
  const coverageScore = quality.coverage >= 95 ? 5 :
                       quality.coverage >= 90 ? 4 :
                       quality.coverage >= 85 ? 3 : 2

  return ((adhesionScore + uniformityScore + definitionScore + coverageScore) / 4)
}

const getQualityDetails = (quality: QualityControl): string => {
  return `附着力: ${quality.adhesion}
均匀性: ${quality.uniformity}
清晰度: ${quality.definition}
覆盖率: ${quality.coverage}%
${quality.issues.length ? '\n问题: ' + quality.issues.join(', ') : ''}`
}

const confirmClear = () => {
  ElMessageBox.confirm(
    '确定要清除所有历史记录吗？此操作不可恢复。',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    store.clearHistory()
    ElMessage.success('历史记录已清除')
  })
}

const exportHistory = () => {
  const data = JSON.stringify(store.records, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `foil-history-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
  ElMessage.success('历史数据导出成功')
}
</script>

<style scoped>
.history-analysis {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.issue-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}

.quality-summary {
  display: flex;
  align-items: center;
}

.el-divider {
  margin: 24px 0;
}

:deep(.el-statistic__content) {
  font-size: 24px;
}

:deep(.el-statistic__title) {
  font-size: 16px;
  color: #606266;
}
</style>