<template>
  <div class="sales-order">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>业务需求表</span>
        </div>
      </template>

      <el-form :model="form" label-width="120px">
        <!-- 客户信息 -->
        <el-divider content-position="left">客户信息</el-divider>
        
        <el-form-item label="客户名称" required>
          <el-input v-model="form.customerName" placeholder="请输入客户名称" />
        </el-form-item>

        <el-form-item label="联系方式" required>
          <el-input v-model="form.contactInfo" placeholder="请输入联系方式" />
        </el-form-item>

        <!-- 工艺需求 -->
        <el-divider content-position="left">工艺需求</el-divider>

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

        <el-form-item label="图案类型" required>
          <el-select v-model="form.patternType" placeholder="请选择图案类型">
            <el-option
              v-for="item in patternOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

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

        <!-- 订单信息 -->
        <el-divider content-position="left">订单信息</el-divider>

        <el-form-item label="预计交期">
          <el-date-picker
            v-model="form.expectedDeliveryDate"
            type="date"
            placeholder="选择预计交期"
            :disabled-date="(time) => time.getTime() < Date.now()"
          />
        </el-form-item>

        <el-form-item label="数量">
          <el-input-number 
            v-model="form.quantity" 
            :min="1" 
            :precision="0"
            :step="1"
          />
        </el-form-item>

        <el-form-item label="特殊要求">
          <el-input
            v-model="form.specialRequirements"
            type="textarea"
            :rows="3"
            placeholder="请输入特殊工艺要求或注意事项"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交需求</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  applicationOptions, 
  areaOptions, 
  patternOptions, 
  surfaceOptions
} from '../data/foilMappings'
import { processCombinationOptions } from '../data/processCombinationData'

const form = reactive({
  customerName: '',
  contactInfo: '',
  application: '',
  foilArea: '',
  patternType: '',
  surfaceTreatment: '',
  processCombination: [],
  specialRequirements: '',
  expectedDeliveryDate: '',
  quantity: 1
})

const submitForm = () => {
  if (!form.customerName || !form.contactInfo || !form.application || !form.foilArea || !form.patternType) {
    ElMessage.warning('请填写必要信息')
    return
  }

  ElMessage.success('需求提交成功')
}

const resetForm = () => {
  Object.assign(form, {
    customerName: '',
    contactInfo: '',
    application: '',
    foilArea: '',
    patternType: '',
    surfaceTreatment: '',
    processCombination: [],
    specialRequirements: '',
    expectedDeliveryDate: '',
    quantity: 1
  })
}
</script>

<style scoped>
.sales-order {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-divider {
  margin: 24px 0 16px;
}

:deep(.el-checkbox-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

:deep(.el-form-item) {
  margin-bottom: 22px;
}
</style>