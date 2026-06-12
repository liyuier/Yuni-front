<script setup>
const stats = [
  { icon: '🐧', value: '12', label: '接入群组' },
  { icon: '💬', value: '1,247', label: '今日收/发消息' },
  { icon: '👥', value: '8', label: '今日活跃群' },
  { icon: '⏱', value: '4h 32m', label: '运行时长' },
]

const recentLogs = [
  { time: '12:03', text: '群「黎明」用户「阿喵喵宁」触发 /切噜 转换' },
  { time: '12:01', text: '群「黎明」用户「霖湙」发送图片' },
  { time: '11:58', text: '疯四插件 → 向 6 个群发送文案' },
  { time: '11:45', text: 'NapCat 心跳正常' },
  { time: '11:30', text: '群「黎明」用户「湫湫丶」触发 /运势' },
]
</script>

<template>
  <div>
    <h2 class="text-xl font-medium text-pink-800 mb-6">🌸 今日概览</h2>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4 mb-8">
      <div v-for="s in stats" :key="s.label" class="yuni-card">
        <div class="text-3xl mb-1">{{ s.icon }}</div>
        <div class="text-2xl font-bold text-pink-700">{{ s.value }}</div>
        <div class="text-sm text-pink-400">{{ s.label }}</div>
      </div>
    </div>

    <!-- Bot Status + JVM -->
    <div class="grid grid-cols-2 gap-4 mb-8">
      <div class="yuni-card">
        <h3 class="text-sm font-medium text-pink-500 mb-4 uppercase tracking-wider">🤖 Bot 状态</h3>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-pink-400">连接状态</span>
            <span class="text-pink-700 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-green-400"></span>在线
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-pink-400">QQ</span>
            <span class="text-pink-700">2775446955</span>
          </div>
          <div class="flex justify-between">
            <span class="text-pink-400">昵称</span>
            <span class="text-pink-700">Yuni</span>
          </div>
          <div class="flex justify-between">
            <span class="text-pink-400">协议</span>
            <span class="text-pink-700">OneBot / WebSocket</span>
          </div>
        </div>
      </div>

      <div class="yuni-card">
        <h3 class="text-sm font-medium text-pink-500 mb-4 uppercase tracking-wider">📊 系统资源</h3>
        <div class="space-y-3 text-sm">
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-pink-400">堆内存</span>
              <span class="text-pink-700">128M / 512M</span>
            </div>
            <div class="h-2 rounded-full bg-pink-100 overflow-hidden">
              <div class="h-full rounded-full" style="width:25%;background:linear-gradient(90deg,#f48fb1,#ec407a)"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-pink-400">磁盘 (data/)</span>
              <span class="text-pink-700">2.4G / 40G</span>
            </div>
            <div class="h-2 rounded-full bg-pink-100 overflow-hidden">
              <div class="h-full rounded-full" style="width:6%;background:linear-gradient(90deg,#f48fb1,#ec407a)"></div>
            </div>
          </div>
          <div class="flex justify-between">
            <span class="text-pink-400">CPU</span>
            <span class="text-pink-700">&lt; 1%</span>
          </div>
          <div class="flex justify-between">
            <span class="text-pink-400">数据库</span>
            <span class="text-pink-700">SQLite / ~1,200 条消息</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="yuni-card">
      <h3 class="text-sm font-medium text-pink-500 mb-4 uppercase tracking-wider">📋 最近活动</h3>
      <div class="space-y-1">
        <div v-for="log in recentLogs" :key="log.time"
          class="flex gap-4 py-2 px-3 rounded-lg hover:bg-pink-50 transition-colors text-sm">
          <span class="text-pink-300 shrink-0 font-mono">{{ log.time }}</span>
          <span class="text-pink-600">{{ log.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
