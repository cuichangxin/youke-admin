import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import mock from './index'

export function setupProdMockServer() {
  createProdMockServer([...mock])
}
