<template>
  <div class="process-combination">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>工艺组合匹配</span>
        </div>
      </template>

      <el-form :model="form" label-width="120px" :inline="false">
        <!-- 应用场景 -->
        <el-form-item label="应用场景" required>
          <el-select v-model="form.application" placeholder="请选择应用场景" style="width: 100%">
            <el-option
              v-for="item in applicationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!-- 表面材质 -->
        <el-form-item label="表面材质" required>
          <el-select v-model="form.surfaceMaterial" placeholder="请选择表面材质" style="width: 100%">
            <el-option
              v-for="item in surfaceMaterialOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!-- 图案类型 -->
        <el-form-item label="图案类型" required>
          <el-select v-model="form.patternType" placeholder="请选择图案类型" style="width: 100%">
            <el-option
              v-for="item in patternTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!-- 面积大小 -->
        <el-form-item label="面积大小" required>
          <el-select v-model="form.areaSize" placeholder="请选择面积大小" style="width: 100%">
            <el-option
              v-for="item in areaSizeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!-- 颜色 -->
        <el-form-item label="颜色">
          <el-select v-model="form.color" placeholder="请选择颜色" style="width: 100%">
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
          <div class="checkbox-group-wrapper">
            <el-checkbox-group v-model="form.processCombination">
              <el-checkbox-button label="过胶">过胶</el-checkbox-button>
              <el-checkbox-button label="UV">UV</el-checkbox-button>
              <el-checkbox-button label="压纹">压纹</el-checkbox-button>
              <el-checkbox-button label="丝印LED UV洒闪粉">丝印LED UV洒闪粉</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交需求</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const applicationOptions = [
  { label: '请选择应用场景', value: '' },
  { label: '贺卡', value: 'card' },
  { label: '精装书', value: 'book' },
  { label: '包装', value: 'package' },
  { label: '综合印刷', value: 'general' }
]

const surfaceMaterialOptions = [
  { label: '请选择表面材质', value: '' },
  { label: '普通纸张', value: 'normal' },
  { label: '布面纸', value: 'cloth' },
  { label: '荧光油墨面', value: 'fluorescent' },
  { label: '特殊涂布纸', value: 'special' }
]

const patternTypeOptions = [
  { label: '请选择图案类型', value: '' },
  { label: '幼细线条', value: 'fine' },
  { label: '渐变网点', value: 'gradient' },
  { label: '普通图案', value: 'normal' },
  { label: '立体纹理', value: 'textured' }
]

const areaSizeOptions = [
  { label: '请选择面积大小', value: '' },
  { label: '小面积 (<50mm x 50mm)', value: 'small' },
  { label: '中面积 (50-100mm x 50-100mm)', value: 'medium' },
  { label: '大面积 (≥100mm x 100mm)', value: 'large' }
]

const colorOptions = [
  { label: '请选择颜色', value: '' },
  { label: '金色', value: 'gold' },
  { label: '银色', value: 'silver' },
  { label: '哑光金', value: 'mattGold' },
  { label: '哑光银', value: 'mattSilver' }
]

const form = reactive({
  application: '',
  surfaceMaterial: '',
  patternType: '',
  areaSize: '',
  color: '',
  processCombination: []
})

const handleSubmit = () => {
  if (!form.application || !form.surfaceMaterial || !form.patternType || !form.areaSize) {
    ElMessage.warning('请完善必要参数')
    return
  }

  ElMessage.success('需求提交成功')
}

const handleReset = () => {
  Object.assign(form, {
    application: '',
    surfaceMaterial: '',
    patternType: '',
    areaSize: '',
    color: '',
    processCombination: []
  })
}
</script>

<style scoped>
.process-combination {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-group-wrapper {
  width: 100%;
  overflow-x: auto;
}

:deep(.el-checkbox-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

:deep(.el-form-item) {
  margin-bottom: 22px;
}

:deep(.el-select) {
  width: 100%;
}
</style>