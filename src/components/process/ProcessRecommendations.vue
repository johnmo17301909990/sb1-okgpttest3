<template>
  <div class="process-recommendations">
    <h3>推荐方案</h3>
    
    <!-- 排序控制 -->
    <div class="sort-controls">
      <el-radio-group v-model="sortBy" @change="handleSortChange">
        <el-radio-button label="default">默认排序</el-radio-button>
        <el-radio-button label="delivery">按交期</el-radio-button>
        <el-radio-button label="cost">按成本</el-radio-button>
      </el-radio-group>
      
      <el-button type="primary" @click="exportReport">
        导出报告
        <el-icon class="el-icon--right"><Download /></el-icon>
      </el-button>
    </div>

    <!-- 优选方案 -->
    <el-card class="recommendation-card primary">
      <template #header>
        <div class="card-header">
          <span>优选方案</span>
          <el-tag type="success">推荐</el-tag>
        </div>
      </template>
      
      <el-descriptions :column="2" border>
        <el-descriptions-item label="工艺组合">
          {{ recommendation.processName }}
        </el-descriptions-item>
        <el-descriptions-item label="适用材质">
          {{ recommendation.suitableMaterials }}
        </el-descriptions-item>
        <el-descriptions-item label="预计交期">
          {{ recommendation.deliveryTime }} 天
        </el-descriptions-item>
        <el-descriptions-item label="成本估算">
          {{ recommendation.estimatedCost }} 元/m²
        </el-descriptions-item>
      </el-descriptions>

      <div class="process-details">
        <h4>工艺流程</h4>
        <el-steps :active="recommendation.processFlow.length" finish-status="success">
          <el-step 
            v-for="(step, index) in recommendation.processFlow"
            :key="index"
            :title="step.name"
            :description="step.description"
          />
        </el-steps>
      </div>
    </el-card>

    <!-- 备选方案列表 -->
    <div v-if="alternatives.length > 0" class="alternatives">
      <h4>备选方案</h4>
      <el-card 
        v-for="(alt, index) in alternatives"
        :key="index"
        class="recommendation-card alternative"
      >
        <template #header>
          <div class="card-header">
            <span>方案 {{ index + 1 }}</span>
            <el-tag type="info">备选</el-tag>
          </div>
        </template>

        <el-descriptions :column="2" border>
          <el-descriptions-item label="工艺组合">
            {{ alt.processName }}
          </el-descriptions-item>
          <el-descriptions-item label="适用材质">
            {{ alt.suitableMaterials }}
          </el-descriptions-item>
          <el-descriptions-item label="预计交期">
            {{ alt.deliveryTime }} 天
          </el-descriptions-item>
          <el-descriptions-item label="成本估算">
            {{ alt.estimatedCost }} 元/m²
          </el-descriptions-item>
        </el-descriptions>

        <div class="process-details">
          <el-collapse>
            <el-collapse-item title="查看工艺流程">
              <el-steps :active="alt.processFlow.length" finish-status="success">
                <el-step 
                  v-for="(step, stepIndex) in alt.processFlow"
                  :key="stepIndex"
                  :title="step.name"
                  :description="step.description"
                />
              </el-steps>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Download } from '@element-plus/icons-vue'
import { saveAs } from 'file-saver'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

const props = defineProps({
  recommendation: {
    type: Object,
    required: true
  },
  alternatives: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['sort-change'])

const sortBy = ref('default')

const handleSortChange = (value) => {
  emit('sort-change', value)
}

const exportReport = () => {
  const doc = new jsPDF()
  
  // 添加标题
  doc.setFontSize(20)
  doc.text('工艺组合推荐报告', 20, 20)

  // 添加优选方案
  doc.setFontSize(16)
  doc.text('优选方案', 20, 40)
  
  doc.autoTable({
    startY: 45,
    head: [['项目', '内容']],
    body: [
      ['工艺组合', props.recommendation.processName],
      ['适用材质', props.recommendation.suitableMaterials],
      ['预计交期', `${props.recommendation.deliveryTime} 天`],
      ['成本估算', `${props.recommendation.estimatedCost} 元/m²`]
    ]
  })

  // 添加工艺流程
  let yPos = doc.lastAutoTable.finalY + 10
  doc.setFontSize(14)
  doc.text('工艺流程', 20, yPos)
  
  const processFlowData = props.recommendation.processFlow.map(step => [
    step.name,
    step.description
  ])
  
  doc.autoTable({
    startY: yPos + 5,
    head: [['步骤', '说明']],
    body: processFlowData
  })

  // 添加备选方案
  if (props.alternatives.length > 0) {
    yPos = doc.lastAutoTable.finalY + 10
    doc.setFontSize(16)
    doc.text('备选方案', 20, yPos)
    
    props.alternatives.forEach((alt, index) => {
      yPos = doc.lastAutoTable.finalY + 10
      doc.setFontSize(14)
      doc.text(`方案 ${index + 1}`, 20, yPos)
      
      doc.autoTable({
        startY: yPos + 5,
        head: [['项目', '内容']],
        body: [
          ['工艺组合', alt.processName],
          ['适用材质', alt.suitableMaterials],
          ['预计交期', `${alt.deliveryTime} 天`],
          ['成本估算', `${alt.estimatedCost} 元/m²`]
        ]
      })
    })
  }

  // 保存文件
  doc.save('工艺组合推荐报告.pdf')
}
</script>

<style scoped>
.process-recommendations {
  margin-top: 24px;
}

h3 {
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.sort-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.recommendation-card {
  margin-bottom: 16px;
}

.recommendation-card.primary {
  border: 1px solid #67c23a;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.process-details {
  margin-top: 16px;
}

h4 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 500;
  color: #606266;
}

.alternatives {
  margin-top: 24px;
}

:deep(.el-step__title) {
  font-size: 14px;
}

:deep(.el-step__description) {
  font-size: 12px;
}

:deep(.el-descriptions__label) {
  width: 120px;
}
</style>