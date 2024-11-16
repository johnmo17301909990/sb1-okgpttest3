import { createRouter, createWebHistory } from 'vue-router'
import RuleManagement from '../views/RuleManagement.vue'
import SupplierManagement from '../views/SupplierManagement.vue'
import POForm from '../components/POForm.vue'
import MappingRelationship from '../views/MappingRelationship.vue'
import FoilTest from '../components/FoilTest.vue'
import HistoryAnalysis from '../components/history/HistoryAnalysis.vue'
import Login from '../views/Login.vue'
import ProcessCombination from '../views/ProcessCombination.vue'
import SalesOrder from '../views/SalesOrder.vue'
import ComprehensiveOrder from '../views/ComprehensiveOrder.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/',
    redirect: '/foil'
  },
  {
    path: '/foil',
    name: 'foil',
    component: POForm,
    meta: { title: '烫金工艺选择', requiresAuth: true }
  },
  {
    path: '/mapping',
    name: 'mapping',
    component: MappingRelationship,
    meta: { title: '映射关系', requiresAuth: true }
  },
  {
    path: '/rules',
    name: 'rules',
    component: RuleManagement,
    meta: { title: '规则管理', requiresAuth: true }
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: SupplierManagement,
    meta: { title: '供应商管理', requiresAuth: true }
  },
  {
    path: '/test',
    name: 'test',
    component: FoilTest,
    meta: { title: '烫金工艺测试', requiresAuth: true }
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryAnalysis,
    meta: { title: '历史分析', requiresAuth: true }
  },
  {
    path: '/process-combination',
    name: 'processCombination',
    component: ProcessCombination,
    meta: { title: '工艺组合匹配', requiresAuth: true }
  },
  {
    path: '/sales-order',
    name: 'salesOrder',
    component: SalesOrder,
    meta: { title: '业务需求表', requiresAuth: true }
  },
  {
    path: '/comprehensive-order',
    name: 'comprehensiveOrder',
    component: ComprehensiveOrder,
    meta: { title: '综合工艺需求表', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    
    if (!isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router