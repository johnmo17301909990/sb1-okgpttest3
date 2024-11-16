<template>
  <el-form :model="modelValue" label-width="120px">
    <el-form-item label="规则名称">
      <el-input v-model="modelValue.name" />
    </el-form-item>
    <el-form-item label="规则描述">
      <el-input 
        v-model="modelValue.description" 
        type="textarea" 
        :rows="3" 
      />
    </el-form-item>
    <el-form-item label="优先级">
      <el-input-number v-model="modelValue.priority" :min="1" />
    </el-form-item>
    
    <el-divider>匹配条件</el-divider>
    
    <div v-for="(condition, index) in modelValue.conditions" :key="index">
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="6">
          <el-select v-model="condition.field" placeholder="选择字段">
            <el-option
              v-for="field in fields"
              :key="field.value"
              :label="field.label"
              :value="field.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="condition.operator" placeholder="选择操作符">
            <el-option
              v-for="op in operators"
              :key="op.value"
              :label="op.label"
              :value="op.value"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="condition.value" placeholder="输入值" />
        </el-col>
        <el-col :span="4">
          <el-button 
            type="danger" 
            icon="Delete"
            @click="removeCondition(index)"
          >删除</el-button>
        </el-col>
      </el-row>
    </div>
    
    <el-button 
      type="primary" 
      icon="Plus"
      @click="addCondition"
    >添加条件</el-button>
  </el-form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  fields: {
    type: Array,
    required: true
  },
  operators: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const addCondition = () => {
  const newRule = {
    ...props.modelValue,
    conditions: [
      ...props.modelValue.conditions,
      { field: '', operator: '', value: '' }
    ]
  }
  emit('update:modelValue', newRule)
}

const removeCondition = (index) => {
  const newRule = {
    ...props.modelValue,
    conditions: props.modelValue.conditions.filter((_, i) => i !== index)
  }
  emit('update:modelValue', newRule)
}
</script>