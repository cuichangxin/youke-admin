import { createVNode, render } from 'vue'
import Loading from '@/components/common/loading/loading.vue'

export default function useLoading(plugin, option) {
  // 创建虚拟节点
  const VNode = createVNode(Loading)
  // 渲染节点
  render(VNode, document.body)
  const showLoading = () => {
    VNode.component?.exposed.showLoading()
  }
  const hideLoading = () => {
    VNode.component?.exposed.hideLoading()
  }
  return {
    showLoading,
    hideLoading,
  }
}
