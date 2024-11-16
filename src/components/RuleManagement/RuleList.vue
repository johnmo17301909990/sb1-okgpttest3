<template>
  <el-table :data="rules" style="width: 100%">
    <el-table-column prop="id" label="规则ID" width="100" />
    <el-table-column prop="name" label="规则名称" width="150" />
    <el-table-column prop="description" label="规则描述" />
    <el-table-column prop="priority" label="优先级" width="100" />
    <el-table-column label="条件" width="200">
      <template #default="scope">
        <el-button size="small" @click="$emit('show-conditions', scope.row)">
          查看条件 ({{ scope.row.conditions?.length || 0 }})
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template #default="scope">
        <el-button size="small" @click="$emit('edit', scope.row)">编辑</el-button>
        <el-button 
          size="small" 
          type="danger" 
          @click="$emit('delete', scope.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
defineProps({
  rules: {
    type: Array,
    required: true
  }
})

defineEmits(['edit', 'delete', 'show-conditions'])
</script>