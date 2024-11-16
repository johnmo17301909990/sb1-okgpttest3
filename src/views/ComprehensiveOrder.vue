<template>
  <div class="comprehensive-order">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>综合工艺需求表</span>
        </div>
      </template>

      <el-form :model="form" label-width="120px">
        <!-- 基本信息 -->
        <el-divider content-position="left">基本信息</el-divider>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户名称" required>
              <el-input v-model="form.customerName" placeholder="请输入客户名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" required>
              <el-input v-model="form.contactInfo" placeholder="请输入联系方式" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 产品信息 -->
        <el-divider content-position="left">产品信息</el-divider>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="产品类型" required>
              <el-select v-model="form.productType" placeholder="请选择产品类型">
                <el-option label="精装书" value="book" />
                <el-option label="包装盒" value="box" />
                <el-option label="贺卡" value="card" />
                <el-option label="画册" value="album" />
                <el-option label="说明书" value="manual" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="材质" required>
              <el-select v-model="form.material" placeholder="请选择材质">
                <el-option label="铜版纸" value="coated" />
                <el-option label="白卡纸" value="white" />
                <el-option label="特种纸" value="special" />
                <el-option label="布纹纸" value="cloth" />
                <el-option label="珠光纸" value="pearl" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="尺寸规格" required>
              <el-input-number v-model="form.length" :min="1" placeholder="长" style="width: 150px" />
              <span class="mx-2">×</span>
              <el-input-number v-model="form.width" :min="1" placeholder="宽" style="width: 150px" />
              <span class="mx-2">mm</span>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 工艺需求 -->
        <el-divider content-position="left">工艺需求</el-divider>

        <el-form-item label="工艺选择" required>
          <el-checkbox-group v-model="form.processes">
            <el-checkbox-button label="印刷">印刷</el-checkbox-button>
            <el-checkbox-button label="烫金">烫金</el-checkbox-button>
            <el-checkbox-button label="UV">UV</el-checkbox-button>
            <el-checkbox-button label="覆膜">覆膜</el-checkbox-button>
            <el-checkbox-button label="压纹">压纹</el-checkbox-button>
            <el-checkbox-button label="模切">模切</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>

        <!-- 印刷工艺 -->
        <template v-if="form.processes.includes('印刷')">
          <el-form-item label="印刷工艺">
            <el-radio-group v-model="form.printType">
              <el-radio label="offset">胶印</el-radio>
              <el-radio label="digital">数码印刷</el-radio>
              <el-radio label="screen">丝网印刷</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="印刷颜色">
            <el-checkbox-group v-model="form.printColors">
              <el-checkbox label="cyan">青色</el-checkbox>
              <el-checkbox label="magenta">品红</el-checkbox>
              <el-checkbox label="yellow">黄色</el-checkbox>
              <el-checkbox label="black">黑色</el-checkbox>
              <el-checkbox label="spot">专色</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </template>

        <!-- 烫金工艺 -->
        <template v-if="form.processes.includes('烫金')">
          <el-form-item label="烫金类型">
            <el-select v-model="form.foilType" placeholder="请选择烫金类型">
              <el-option label="普通金" value="gold" />
              <el-option label="哑金" value="mattGold" />
              <el-option label="银色" value="silver" />
              <el-option label="玫瑰金" value="roseGold" />
              <el-option label="镭射" value="laser" />
            </el-select>
          </el-form-item>

          <el-form-item label="烫金面积">
            <el-radio-group v-model="form.foilArea">
              <el-radio label="small">小面积</el-radio>
              <el-radio label="medium">中面积</el-radio>
              <el-radio label="large">大面积</el-radio>
            </el-radio-group>
          </el-form-item>
        </template>

        <!-- UV工艺 -->
        <template v-if="form.processes.includes('UV')">
          <el-form-item label="UV类型">
            <el-select v-model="form.uvType" placeholder="请选择UV类型">
              <el-option label="普通UV" value="normal" />
              <el-option label="LED UV" value="led" />
              <el-option label="局部UV" value="spot" />
            </el-select>
          </el-form-item>

          <el-form-item label="UV效果">
            <el-radio-group v-model="form.uvEffect">
              <el-radio label="glossy">亮光</el-radio>
              <el-radio label="matte">哑光</el-radio>
              <el-radio label="silk">绸光</el-radio>
            </el-radio-group>
          </el-form-item>
        </template>

        <!-- 压纹工艺 -->
        <template v-if="form.processes.includes('压纹')">
          <el-form-item label="压纹类型">
            <el-select v-model="form.embossType" placeholder="请选择压纹类型">
              <el-option label="凹凸压纹" value="emboss" />
              <el-option label="浮雕" value="relief" />
              <el-option label="盲压" value="blind" />
            </el-select>
          </el-form-item>
        </template>

        <!-- 订单信息 -->
        <el-divider content-position="left">订单信息</el-divider>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="数量" required>
              <el-input-number v-model="form.quantity" :min="1" :step="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交期要求" required>
              <el-date-picker
                v-model="form.deadline"
                type="date"
                placeholder="选择交期"
                :disabled-date="disabledDate"
              />
            </el-form-item>
          </el-col>
        </el-row>

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

const form = reactive({
  customerName: '',
  contactInfo: '',
  productType: '',
  material: '',
  length: '',
  width: '',
  processes: [],
  printType: '',
  printColors: [],
  foilType: '',
  foilArea: '',
  uvType: '',
  uvEffect: '',
  embossType: '',
  quantity: 1,
  deadline: '',
  specialRequirements: ''
})

const disabledDate = (time) => {
  return time.getTime() < Date.now()
}

const submitForm = () => {
  ElMessage.success('需求提交成功')
}

const resetForm = () => {
  Object.assign(form, {
    customerName: '',
    contactInfo: '',
    productType: '',
    material: '',
    length: '',
    width: '',
    processes: [],
    printType: '',
    printColors: [],
    foilType: '',
    foilArea: '',
    uvType: '',
    uvEffect: '',
    embossType: '',
    quantity: 1,
    deadline: '',
    specialRequirements: ''
  })
}
</script>

<style scoped>
.comprehensive-order {
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

.mx-2 {
  margin: 0 8px;
}
</style>