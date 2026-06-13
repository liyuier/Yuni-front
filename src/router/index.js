import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'dashboard', component: () => import('../views/Dashboard.vue'), meta: { title: '首页' } },
      {
        path: 'plugins',
        component: () => import('../views/Plugins.vue'),
        redirect: '/plugins/installed',
        children: [
          { path: 'installed', name: 'plugins-installed', component: () => import('../views/plugins/InstalledPlugins.vue'), meta: { title: '已安装插件' } },
          { path: 'market', name: 'plugins-market', component: () => import('../views/plugins/PluginMarket.vue'), meta: { title: '插件市场' } },
        ],
      },
      { path: 'groups', name: 'groups', component: () => import('../views/Groups.vue'), meta: { title: '群组管理' } },
      { path: 'database', name: 'database', component: () => import('../views/Logs.vue'), meta: { title: '数据库' } },
      { path: 'settings', name: 'settings', component: () => import('../views/Settings.vue'), meta: { title: '系统设置' } },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
