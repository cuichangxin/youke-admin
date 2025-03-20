import { createProdMockServer } from 'vite-plugin-mock/client'
import Mock from './mock'
export function setupProdMockServer() {
  createProdMockServer([...Mock])
}
