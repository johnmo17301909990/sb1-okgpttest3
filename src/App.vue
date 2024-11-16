<template>
  <el-config-provider :locale="zhCn">
    <router-view v-slot="{ Component }">
      <template v-if="$route.path === '/login'">
        <component :is="Component" />
      </template>
      <div v-else class="app-container">
        <el-menu mode="horizontal" :router="true" class="menu" :default-active="$route.path">
          <el-menu-item index="/foil">烫金工艺选择</el-menu-item>
          <el-menu-item index="/mapping">映射关系</el-menu-item>
          <el-menu-item index="/rules">规则管理</el-menu-item>
          <el-menu-item index="/suppliers">供应商管理</el-menu-item>
          <el-menu-item index="/test">烫金测试</el-menu-item>
          <el-menu-item index="/history">历史分析</el-menu-item>
          <el-menu-item index="/process-combination">工艺组合匹配</el-menu-item>
          <el-menu-item index="/sales-order">业务需求表</el-menu-item>
          <el-menu-item index="/comprehensive-order">综合工艺需求</el-menu-item>
          <div class="menu-right">
            <el-dropdown @command="handleCommand">
              <span class="user-dropdown">
                {{ username }}
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人信息</el-dropdown-item>
                  <el-dropdown-item command="settings">系统设置</el-dropdown-item>
                  <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-menu>
        <div class="content">
          <component :is="Component" />
        </div>
      </div>
    </router-view>
  </el-config-provider>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const router = useRouter()
const username = computed(() => localStorage.getItem('username') || 'admin')

const handleCommand = (command) => {
  if (command === 'logout') {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    router.push('/login')
  }
}
</script>

<style>
.app-container {
  min-height: 100vh;
}

.menu {
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  position: relative;
}

.menu-right {
  position: absolute;
  right: 20px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
}

.user-dropdown {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #409EFF;
}

.content {
  padding: 20px;
}
</style>