<template>
  <el-form :model="form" label-width="120px">
    <!-- 应用场景 -->
    <el-form-item label="应用场景" required>
      <el-select v-model="form.application" placeholder="请选择应用场景">
        <el-option
          v-for="item in applicationOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <!-- 烫金面积 -->
    <el-form-item label="烫金面积" required>
      <el-select v-model="form.foilArea" placeholder="请选择烫金面积">
        <el-option
          v-for="item in areaOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <!-- 图案类型 -->
    <el-form-item label="图案类型" required>
      <el-select v-model="form.foilPattern" placeholder="请选择图案类型">
        <el-option
          v-for="item in patternOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <!-- 表面处理 -->
    <el-form-item label="表面处理">
      <el-select v-model="form.surfaceTreatment" placeholder="请选择表面处理">
        <el-option
          v-for="item in surfaceOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <!-- 颜色 -->
    <el-form-item label="颜色">
      <el-select v-model="form.color" placeholder="请选择颜色">
        <el-option
          v-for="item in colorOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <!-- 工艺组合 -->
    <el-form-item label="工艺组合">
      <el-checkbox-group v-model="form.processCombination">
        <el-checkbox-button 
          v-for="item in processCombinationOptions" 
          :key="item.value" 
          :label="item.value"
        >
          {{ item.label }}
        </el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSubmit">查找匹配烫金纸</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  applicationOptions, 
  areaOptions, 
  patternOptions, 
  surfaceOptions,
  colorOptions,
  matchFoils 
} from '../data/foilMappings'
import { processCombinationOptions } from '../data/processCombinationData'

const form = reactive({
  application: '',
  foilArea: '',
  foilPattern: '',
  surfaceTreatment: '',
  color: '',
  processCombination: []
})

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  if (!form.application || !form.foilArea || !form.foilPattern) {
    ElMessage.warning('请填写必要信息')
    return
  }

  emit('submit', { ...form })
}

const handleReset = () => {
  Object.assign(form, {
    application: '',
    foilArea: '',
    foilPattern: '',
    surfaceTreatment: '',
    color: '',
    processCombination: []
  })
}
</script>

<style scoped>
:deep(.el-checkbox-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

:deep(.el-form-item) {
  margin-bottom: 22px;
}
</style>