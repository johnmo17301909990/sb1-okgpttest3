<template>
  <div class="rule-management">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>映射规则管理</span>
          <div class="header-actions">
            <el-button type="success" @click="exportRules">导出规则</el-button>
            <el-button type="primary" @click="importRules">导入规则</el-button>
            <el-button type="primary" @click="addRule">添加规则</el-button>
          </div>
        </div>
      </template>

      <el-row :gutter="20" class="filter-row">
        <el-col :span="6">
          <el-select v-model="filterCategory" clearable placeholder="按类别筛选">
            <el-option
              v-for="category in categories"
              :key="category"
              :label="category"
              :value="category"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="filterStatus" clearable placeholder="按状态筛选">
            <el-option label="启用" value="enabled" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索规则名称或描述"
            clearable
          />
        </el-col>
        <el-col :span="6" class="text-right">
          <el-button type="primary" @click="batchEnableRules" :disabled="!selectedRules.length">
            批量启用
          </el-button>
          <el-button type="danger" @click="batchDisableRules" :disabled="!selectedRules.length">
            批量禁用
          </el-button>
        </el-col>
      </el-row>

      <div v-for="categoryGroup in filteredRulesByCategory" :key="categoryGroup.category">
        <div class="category-header">
          <h3 class="category-title">{{ categoryGroup.category }}</h3>
          <el-tag>{{ categoryGroup.rules.length }} 条规则</el-tag>
        </div>
        
        <el-table 
          :data="categoryGroup.rules" 
          style="width: 100%; margin-bottom: 20px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="规则名称" width="180" />
          <el-table-column prop="description" label="规则描述" show-overflow-tooltip />
          <el-table-column prop="priority" label="优先级" width="80" align="center" sortable />
          <el-table-column prop="enabled" label="状态" width="100" align="center">
            <template #default="scope">
              <el-switch
                v-model="scope.row.enabled"
                @change="(val) => toggleRuleStatus(scope.row, val)"
                :active-text="scope.row.enabled ? '启用' : '禁用'"
              />
            </template>
          </el-table-column>
          <el-table-column prop="lastModified" label="最后修改" width="180">
            <template #default="scope">
              {{ formatDate(scope.row.lastModified) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250" fixed="right">
            <template #default="scope">
              <el-button size="small" @click="viewRuleDetails(scope.row)">详情</el-button>
              <el-button size="small" type="primary" @click="editRule(scope.row)">编辑</el-button>
              <el-button 
                size="small" 
                type="danger" 
                @click="deleteRule(scope.row)"
                :disabled="scope.row.isProtected"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 规则详情对话框 -->
    <el-dialog
      v-model="detailsVisible"
      title="规则详情"
      width="60%"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="规则名称">{{ currentRule?.name }}</el-descriptions-item>
        <el-descriptions-item label="规则类别">{{ currentRule?.category }}</el-descriptions-item>
        <el-descriptions-item label="优先级">{{ currentRule?.priority }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="currentRule?.enabled ? 'success' : 'info'">
            {{ currentRule?.enabled ? '启用' : '禁用' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ formatDate(currentRule?.createdAt) }}
        </el-descriptions-item>
        <el-descriptions-item label="最后修改">
          {{ formatDate(currentRule?.lastModified) }}
        </el-descriptions-item>
        <el-descriptions-item label="规则描述" :span="2">
          {{ currentRule?.description }}
        </el-descriptions-item>
      </el-descriptions>

      <el-divider>匹配条件</el-divider>
      
      <el-table :data="currentRule?.conditions || []" border style="width: 100%">
        <el-table-column prop="field" label="字段" width="180">
          <template #default="scope">
            {{ getFieldLabel(scope.row.field) }}
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="操作符" width="120">
          <template #default="scope">
            {{ getOperatorLabel(scope.row.operator) }}
          </template>
        </el-table-column>
        <el-table-column prop="value" label="值" />
      </el-table>

      <el-divider>应用效果</el-divider>

      <el-descriptions :column="1" border>
        <el-descriptions-item label="推荐烫金纸系列">
          {{ currentRule?.recommendedSeries?.join(', ') }}
        </el-descriptions-item>
        <el-descriptions-item label="适用工艺">
          {{ currentRule?.applicableProcesses?.join(', ') }}
        </el-descriptions-item>
        <el-descriptions-item label="注意事项">
          {{ currentRule?.precautions || '无' }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 规则编辑对话框 -->
    <rule-dialog
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :rule="currentRule"
      @save="saveRule"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import RuleDialog from '../components/rules/RuleDialog.vue'
import { useRules } from '../composables/useRules'

const {
  rules,
  addRule: addRuleToList,
  updateRule,
  removeRule,
  getRulesByCategory,
  toggleRule,
  exportRulesToJson,
  importRulesFromJson
} = useRules()

const dialogVisible = ref(false)
const detailsVisible = ref(false)
const dialogTitle = ref('')
const currentRule = ref(null)
const filterCategory = ref('')
const filterStatus = ref('')
const searchKeyword = ref('')
const selectedRules = ref([])

const categories = [
  '烫金面积',
  '烫金图案类型',
  '颜色',
  '应用场景',
  '表面处理',
  '工艺顺序',
  'UV需求'
]

const filteredRulesByCategory = computed(() => {
  let filteredRules = rules.value

  // 应用过滤条件
  if (filterCategory.value) {
    filteredRules = filteredRules.filter(rule => rule.category === filterCategory.value)
  }

  if (filterStatus.value) {
    filteredRules = filteredRules.filter(rule => 
      filterStatus.value === 'enabled' ? rule.enabled : !rule.enabled
    )
  }

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filteredRules = filteredRules.filter(rule =>
      rule.name.toLowerCase().includes(keyword) ||
      rule.description.toLowerCase().includes(keyword)
    )
  }

  // 按类别分组
  return categories.map(category => ({
    category,
    rules: filteredRules.filter(rule => rule.category === category)
  })).filter(group => group.rules.length > 0)
})

const handleSelectionChange = (selection) => {
  selectedRules.value = selection
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString()
}

const getFieldLabel = (field) => {
  const fieldMap = {
    foilArea: '烫金面积',
    foilPattern: '图案类型',
    surfaceTreatment: '表面处理',
    processOrder: '工艺顺序',
    color: '颜色',
    application: '应用场景'
  }
  return fieldMap[field] || field
}

const getOperatorLabel = (operator) => {
  const operatorMap = {
    equals: '等于',
    contains: '包含',
    greater: '大于',
    less: '小于'
  }
  return operatorMap[operator] || operator
}

const addRule = () => {
  dialogTitle.value = '添加规则'
  currentRule.value = {
    id: Date.now(),
    name: '',
    description: '',
    priority: rules.value.length + 1,
    enabled: true,
    category: '',
    conditions: [],
    createdAt: new Date(),
    lastModified: new Date(),
    isProtected: false,
    recommendedSeries: [],
    applicableProcesses: [],
    precautions: ''
  }
  dialogVisible.value = true
}

const editRule = (rule) => {
  dialogTitle.value = '编辑规则'
  currentRule.value = { ...rule }
  dialogVisible.value = true
}

const viewRuleDetails = (rule) => {
  currentRule.value = { ...rule }
  detailsVisible.value = true
}

const deleteRule = (rule) => {
  if (rule.isProtected) {
    ElMessage.warning('该规则为系统保护规则，不可删除')
    return
  }
  
  removeRule(rule)
}

const saveRule = (rule) => {
  rule.lastModified = new Date()
  
  if (rules.value.find(r => r.id === rule.id)) {
    updateRule(rule)
  } else {
    addRuleToList(rule)
  }
  dialogVisible.value = false
}

const toggleRuleStatus = (rule, status) => {
  toggleRule(rule.id, status)
  ElMessage.success(`规则已${status ? '启用' : '禁用'}`)
}

const batchEnableRules = () => {
  selectedRules.value.forEach(rule => {
    if (!rule.enabled) {
      toggleRule(rule.id, true)
    }
  })
  ElMessage.success('已批量启用选中规则')
}

const batchDisableRules = () => {
  selectedRules.value.forEach(rule => {
    if (rule.enabled) {
      toggleRule(rule.id, false)
    }
  })
  ElMessage.success('已批量禁用选中规则')
}

const exportRules = () => {
  const data = exportRulesToJson()
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `foil-rules-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
  ElMessage.success('规则导出成功')
}

const importRules = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      const text = await file.text()
      importRulesFromJson(text)
      ElMessage.success('规则导入成功')
    } catch (error) {
      ElMessage.error('规则导入失败：无效的文件格式')
    }
  }
  input.click()
}
</script>

<style scoped>
.rule-management {
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

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0 12px;
}

.category-title {
  margin: 0;
  padding-left: 10px;
  border-left: 4px solid #409EFF;
  font-size: 16px;
}

.text-right {
  text-align: right;
}

:deep(.el-table) {
  margin-bottom: 24px;
}

:deep(.el-descriptions) {
  margin: 16px 0;
}

.el-divider {
  margin: 24px 0;
}
</style>