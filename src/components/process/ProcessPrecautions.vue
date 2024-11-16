<template>
  <div class="process-precautions">
    <h3>注意事项</h3>
    <el-alert
      v-for="(item, index) in precautions"
      :key="index"
      :title="item"
      type="warning"
      show-icon
      :closable="false"
      class="precaution-item"
    />
  </div>
</template>

<script setup>
defineProps({
  precautions: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.process-precautions {
  margin-bottom: 24px;
}

h3 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.precaution-item {
  margin-bottom: 8px;
}

.precaution-item:last-child {
  margin-bottom: 0;
}
</style>