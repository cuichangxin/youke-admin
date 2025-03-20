import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import Mock from './mock'
export function setupProdMockServer() {
  createProdMockServer([...Mock])
}
