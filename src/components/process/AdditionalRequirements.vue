<template>
  <div class="additional-requirements">
    <h3>附加要求</h3>
    
    <el-form :model="form" label-width="120px">
      <!-- 优先级选择 -->
      <el-form-item label="优先考虑">
        <el-checkbox-group v-model="form.priorities">
          <el-checkbox label="delivery">交期优先</el-checkbox>
          <el-checkbox label="cost">成本优先</el-checkbox>
          <el-checkbox label="quality">品质优先</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- 温度范围 -->
      <el-form-item label="温度范围">
        <el-slider
          v-model="form.temperatureRange"
          range
          :min="60"
          :max="140"
          :marks="{
            60: '60°C',
            80: '80°C',
            100: '100°C',
            120: '120°C',
            140: '140°C'
          }"
        />
      </el-form-item>

      <!-- 特殊要求 -->
      <el-form-item label="特殊要求">
        <el-input
          v-model="form.customNotes"
          type="textarea"
          :rows="3"
          placeholder="请输入特殊工艺要求或注意事项"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const form = reactive({
  priorities: [],
  temperatureRange: [80, 100],
  customNotes: ''
})

watch(form, (newValue) => {
  emit('update:modelValue', {
    deliveryPriority: newValue.priorities.includes('delivery'),
    costPriority: newValue.priorities.includes('cost'),
    qualityPriority: newValue.priorities.includes('quality'),
    temperatureRange: newValue.temperatureRange,
    customNotes: newValue.customNotes
  })
}, { deep: true })

// 初始化表单
watch(() => props.modelValue, (newValue) => {
  const priorities = []
  if (newValue.deliveryPriority) priorities.push('delivery')
  if (newValue.costPriority) priorities.push('cost')
  if (newValue.qualityPriority) priorities.push('quality')
  
  form.priorities = priorities
  form.temperatureRange = newValue.temperatureRange || [80, 100]
  form.customNotes = newValue.customNotes || ''
}, { immediate: true })
</script>

<style scoped>
.additional-requirements {
  margin-top: 24px;
}

h3 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

:deep(.el-checkbox-group) {
  display: flex;
  gap: 16px;
}

:deep(.el-slider) {
  width: calc(100% - 20px);
  margin: 0 10px;
}
</style>