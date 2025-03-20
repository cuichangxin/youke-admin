import { createProdMockServer } from 'vite-plugin-mock/client'
import mock from './index'

export function setupProdMockServer() {
  createProdMockServer([...mock])
}
