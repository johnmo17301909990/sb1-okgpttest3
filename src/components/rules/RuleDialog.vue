<template>
  <el-dialog 
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    :title="title"
    width="60%"
  >
    <el-form :model="ruleForm" label-width="120px">
      <el-form-item label="规则名称" required>
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="规则描述">
        <el-input 
          v-model="ruleForm.description" 
          type="textarea" 
          :rows="3" 
        />
      </el-form-item>
      <el-form-item label="优先级">
        <el-input-number v-model="ruleForm.priority" :min="1" />
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="ruleForm.enabled" />
      </el-form-item>
      
      <el-divider>匹配条件</el-divider>
      
      <div v-for="(condition, index) in ruleForm.conditions" :key="index">
        <el-row :gutter="20" style="margin-bottom: 10px">
          <el-col :span="7">
            <el-select v-model="condition.field" placeholder="选择字段">
              <el-option
                v-for="field in fields"
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
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  rule: {
    type: Object,
    default: () => ({
      id: Date.now(),
      name: '',
      description: '',
      priority: 1,
      enabled: true,
      conditions: []
    })
  }
})

const emit = defineEmits(['update:visible', 'save'])

const fields = [
  { label: '烫金面积', value: 'foilArea' },
  { label: '图案类型', value: 'foilPattern' },
  { label: '表面处理', value: 'surfaceTreatment' },
  { label: '工艺顺序', value: 'processOrder' },
  { label: '颜色', value: 'color' },
  { label: '应用场景', value: 'application' }
]

const operators = [
  { label: '等于', value: 'equals' },
  { label: '包含', value: 'contains' },
  { label: '大于', value: 'greater' },
  { label: '小于', value: 'less' }
]

const ruleForm = reactive({
  id: 0,
  name: '',
  description: '',
  priority: 1,
  enabled: true,
  conditions: []
})

watch(() => props.rule, (newRule) => {
  Object.assign(ruleForm, JSON.parse(JSON.stringify(newRule)))
}, { immediate: true })

const addCondition = () => {
  ruleForm.conditions.push({
    field: '',
    operator: '',
    value: ''
  })
}

const removeCondition = (index) => {
  ruleForm.conditions.splice(index, 1)
}

const handleCancel = () => {
  emit('update:visible', false)
}

const handleSave = () => {
  emit('save', JSON.parse(JSON.stringify(ruleForm)))
  emit('update:visible', false)
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>