import { useUserStore } from '@/store'

export default function usePermission() {
  const userStore = useUserStore()
  return {
    accessRouter(route) {
      const hasRole = userStore.role.some(value => {
        return !route.meta?.roles || route.meta?.roles.includes('*') || route.meta.roles.includes(value)
      })
      return hasRole
    },
  }
}
