<template>
  <div class="mapping-relationship">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>烫金工艺映射关系表</span>
          <div>
            <el-button type="primary" @click="exportMapping">导出映射表</el-button>
            <el-button type="success" @click="importMapping">导入映射表</el-button>
          </div>
        </div>
      </template>

      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="映射关系表" name="mapping">
          <el-table 
            :data="tableData" 
            border 
            style="width: 100%"
            :max-height="600"
          >
            <el-table-column prop="companyCode" label="公司编号" width="120" fixed />
            <el-table-column prop="supplierCode" label="供应商编号" width="120" />
            <el-table-column prop="series" label="烫金纸系列" width="120" />
            <el-table-column prop="category" label="分类" width="100" />
            <el-table-column prop="usage" label="用途及解析" min-width="200" show-overflow-tooltip />
            <el-table-column prop="mainApplication" label="主要应用" width="150" />
            <el-table-column prop="suitableSize" label="合适尺寸" width="120" />
            <el-table-column prop="tension" label="松紧度" width="80" />
            <el-table-column label="UV兼容" width="80">
              <template #default="scope">
                <el-tag :type="scope.row.uvCompatible ? 'success' : 'danger'">
                  {{ scope.row.uvCompatible ? '✓' : '×' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" fixed="right">
              <template #default="scope">
                <el-button size="small" @click="editMapping(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="规格说明" name="specs">
          <el-descriptions title="尺寸规格说明" :column="1" border>
            <el-descriptions-item 
              v-for="(desc, key) in sizeDescriptions" 
              :key="key" 
              :label="desc.name"
            >
              {{ desc.description }}
            </el-descriptions-item>
          </el-descriptions>

          <el-descriptions title="松紧度说明" :column="1" border style="margin-top: 20px">
            <el-descriptions-item 
              v-for="(desc, key) in tensionDescriptions" 
              :key="key" 
              :label="desc.name"
            >
              {{ desc.description }}
            </el-descriptions-item>
          </el-descriptions>

          <el-descriptions title="UV说明" :column="1" border style="margin-top: 20px">
            <el-descriptions-item 
              v-for="(desc, key) in uvDescriptions" 
              :key="key" 
              :label="desc.name"
            >
              {{ desc.description }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>

        <el-tab-pane label="系列说明" name="series">
          <el-descriptions title="烫金纸系列说明" :column="1" border>
            <el-descriptions-item label="SY1-系列">
              适用于渐变、网点烫金，紧身效果，主要用于贺卡
            </el-descriptions-item>
            <el-descriptions-item label="SY6-系列">
              适用于幼细线条、文字，标准松紧度，综合应用
            </el-descriptions-item>
            <el-descriptions-item label="SY+系列">
              适用于大面积烫金，松身效果，主要用于大面积应用
            </el-descriptions-item>
            <el-descriptions-item label="G1系列">
              适用于普通烫金、烫后过胶，标准松紧度
            </el-descriptions-item>
            <el-descriptions-item label="ST系列">
              耐磨系列，适用于UV涂层上烫金
            </el-descriptions-item>
            <el-descriptions-item label="GN系列">
              耐磨系列，适用于特殊效果烫金
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog 
      v-model="dialogVisible" 
      title="编辑映射关系"
      width="60%"
    >
      <el-form :model="currentMapping" label-width="120px">
        <el-form-item label="公司编号" required>
          <el-input v-model="currentMapping.companyCode" />
        </el-form-item>
        <el-form-item label="供应商编号" required>
          <el-input v-model="currentMapping.supplierCode" />
        </el-form-item>
        <el-form-item label="烫金纸系列" required>
          <el-select v-model="currentMapping.series" placeholder="选择系列">
            <el-option 
              v-for="item in series"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类" required>
          <el-select v-model="currentMapping.category" placeholder="选择分类">
            <el-option
              v-for="item in categories"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用途及解析">
          <el-input 
            v-model="currentMapping.usage" 
            type="textarea" 
            :rows="3" 
          />
        </el-form-item>
        <el-form-item label="主要应用" required>
          <el-select v-model="currentMapping.mainApplication" placeholder="选择应用场景">
            <el-option
              v-for="item in applications"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合适尺寸" required>
          <el-select v-model="currentMapping.suitableSize" multiple placeholder="选择尺寸">
            <el-option
              v-for="item in sizes"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="松紧度" required>
          <el-select v-model="currentMapping.tension" placeholder="选择松紧度">
            <el-option
              v-for="item in tensions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="UV兼容">
          <el-switch v-model="currentMapping.uvCompatible" />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveMapping">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  mappingData,
  categories,
  applications,
  sizes,
  tensions,
  series,
  sizeDescriptions,
  tensionDescriptions,
  uvDescriptions
} from '../data/mappingData'

const activeTab = ref('mapping')
const tableData = ref([])
const dialogVisible = ref(false)
const currentMapping = reactive({
  companyCode: '',
  supplierCode: '',
  series: '',
  category: '',
  usage: '',
  mainApplication: '',
  suitableSize: '',
  tension: '',
  uvCompatible: false
})

// 将嵌套的映射数据转换为扁平的表格数据
const flattenMappingData = () => {
  const flattened = []
  mappingData.forEach(mapping => {
    mapping.supplierCodes.forEach(supplier => {
      flattened.push({
        companyCode: mapping.companyCode,
        supplierCode: supplier.code,
        series: supplier.series,
        category: supplier.category,
        usage: supplier.usage,
        mainApplication: supplier.mainApplication,
        suitableSize: supplier.suitableSize,
        tension: supplier.tension,
        uvCompatible: supplier.uvCompatible
      })
    })
  })
  return flattened
}

// 初始化表格数据
tableData.value = flattenMappingData()

const editMapping = (mapping) => {
  Object.assign(currentMapping, JSON.parse(JSON.stringify(mapping)))
  dialogVisible.value = true
}

const saveMapping = () => {
  const index = tableData.value.findIndex(m => 
    m.companyCode === currentMapping.companyCode &&
    m.supplierCode === currentMapping.supplierCode
  )
  
  if (index > -1) {
    tableData.value[index] = JSON.parse(JSON.stringify(currentMapping))
    ElMessage.success('保存成功')
    dialogVisible.value = false
  }
}

const exportMapping = () => {
  const data = JSON.stringify(tableData.value, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'mapping-data.json'
  link.click()
  URL.revokeObjectURL(url)
  ElMessage.success('导出成功')
}

const importMapping = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        tableData.value = data
        ElMessage.success('导入成功')
      } catch (error) {
        ElMessage.error('导入失败：无效的文件格式')
      }
    }
    reader.readAsText(file)
  }
  input.click()
}
</script>

<style scoped>
.mapping-relationship {
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-descriptions {
  margin: 20px 0;
}
:deep(.el-descriptions__title) {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>