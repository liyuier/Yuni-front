import { request } from './request'

/**
 * 获取插件列表。
 * @returns {Promise<Array>} 插件信息数组
 */
export function getPluginList() {
  return request('/admin/plugin/list', { method: 'POST' })
}
