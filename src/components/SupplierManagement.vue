<template>
  <div class="supplier-management">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>供应商管理</span>
          <el-button type="primary" @click="addSupplier">添加供应商</el-button>
        </div>
      </template>

      <el-table :data="suppliers" style="width: 100%">
        <el-table-column prop="companyCode" label="公司编号" width="120" />
        <el-table-column prop="supplierCode" label="供应商编号" width="120" />
        <el-table-column prop="series" label="烫金纸系列" width="150" />
        <el-table-column prop="category" label="分类" width="100" />
        <el-table-column prop="usage" label="用途说明" />
        <el-table-column prop="mainApplication" label="主要应用" width="120" />
        <el-table-column prop="suitableSize" label="适用尺寸" width="120" />
        <el-table-column label="UV兼容" width="80">
          <template #default="scope">
            <el-tag :type="scope.row.uvCompatible ? 'success' : 'danger'">
              {{ scope.row.uvCompatible ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="editSupplier(scope.row)">编辑</el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="deleteSupplier(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog 
      v-model="dialogVisible" 
      :title="dialogTitle"
      width="60%"
    >
      <el-form :model="currentSupplier" label-width="120px">
        <el-form-item label="公司编号">
          <el-input v-model="currentSupplier.companyCode" />
        </el-form-item>
        <el-form-item label="供应商编号">
          <el-input v-model="currentSupplier.supplierCode" />
        </el-form-item>
        <el-form-item label="烫金纸系列">
          <el-input v-model="currentSupplier.series" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="currentSupplier.category" placeholder="选择分类">
            <el-option
              v-for="item in categories"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用途说明">
          <el-input 
            v-model="currentSupplier.usage" 
            type="textarea" 
            :rows="3" 
          />
        </el-form-item>
        <el-form-item label="主要应用">
          <el-select v-model="currentSupplier.mainApplication" placeholder="选择应用">
            <el-option
              v-for="item in applications"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="适用尺寸">
          <el-select v-model="currentSupplier.suitableSize" placeholder="选择尺寸">
            <el-option
              v-for="item in sizes"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="UV兼容">
          <el-switch v-model="currentSupplier.uvCompatible" />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveSupplier">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 分类选项
const categories = [
  '普通金纸',
  '普通银纸',
  '普通耐磨',
  '特殊效果'
]

// 应用场景选项
const applications = [
  '贺卡',
  '精装书',
  '包装',
  '综合印刷',
  '精平装'
]

// 尺寸选项
const sizes = [
  '小面积',
  '中面积',
  '大面积'
]

// 供应商列表
const suppliers = ref([
  {
    companyCode: 'HS#1G',
    supplierCode: 'SH111',
    series: 'SH的标准金纸',
    category: '普通金纸',
    usage: '金色烫金纸，适用于高端印刷项目',
    mainApplication: '贺卡',
    suitableSize: '小面积',
    uvCompatible: true
  }
])

const dialogVisible = ref(false)
const dialogTitle = ref('')
const currentSupplier = reactive({
  companyCode: '',
  supplierCode: '',
  series: '',
  category: '',
  usage: '',
  mainApplication: '',
  suitableSize: '',
  uvCompatible: false
})

// 添加供应商
const addSupplier = () => {
  dialogTitle.value = '添加供应商'
  Object.assign(currentSupplier, {
    companyCode: '',
    supplierCode: '',
    series: '',
    category: '',
    usage: '',
    mainApplication: '',
    suitableSize: '',
    uvCompatible: false
  })
  dialogVisible.value = true
}

// 编辑供应商
const editSupplier = (supplier) => {
  dialogTitle.value = '编辑供应商'
  Object.assign(currentSupplier, JSON.parse(JSON.stringify(supplier)))
  dialogVisible.value = true
}

// 删除供应商
const deleteSupplier = (supplier) => {
  ElMessageBox.confirm(
    '确定要删除这个供应商吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    const index = suppliers.value.findIndex(s => 
      s.companyCode === supplier.companyCode && 
      s.supplierCode === supplier.supplierCode
    )
    if (index > -1) {
      suppliers.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

// 保存供应商
const saveSupplier = () => {
  if (!currentSupplier.companyCode || !currentSupplier.supplierCode) {
    ElMessage.warning('请填写完整的供应商信息')
    return
  }
  
  const index = suppliers.value.findIndex(s => 
    s.companyCode === currentSupplier.companyCode && 
    s.supplierCode === currentSupplier.supplierCode
  )
  
  if (index > -1) {
    suppliers.value[index] = JSON.parse(JSON.stringify(currentSupplier))
  } else {
    suppliers.value.push(JSON.parse(JSON.stringify(currentSupplier)))
  }
  
  dialogVisible.value = false
  ElMessage.success('保存成功')
}
</script>

<style scoped>
.supplier-management {
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>