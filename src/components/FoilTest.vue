<template>
  <div class="foil-test">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>烫金工艺测试</span>
          <div class="header-actions">
            <el-select v-model="selectedTestCase" placeholder="选择测试案例" clearable @change="handleTestCaseChange">
              <el-option-group label="可匹配案例">
                <el-option 
                  v-for="test in testCases"
                  :key="test.name"
                  :label="test.name"
                  :value="test.name"
                >
                  <div class="test-case-option">
                    <span>{{ test.name }}</span>
                    <small>{{ test.description }}</small>
                  </div>
                </el-option>
              </el-option-group>
              
              <el-option-group label="不可匹配案例">
                <el-option 
                  v-for="test in unmatchableTestCases"
                  :key="test.name"
                  :label="test.name"
                  :value="test.name"
                >
                  <div class="test-case-option">
                    <span>{{ test.name }}</span>
                    <small>{{ test.description }}</small>
                  </div>
                </el-option>
              </el-option-group>
            </el-select>
            <el-button type="primary" @click="handleTest">开始匹配</el-button>
            <el-button @click="resetForm">重置</el-button>
          </div>
        </div>
      </template>

      <el-form :model="form" label-width="120px">
        <!-- 第一优先级：应用场景 -->
        <el-form-item label="应用场景" required>
          <el-select v-model="form.application" placeholder="请选择应用场景">
            <el-option
              v-for="item in applicationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div class="field-hint">不同应用场景对工艺要求不同，请优先选择</div>
        </el-form-item>

        <!-- 第二优先级：技术参数 -->
        <el-divider content-position="left">技术参数</el-divider>

        <el-form-item label="烫金面积" required>
          <el-select v-model="form.foilArea" placeholder="请选择烫金面积">
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div class="field-hint">面积大小影响材料选择和工艺稳定性</div>
        </el-form-item>

        <el-form-item label="烫金图案类型" required>
          <el-select v-model="form.foilPattern" placeholder="请选择图案类型">
            <el-option
              v-for="item in patternOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div class="field-hint">不同图案类型需要匹配相应的烫金材料</div>
        </el-form-item>

        <!-- 第三优先级：工艺要求 -->
        <el-divider content-position="left">工艺要求</el-divider>

        <el-form-item label="表面处理">
          <el-select v-model="form.surfaceTreatment" placeholder="请选择表面处理">
            <el-option
              v-for="item in surfaceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div class="field-hint">表面处理会影响烫金效果和后续工艺</div>
        </el-form-item>

        <!-- 第四优先级：颜色 -->
        <el-form-item label="颜色">
          <el-select v-model="form.color" placeholder="请选择颜色">
            <el-option
              v-for="item in colorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div class="field-hint">可根据实际需求选择颜色</div>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 匹配过程展示 -->
    <el-card v-if="hasSearched" class="box-card mt-4">
      <template #header>
        <div class="card-header">
          <span>匹配过程</span>
          <div v-if="selectedTestCase && currentTestCase?.reason" class="expected-result">
            <el-alert
              type="warning"
              :title="currentTestCase.reason"
              :closable="false"
            />
          </div>
        </div>
      </template>

      <el-timeline>
        <el-timeline-item
          v-for="(step, index) in matchingSteps"
          :key="index"
          :type="step.type"
          :color="step.color"
          :size="step.important ? 'large' : 'normal'"
        >
          <h4 class="step-title">{{ step.title }}</h4>
          <p class="step-description">{{ step.description }}</p>
          <template v-if="step.details">
            <div class="step-details">
              <ul>
                <li v-for="(detail, idx) in step.details" :key="idx">
                  {{ detail }}
                </li>
              </ul>
            </div>
          </template>
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <!-- 匹配结果展示 -->
    <el-card v-if="hasSearched" class="box-card mt-4">
      <template #header>
        <div class="card-header">
          <span>推荐烫金纸</span>
        </div>
      </template>

      <div v-if="recommendedFoils.length === 0" class="no-results">
        <el-empty :description="noResultsMessage">
          <template v-if="suggestions.length > 0">
            <div class="suggestions">
              <h4>优化建议：</h4>
              <ul>
                <li v-for="(suggestion, index) in suggestions" :key="index">
                  {{ suggestion }}
                </li>
              </ul>
            </div>
          </template>
        </el-empty>
      </div>

      <el-table v-else :data="recommendedFoils" style="width: 100%">
        <el-table-column prop="companyCode" label="公司编号" width="120" />
        <el-table-column prop="supplierCode" label="供应商编号" width="120" />
        <el-table-column prop="series" label="系列" width="120" />
        <el-table-column prop="usage" label="用途说明" show-overflow-tooltip />
        <el-table-column prop="mainApplication" label="主要应用" width="150" />
        <el-table-column prop="supportedPatterns" label="支持图案" width="150" show-overflow-tooltip />
        <el-table-column prop="suitableSizes" label="适用尺寸" width="150" />
        <el-table-column label="UV兼容" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.uvCompatible ? 'success' : 'danger'">
              {{ scope.row.uvCompatible ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { matchFoils, areaOptions, patternOptions, surfaceOptions, colorOptions, applicationOptions } from '../data/foilMappings'
import { testCases, unmatchableTestCases } from '../data/testCases'

const selectedTestCase = ref('')
const hasSearched = ref(false)
const recommendedFoils = ref([])
const matchingSteps = ref([])
const noResultsMessage = ref('')
const suggestions = ref([])

const form = reactive({
  application: '',
  foilArea: '',
  foilPattern: '',
  surfaceTreatment: '',
  color: '',
  requiresUV: false
})

const currentTestCase = computed(() => {
  if (!selectedTestCase.value) return null
  return testCases.find(test => test.name === selectedTestCase.value) ||
         unmatchableTestCases.find(test => test.name === selectedTestCase.value)
})

const handleTestCaseChange = (caseName) => {
  if (!caseName) {
    resetForm()
    return
  }

  const testCase = currentTestCase.value
  if (testCase) {
    Object.assign(form, testCase.params)
    handleTest()
  }
}

const handleTest = () => {
  if (!form.application || !form.foilArea || !form.foilPattern) {
    ElMessage.warning('请至少选择应用场景、烫金面积和图案类型')
    return
  }

  hasSearched.value = true
  noResultsMessage.value = ''
  const result = matchFoils(form)
  
  matchingSteps.value = result.matchingSteps || []
  suggestions.value = result.suggestions || []
  
  if (result.status === 'success') {
    recommendedFoils.value = result.foils
    ElMessage.success(result.message)
  } else {
    recommendedFoils.value = []
    noResultsMessage.value = result.message
    ElMessage.warning(result.message)
  }
}

const resetForm = () => {
  selectedTestCase.value = ''
  Object.assign(form, {
    application: '',
    foilArea: '',
    foilPattern: '',
    surfaceTreatment: '',
    color: '',
    requiresUV: false
  })
  hasSearched.value = false
  recommendedFoils.value = []
  matchingSteps.value = []
  suggestions.value = []
}
</script>

<style scoped>
.foil-test {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.header-actions .el-select {
  width: 240px;
}

.test-case-option {
  display: flex;
  flex-direction: column;
}

.test-case-option small {
  color: #909399;
  font-size: 12px;
}

.field-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
  line-height: 1.4;
}

.no-results {
  padding: 40px 0;
  text-align: center;
}

.suggestions {
  margin-top: 20px;
  text-align: left;
}

.suggestions h4 {
  color: #606266;
  margin-bottom: 12px;
}

.suggestions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestions li {
  color: #409EFF;
  margin-bottom: 8px;
}

.mt-4 {
  margin-top: 16px;
}

.el-divider {
  margin: 24px 0 16px;
  color: #606266;
  font-size: 14px;
  font-weight: 500;
}

.expected-result {
  margin-left: 16px;
  flex: 1;
}

:deep(.el-timeline-item__node) {
  background-color: var(--el-color-primary);
}

:deep(.el-timeline-item__node--large) {
  width: 14px;
  height: 14px;
}

:deep(.el-timeline-item__content) {
  margin-bottom: 20px;
}
</style>