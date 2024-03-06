import { createPinia } from 'pinia'
import useAppStore from './app'
import useKeepAlive from './keepAlivecancel'
import useTabStore from './tabStore'
import useUserStore from './user'
import usePermissionStore from './permission'

const pinia = createPinia()

export { useAppStore, useKeepAlive, useTabStore, useUserStore, usePermissionStore }
export default pinia
