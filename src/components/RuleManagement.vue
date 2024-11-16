<template>
  <div class="rule-management">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>映射规则管理</span>
          <el-button type="primary" @click="addRule">添加规则</el-button>
        </div>
      </template>

      <el-table :data="rules" style="width: 100%">
        <el-table-column prop="id" label="规则ID" width="80" />
        <el-table-column prop="name" label="规则名称" width="150" />
        <el-table-column prop="description" label="规则描述" />
        <el-table-column prop="priority" label="优先级" width="80" />
        <el-table-column prop="enabled" label="状态" width="80">
          <template #default="scope">
            <el-tag :type="scope.row.enabled ? 'success' : 'info'">
              {{ scope.row.enabled ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="editRule(scope.row)">编辑</el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="deleteRule(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 规则编辑对话框 -->
    <el-dialog 
      v-model="dialogVisible" 
      :title="dialogTitle"
      width="60%"
    >
      <el-form :model="currentRule" label-width="120px">
        <el-form-item label="规则名称" required>
          <el-input v-model="currentRule.name" />
        </el-form-item>
        <el-form-item label="规则描述">
          <el-input 
            v-model="currentRule.description" 
            type="textarea" 
            :rows="3" 
          />
        </el-form-item>
        <el-form-item label="优先级">
          <el-input-number v-model="currentRule.priority" :min="1" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="currentRule.enabled" />
        </el-form-item>
        
        <el-divider>匹配条件</el-divider>
        
        <div v-for="(condition, index) in currentRule.conditions" :key="index">
          <el-row :gutter="20" style="margin-bottom: 10px">
            <el-col :span="7">
              <el-select v-model="condition.field" placeholder="选择字段">
                <el-option
                  v-for="field in availableFields"
                  :key="field.value"
                  :label="field.label"
                  :value="field.value"
                />
              </el-select>
            </el-col>
            <el-col :span="7">
              <el-select v-model="condition.operator" placeholder="选择操作符">
                <el-option
                  v-for="op in operators"
                  :key="op.value"
                  :label="op.label"
                  :value="op.value"
                />
              </el-select>
            </el-col>
            <el-col :span="7">
              <el-input v-model="condition.value" placeholder="输入值" />
            </el-col>
            <el-col :span="3">
              <el-button 
                type="danger" 
                circle
                @click="removeCondition(index)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-col>
          </el-row>
        </div>
        
        <el-button 
          type="primary" 
          plain
          @click="addCondition"
        >
          <el-icon><Plus /></el-icon>
          添加条件
        </el-button>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveRule">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'

// 可用字段
const availableFields = [
  { label: '烫金面积', value: 'foilArea' },
  { label: '图案类型', value: 'foilPattern' },
  { label: '表面处理', value: 'surfaceTreatment' },
  { label: '工艺顺序', value: 'processOrder' },
  { label: '颜色', value: 'color' },
  { label: '应用场景', value: 'application' },
]

// 操作符
const operators = [
  { label: '等于', value: 'equals' },
  { label: '包含', value: 'contains' },
  { label: '大于', value: 'greater' },
  { label: '小于', value: 'less' },
]

// 规则列表
const rules = ref([
  {
    id: 1,
    name: '贺卡渐变烫金规则',
    description: '适用于贺卡的渐变网点烫金工艺',
    priority: 1,
    enabled: true,
    conditions: [
      { field: 'foilPattern', operator: 'equals', value: 'halftone' },
      { field: 'application', operator: 'equals', value: 'greetingCard' },
    ]
  },
  {
    id: 2,
    name: '精装书细线条规则',
    description: '适用于精装书的幼细线条烫金工艺',
    priority: 2,
    enabled: true,
    conditions: [
      { field: 'foilPattern', operator: 'equals', value: 'fine' },
      { field: 'application', operator: 'equals', value: 'hardcoverBook' },
    ]
  }
])

const dialogVisible = ref(false)
const dialogTitle = ref('')
const currentRule = reactive({
  id: 0,
  name: '',
  description: '',
  priority: 1,
  enabled: true,
  conditions: []
})

// 添加规则
const addRule = () => {
  dialogTitle.value = '添加规则'
  Object.assign(currentRule, {
    id: Date.now(),
    name: '',
    description: '',
    priority: rules.value.length + 1,
    enabled: true,
    conditions: []
  })
  dialogVisible.value = true
}

// 编辑规则
const editRule = (rule) => {
  dialogTitle.value = '编辑规则'
  Object.assign(currentRule, JSON.parse(JSON.stringify(rule)))
  dialogVisible.value = true
}

// 删除规则
const deleteRule = (rule) => {
  ElMessageBox.confirm(
    '确定要删除这条规则吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    const index = rules.value.findIndex(r => r.id === rule.id)
    if (index > -1) {
      rules.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

// 添加条件
const addCondition = () => {
  currentRule.conditions.push({
    field: '',
    operator: '',
    value: ''
  })
}

// 删除条件
const removeCondition = (index) => {
  currentRule.conditions.splice(index, 1)
}

// 保存规则
const saveRule = () => {
  if (!currentRule.name) {
    ElMessage.warning('请输入规则名称')
    return
  }

  if (currentRule.conditions.length === 0) {
    ElMessage.warning('请至少添加一个条件')
    return
  }

  if (currentRule.conditions.some(c => !c.field || !c.operator || !c.value)) {
    ElMessage.warning('请完整填写所有条件')
    return
  }
  
  const ruleIndex = rules.value.findIndex(r => r.id === currentRule.id)
  if (ruleIndex > -1) {
    rules.value[ruleIndex] = JSON.parse(JSON.stringify(currentRule))
  } else {
    rules.value.push(JSON.parse(JSON.stringify(currentRule)))
  }
  
  dialogVisible.value = false
  ElMessage.success('保存成功')
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
.el-divider {
  margin: 20px 0;
}
</style>