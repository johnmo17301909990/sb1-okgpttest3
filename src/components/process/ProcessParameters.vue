<template>
  <div class="process-parameters">
    <h3>关键工艺参数</h3>
    <el-descriptions :column="2" border>
      <el-descriptions-item 
        v-for="(param, key) in parameters" 
        :key="key"
        :label="param.label"
      >
        {{ param.value }} {{ param.unit }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
defineProps({
  parameters: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.process-parameters {
  margin-bottom: 24px;
}

h3 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

:deep(.el-descriptions__label) {
  width: 120px;
}
</style>