import { viteMockServe } from 'vite-plugin-mock'
import { isMockMode } from '../../util'

export function useMockPlugin(isBuild: boolean) {
  if (isMockMode()) {
    return viteMockServe({
      ignore: /^\_/,
      mockPath: 'src/mocks',
      localEnabled: !isBuild,
      prodEnabled: isBuild,
      injectCode: `
      import { setupProdMockServer } from './mocks/_createProductionServer';
      setupProdMockServer();
      `
    })
  }
  return []
}
