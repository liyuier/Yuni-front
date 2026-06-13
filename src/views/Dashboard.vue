<script setup>
import { ref, onMounted } from 'vue'
import { getBotStatus, getDashboardStats, getSystemInfo } from '../api/dashboard'

const botStatus = ref(null)
const dashboardStats = ref(null)
const systemInfo = ref(null)

onMounted(async () => {
  try { botStatus.value = await getBotStatus() } catch (e) { /* 保持 null */ }
  try { dashboardStats.value = await getDashboardStats() } catch (e) { /* 保持 null */ }
  try { systemInfo.value = await getSystemInfo() } catch (e) { /* 保持 null */ }
})

const stats = [
  { icon: '🐧', key: 'group_count', label: '接入群组' },
  { icon: '💬', key: 'today_message_count', label: '今日收/发消息' },
  { icon: '👥', key: 'today_active_group_count', label: '今日活跃群' },
  { icon: '⏱', key: 'uptime', label: '运行时长' },
]

function statValue(key) {
  if (!dashboardStats.value) return '--'
  return dashboardStats.value[key] || '--'
}

function parseBytes(str) {
  if (!str) return 0
  const num = parseFloat(str)
  if (str.endsWith('T')) return num * 1024 * 1024 * 1024 * 1024
  if (str.endsWith('G')) return num * 1024 * 1024 * 1024
  if (str.endsWith('M')) return num * 1024 * 1024
  if (str.endsWith('K')) return num * 1024
  return num
}

function heapPercent() {
  const used = parseBytes(systemInfo.value?.heap_used)
  const max = parseBytes(systemInfo.value?.heap_max)
  return max > 0 ? Math.min(100, (used / max) * 100) : 0
}

function diskPercent() {
  const used = parseBytes(systemInfo.value?.disk_used)
  const total = parseBytes(systemInfo.value?.disk_total)
  return total > 0 ? Math.min(100, (used / total) * 100) : 0
}
</script>

<template>
  <div>
    <h2 class="text-xl 2xl:text-2xl font-bold text-pink-800 mb-6">🌸 今日概览</h2>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-4 gap-4 mb-8">
      <div v-for="s in stats" :key="s.label" class="yuni-card">
        <div class="text-3xl mb-1">{{ s.icon }}</div>
        <div class="text-2xl font-bold text-pink-700">{{ statValue(s.key) }}</div>
        <div class="text-sm 2xl:text-base text-pink-400">{{ s.label }}</div>
      </div>
    </div>

    <!-- Bot 状态 + 系统资源 -->
    <div class="grid grid-cols-2 gap-4 mb-8">
      <!-- Bot 状态 -->
      <div class="yuni-card">
        <h3 class="text-sm 2xl:text-base font-medium text-pink-500 mb-4 uppercase tracking-wider">🤖 Bot 状态</h3>
        <div class="space-y-3 text-sm 2xl:text-base">
          <div class="flex justify-between">
            <span class="text-pink-400">连接状态</span>
            <span class="text-pink-700 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full" :class="botStatus?.online ? 'bg-green-400' : 'bg-gray-300'"></span>
              {{ botStatus?.status_text || '--' }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-pink-400">QQ</span>
            <span class="text-pink-700">{{ botStatus?.bot_id || '--' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-pink-400">昵称</span>
            <span class="text-pink-700">{{ botStatus?.nickname || '--' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-pink-400">协议</span>
            <span class="text-pink-700">{{ botStatus?.protocol || '--' }}</span>
          </div>
        </div>
      </div>

      <!-- 系统资源 -->
      <div class="yuni-card">
        <h3 class="text-sm 2xl:text-base font-medium text-pink-500 mb-4 uppercase tracking-wider">📊 系统资源</h3>
        <div class="space-y-3 text-sm 2xl:text-base">
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-pink-400">物理内存</span>
              <span class="text-pink-700">{{ systemInfo?.heap_used || '--' }} / {{ systemInfo?.heap_max || '--' }}</span>
            </div>
            <div class="h-2 rounded-full bg-pink-100 overflow-hidden">
              <div
                class="h-full rounded-full" :style="{ width: heapPercent() + '%', background: 'linear-gradient(90deg,#f48fb1,#ec407a)' }"
              ></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-pink-400">磁盘 (data/)</span>
              <span class="text-pink-700">{{ systemInfo?.disk_used || '--' }} / {{ systemInfo?.disk_total || '--' }}</span>
            </div>
            <div class="h-2 rounded-full bg-pink-100 overflow-hidden">
              <div
                class="h-full rounded-full" :style="{ width: diskPercent() + '%', background: 'linear-gradient(90deg,#f48fb1,#ec407a)' }"
              ></div>
            </div>
          </div>
          <div class="flex justify-between">
            <span class="text-pink-400">CPU</span>
            <span class="text-pink-700">{{ systemInfo?.cpu_usage || '--' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-pink-400">数据库</span>
            <span class="text-pink-700">{{ systemInfo?.db_info || '--' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 装饰卡片 -->
    <div
      class="yuni-card relative overflow-hidden"
      style="min-height: 180px;"
    >
      <div
        class="absolute inset-0 opacity-20"
        style="background:
          radial-gradient(ellipse at 20% 50%, #f8bbd0 0%, transparent 50%),
          radial-gradient(ellipse at 80% 30%, #f48fb1 0%, transparent 40%),
          radial-gradient(ellipse at 50% 80%, #fce4ec 0%, transparent 50%);"
      ></div>
      <div class="relative flex items-center justify-center h-full py-10">
        <div class="text-center">
          <div class="text-5xl mb-3">🌸</div>
          <p class="text-pink-500 font-medium text-lg 2xl:text-xl">
            {{ botStatus?.nickname || 'Yuni' }} 运行中
          </p>
          <p class="text-pink-300 text-sm 2xl:text-base mt-1">
            今天也是美好的一天 ✨
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
