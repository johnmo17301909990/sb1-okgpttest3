<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>映射规则管理</span>
        <el-button type="primary" @click="$emit('add')">添加规则</el-button>
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
          <el-button size="small" @click="$emit('edit', scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="$emit('delete', scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
defineProps({
  rules: {
    type: Array,
    required: true
  }
})

defineEmits(['add', 'edit', 'delete'])
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>