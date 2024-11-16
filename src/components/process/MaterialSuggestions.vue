<template>
  <div class="material-suggestions">
    <h3>材料建议</h3>
    <el-descriptions :column="1" border>
      <el-descriptions-item 
        v-for="(suggestion, key) in suggestions" 
        :key="key"
        :label="suggestion.label"
      >
        {{ suggestion.value }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
defineProps({
  suggestions: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.material-suggestions {
  margin-bottom: 24px;
}

h3 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}
</style>