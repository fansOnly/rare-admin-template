/**
 * 打开依赖分析
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true'
}

/**
 * 开启挡板模式
 */
export function isMockMode(): boolean {
  return process.env.MOCK === 'true'
}

/**
 * 规范化 .env 文件配置输出
 */
export function wrapperEnv(envConf: Recordable): ImportMetaEnv {
  let env: any = {}

  for (let key in envConf) {
    const value = envConf[key]
    // 转换布尔值
    env[key] = value === 'true' ? true : value === 'false' ? false : value

    // 添加到 process.env
    if (typeof value === 'string') {
      process.env[key] = value
    } else if (typeof value === 'object') {
      process.env[key] = JSON.stringify(value)
    }
  }

  return env
}
