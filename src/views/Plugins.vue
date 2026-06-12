<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { key: 'installed', label: '已安装插件', to: '/plugins/installed' },
  { key: 'market', label: '插件市场', to: '/plugins/market' },
]

function isActive(tab) {
  return route.path.startsWith(tab.to)
}
</script>

<template>
  <div>
    <h2 class="text-xl 2xl:text-2xl font-bold text-pink-800 mb-4">🧩 插件管理</h2>

    <!-- Tab 路由导航 -->
    <div class="flex items-center gap-1 bg-pink-50 rounded-xl p-1 w-fit mb-5">
      <router-link
        v-for="tab in tabs"
        :key="tab.key"
        :to="tab.to"
        class="px-4 py-1.5 rounded-lg text-sm 2xl:text-base font-medium transition-all"
        :class="isActive(tab)
          ? 'bg-white text-pink-700 shadow-sm'
          : 'text-pink-400 hover:text-pink-600'"
      >{{ tab.label }}</router-link>
    </div>

    <router-view />
  </div>
</template>
