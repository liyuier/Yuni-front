import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'dashboard', component: () => import('../views/Dashboard.vue'), meta: { title: '首页' } },
      { path: 'plugins', name: 'plugins', component: () => import('../views/Plugins.vue'), meta: { title: '插件管理' } },
      { path: 'groups', name: 'groups', component: () => import('../views/Groups.vue'), meta: { title: '群组管理' } },
      { path: 'logs', name: 'logs', component: () => import('../views/Logs.vue'), meta: { title: '运行日志' } },
      { path: 'settings', name: 'settings', component: () => import('../views/Settings.vue'), meta: { title: '系统设置' } },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
