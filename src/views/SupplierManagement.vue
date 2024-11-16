<template>
  <div class="supplier-management">
    <el-row :gutter="20" class="mb-4">
      <el-col :span="16">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>供应商管理</span>
              <div class="header-actions">
                <el-button type="success" @click="exportSuppliers">导出数据</el-button>
                <el-button type="primary" @click="importSuppliers">导入数据</el-button>
                <el-button type="primary" @click="addSupplier">添加供应商</el-button>
              </div>
            </div>
          </template>

          <el-row :gutter="20" class="filter-row">
            <el-col :span="6">
              <el-select v-model="filterCategory" clearable placeholder="按分类筛选">
                <el-option
                  v-for="item in categories"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-select v-model="filterApplication" clearable placeholder="按应用场景筛选">
                <el-option
                  v-for="item in applications"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-select v-model="filterSize" clearable placeholder="按尺寸筛选">
                <el-option
                  v-for="item in sizes"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-input
                v-model="searchKeyword"
                placeholder="搜索供应商编号或名称"
                clearable
              />
            </el-col>
          </el-row>

          <el-table 
            :data="filteredSuppliers" 
            style="width: 100%"
            v-loading="loading"
          >
            <el-table-column type="expand">
              <template #default="props">
                <el-form label-position="left" inline class="supplier-detail">
                  <el-form-item label="质量评分">
                    <el-rate
                      v-model="props.row.qualityScore"
                      disabled
                      show-score
                      text-color="#ff9900"
                    />
                  </el-form-item>
                  <el-form-item label="合作时长">
                    {{ formatDuration(props.row.cooperationTime) }}
                  </el-form-item>
                  <el-form-item label="最近订单">
                    {{ formatDate(props.row.lastOrderDate) }}
                  </el-form-item>
                  <el-form-item label="订单完成率">
                    <el-progress 
                      :percentage="props.row.orderCompletionRate"
                      :status="getProgressStatus(props.row.orderCompletionRate)"
                    />
                  </el-form-item>
                  <el-form-item label="产品认证">
                    <el-tag 
                      v-for="cert in props.row.certifications"
                      :key="cert"
                      class="mx-1"
                    >
                      {{ cert }}
                    </el-tag>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="companyCode" label="公司编号" width="120" sortable />
            <el-table-column prop="supplierCode" label="供应商编号" width="120" sortable />
            <el-table-column prop="series" label="烫金纸系列" width="150" />
            <el-table-column prop="category" label="分类" width="100">
              <template #default="scope">
                <el-tag>{{ scope.row.category }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="mainApplication" label="主要应用" width="120" />
            <el-table-column prop="suitableSize" label="适用尺寸" width="120" />
            <el-table-column label="UV兼容" width="80">
              <template #default="scope">
                <el-tag :type="scope.row.uvCompatible ? 'success' : 'danger'">
                  {{ scope.row.uvCompatible ? '是' : '否' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="供应状态" width="100">
              <template #default="scope">
                <el-tag :type="getSupplyStatusType(scope.row.supplyStatus)">
                  {{ scope.row.supplyStatus }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="scope">
                <el-button size="small" @click="viewSupplierDetails(scope.row)">详情</el-button>
                <el-button size="small" type="primary" @click="editSupplier(scope.row)">编辑</el-button>
                <el-button 
                  size="small" 
                  type="danger" 
                  @click="deleteSupplier(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>供应商统计</span>
            </div>
          </template>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-statistic title="总供应商数" :value="suppliers.length" />
            </el-col>
            <el-col :span="12">
              <el-statistic 
                title="活跃供应商" 
                :value="getActiveSupplierCount()"
                value-style="color: #3f8600"
              />
            </el-col>
          </el-row>

          <el-divider>分类统计</el-divider>
          <div class="chart-container">
            <el-progress
              v-for="stat in categoryStats"
              :key="stat.category"
              :percentage="stat.percentage"
              :color="stat.color"
              :format="() => `${stat.category}: ${stat.count}`"
              class="category-progress"
            />
          </div>

          <el-divider>质量分布</el-divider>
          <div class="chart-container">
            <div class="quality-distribution">
              <div 
                v-for="(count, score) in qualityDistribution" 
                :key="score"
                class="quality-bar"
              >
                <div class="score-label">{{ score }}星</div>
                <el-progress
                  :percentage="(count / suppliers.length) * 100"
                  :format="() => count"
                  :color="getQualityColor(Number(score))"
                />
              </div>
            </div>
          </div>
        </el-card>

        <el-card class="box-card mt-4">
          <template #header>
            <div class="card-header">
              <span>供应预警</span>
            </div>
          </template>

          <el-timeline>
            <el-timeline-item
              v-for="alert in supplyAlerts"
              :key="alert.id"
              :type="alert.type"
              :timestamp="formatDate(alert.timestamp)"
              :color="getAlertColor(alert.severity)"
            >
              {{ alert.message }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>

    <!-- 供应商详情对话框 -->
    <el-dialog
      v-model="detailsVisible"
      title="供应商详情"
      width="70%"
    >
      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本信息" name="basic">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="公司编号">{{ currentSupplier?.companyCode }}</el-descriptions-item>
            <el-descriptions-item label="供应商编号">{{ currentSupplier?.supplierCode }}</el-descriptions-item>
            <el-descriptions-item label="烫金纸系列">{{ currentSupplier?.series }}</el-descriptions-item>
            <el-descriptions-item label="分类">{{ currentSupplier?.category }}</el-descriptions-item>
            <el-descriptions-item label="主要应用">{{ currentSupplier?.mainApplication }}</el-descriptions-item>
            <el-descriptions-item label="适用尺寸">{{ currentSupplier?.suitableSize }}</el-descriptions-item>
            <el-descriptions-item label="用途说明" :span="2">{{ currentSupplier?.usage }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>

        <el-tab-pane label="质量记录" name="quality">
          <el-table :data="currentSupplier?.qualityRecords || []" style="width: 100%">
            <el-table-column prop="date" label="检测日期" width="180" />
            <el-table-column prop="batchNo" label="批次号" width="120" />
            <el-table-column prop="testResult" label="测试结果">
              <template #default="scope">
                <el-tag :type="scope.row.testResult === 'pass' ? 'success' : 'danger'">
                  {{ scope.row.testResult === 'pass' ? '通过' : '不通过' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="issues" label="问题描述" show-overflow-tooltip />
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="供货记录" name="supply">
          <el-table :data="currentSupplier?.supplyRecords || []" style="width: 100%">
            <el-table-column prop="date" label="供货日期" width="180" />
            <el-table-column prop="orderNo" label="订单编号" width="120" />
            <el-table-column prop="quantity" label="数量" width="100" />
            <el-table-column prop="onTimeDelivery" label="准时交付">
              <template #default="scope">
                <el-tag :type="scope.row.onTimeDelivery ? 'success' : 'warning'">
                  {{ scope.row.onTimeDelivery ? '准时' : '延迟' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="remarks" label="备注" show-overflow-tooltip />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 供应商编辑对话框 -->
    <el-dialog 
      v-model="dialogVisible" 
      :title="dialogTitle"
      width="60%"
    >
      <el-form :model="currentSupplier" label-width="120px">
        <el-form-item label="公司编号" required>
          <el-input v-model="currentSupplier.companyCode" />
        </el-form-item>
        <el-form-item label="供应商编号" required>
          <el-input v-model="currentSupplier.supplierCode" />
        </el-form-item>
        <el-form-item label="烫金纸系列" required>
          <el-select v-model="currentSupplier.series" placeholder="选择系列">
            <el-option
              v-for="item in series"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类" required>
          <el-select v-model="currentSupplier.category" placeholder="选择分类">
            <el-option
              v-for="item in categories"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用途说明">
          <el-input 
            v-model="currentSupplier.usage" 
            type="textarea" 
            :rows="3" 
          />
        </el-form-item>
        <el-form-item label="主要应用" required>
          <el-select v-model="currentSupplier.mainApplication" placeholder="选择应用">
            <el-option
              v-for="item in applications"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="适用尺寸" required>
          <el-select v-model="currentSupplier.suitableSize" placeholder="选择尺寸">
            <el-option
              v-for="item in sizes"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="UV兼容">
          <el-switch v-model="currentSupplier.uvCompatible" />
        </el-form-item>
        <el-form-item label="供应状态">
          <el-select v-model="currentSupplier.supplyStatus" placeholder="选择状态">
            <el-option label="正常供应" value="normal" />
            <el-option label="限量供应" value="limited" />
            <el-option label="暂停供应" value="suspended" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品认证">
          <el-select
            v-model="currentSupplier.certifications"
            multiple
            placeholder="选择认证"
          >
            <el-option
              v-for="cert in certificationOptions"
              :key="cert"
              :label="cert"
              :value="cert"
            />
          </el-select>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveSupplier">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const categories = [
  '普通金纸',
  '普通银纸',
  '普通耐磨',
  '特殊效果'
]

const applications = [
  '贺卡',
  '精装书',
  '包装',
  '综合印刷',
  '精平装'
]

const sizes = [
  '小面积',
  '中面积',
  '大面积'
]

const series = [
  'SH的标准金纸',
  'G1系列',
  'SY1-系列',
  'ST系列',
  'A23系列',
  'SY6-系列',
  'L817系列',
  'GN系列',
  'SY+系列'
]

const certificationOptions = [
  'ISO9001',
  'ISO14001',
  'FSC认证',
  'SGS认证',
  'RoHS认证'
]

const loading = ref(false)
const dialogVisible = ref(false)
const detailsVisible = ref(false)
const dialogTitle = ref('')
const activeTab = ref('basic')
const filterCategory = ref('')
const filterApplication = ref('')
const filterSize = ref('')
const searchKeyword = ref('')

const suppliers = ref([
  {
    companyCode: 'HS#1G',
    supplierCode: 'SH111',
    series: 'SH的标准金纸',
    category: '普通金纸',
    usage: '金色烫金纸，适用于高端印刷项目',
    mainApplication: '贺卡',
    suitableSize: '小面积',
    uvCompatible: true,
    supplyStatus: 'normal',
    qualityScore: 4.5,
    cooperationTime: '2020-01-01',
    lastOrderDate: '2023-12-01',
    orderCompletionRate: 98,
    certifications: ['ISO9001', 'FSC认证'],
    qualityRecords: [
      {
        date: '2023-12-01',
        batchNo: 'B001',
        testResult: 'pass',
        issues: ''
      }
    ],
    supplyRecords: [
      {
        date: '2023-12-01',
        orderNo: 'PO001',
        quantity: 1000,
        onTimeDelivery: true,
        remarks: ''
      }
    ]
  }
])

const currentSupplier = ref({
  companyCode: '',
  supplierCode: '',
  series: '',
  category: '',
  usage: '',
  mainApplication: '',
  suitableSize: '',
  uvCompatible: false,
  supplyStatus: 'normal',
  certifications: []
})

const filteredSuppliers = computed(() => {
  let result = suppliers.value

  if (filterCategory.value) {
    result = result.filter(s => s.category === filterCategory.value)
  }

  if (filterApplication.value) {
    result = result.filter(s => s.mainApplication === filterApplication.value)
  }

  if (filterSize.value) {
    result = result.filter(s => s.suitableSize === filterSize.value)
  }

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(s =>
      s.companyCode.toLowerCase().includes(keyword) ||
      s.supplierCode.toLowerCase().includes(keyword)
    )
  }

  return result
})

const categoryStats = computed(() => {
  const stats = categories.map(category => {
    const count = suppliers.value.filter(s => s.category === category).length
    return {
      category,
      count,
      percentage: (count / suppliers.value.length) * 100,
      color: getRandomColor()
    }
  })
  return stats.sort((a, b) => b.count - a.count)
})

const qualityDistribution = computed(() => {
  const distribution = {}
  suppliers.value.forEach(supplier => {
    const score = Math.floor(supplier.qualityScore)
    distribution[score] = (distribution[score] || 0) + 1
  })
  return distribution
})

const supplyAlerts = ref([
  {
    id: 1,
    type: 'warning',
    severity: 'high',
    message: '供应商 SH111 库存低于警戒线',
    timestamp: new Date()
  }
])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const formatDuration = (startDate) => {
  const start = new Date(startDate)
  const now = new Date()
  const years = now.getFullYear() - start.getFullYear()
  return `${years}年`
}

const getProgressStatus = (rate) => {
  if (rate >= 90) return 'success'
  if (rate >= 70) return 'warning'
  return 'exception'
}

const getSupplyStatusType = (status) => {
  const types = {
    normal: 'success',
    limited: 'warning',
    suspended: 'danger'
  }
  return types[status] || 'info'
}

const getQualityColor = (score) => {
  const colors = {
    5: '#67c23a',
    4: '#95d475',
    3: '#e6a23c',
    2: '#f56c6c',
    1: '#909399'
  }
  return colors[score] || '#909399'
}

const getAlertColor = (severity) => {
  const colors = {
    high: '#f56c6c',
    medium: '#e6a23c',
    low: '#909399'
  }
  return colors[severity] || '#909399'
}

const getRandomColor = () => {
  const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']
  return colors[Math.floor(Math.random() * colors.length)]
}

const getActiveSupplierCount = () => {
  return suppliers.value.filter(s => s.supplyStatus === 'normal').length
}

const addSupplier = () => {
  dialogTitle.value = '添加供应商'
  currentSupplier.value = {
    companyCode: '',
    supplierCode: '',
    series: '',
    category: '',
    usage: '',
    mainApplication: '',
    suitableSize: '',
    uvCompatible: false,
    supplyStatus: 'normal',
    certifications: []
  }
  dialogVisible.value = true
}

const editSupplier = (supplier) => {
  dialogTitle.value = '编辑供应商'
  currentSupplier.value = { ...supplier }
  dialogVisible.value = true
}

const viewSupplierDetails = (supplier) => {
  currentSupplier.value = { ...supplier }
  detailsVisible.value = true
}

const deleteSupplier = (supplier) => {
  ElMessageBox.confirm(
    '确定要删除这个供应商吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    const index = suppliers.value.findIndex(s => 
      s.companyCode === supplier.companyCode && 
      s.supplierCode === supplier.supplierCode
    )
    if (index > -1) {
      suppliers.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

const saveSupplier = () => {
  if (!currentSupplier.value.companyCode || !currentSupplier.value.supplierCode) {
    ElMessage.warning('请填写完整的供应商信息')
    return
  }
  
  const index = suppliers.value.findIndex(s => 
    s.companyCode === currentSupplier.value.companyCode && 
    s.supplierCode === currentSupplier.value.supplierCode
  )
  
  if (index > -1) {
    suppliers.value[index] = { ...currentSupplier.value }
  } else {
    suppliers.value.push({ ...currentSupplier.value })
  }
  
  dialogVisible.value = false
  ElMessage.success('保存成功')
}

const exportSuppliers = () => {
  const data = JSON.stringify(suppliers.value, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `suppliers-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
  ElMessage.success('供应商数据导出成功')
}

const importSuppliers = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      suppliers.value = data
      ElMessage.success('供应商数据导入成功')
    } catch (error) {
      ElMessage.error('供应商数据导入失败：无效的文件格式')
    }
  }
  input.click()
}
</script>

<style scoped>
.supplier-management {
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
}

.filter-row {
  margin-bottom: 20px;
}

.supplier-detail {
  padding: 20px;
}

.chart-container {
  margin: 20px 0;
}

.category-progress {
  margin-bottom: 12px;
}

.quality-distribution {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quality-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.score-label {
  width: 40px;
}

.mb-4 {
  margin-bottom: 16px;
}

.mt-4 {
  margin-top: 16px;
}

.mx-1 {
  margin: 0 4px;
}

:deep(.el-table) {
  margin-bottom: 20px;
}

:deep(.el-descriptions) {
  margin: 16px 0;
}

:deep(.el-timeline) {
  margin: 16px 0;
}

:deep(.el-progress) {
  margin-bottom: 8px;
}

:deep(.el-statistic__content) {
  font-size: 24px;
}

:deep(.el-statistic__title) {
  font-size: 16px;
  color: #606266;
}
</style>