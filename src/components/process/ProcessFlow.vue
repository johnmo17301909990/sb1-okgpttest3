<template>
  <div class="process-flow">
    <h3>工艺流程</h3>
    <el-steps :active="steps.length" finish-status="success">
      <el-step 
        v-for="(step, index) in steps" 
        :key="index"
        :title="step.name"
        :description="step.description"
      />
    </el-steps>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.process-flow {
  margin-bottom: 24px;
}

h3 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

:deep(.el-step__title) {
  font-size: 14px;
}

:deep(.el-step__description) {
  font-size: 12px;
}
</style>