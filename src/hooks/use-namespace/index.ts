export const defaultNamespace = 'ns'
const statePrefix = 'is-'

const _bem = (namespace: string, block: string, element: string, modifier: string) => {
  let cls = `${namespace}-${block}`
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export const useNamespace = (block: string) => {
  const namespace = defaultNamespace
  const b = () => _bem(namespace, block, '', '')
  const e = (element?: string) => (element ? _bem(namespace, block, element, '') : '')
  const m = (modifier?: string) => (modifier ? _bem(namespace, block, '', modifier) : '')

  const bem = (element?: string, modifier?: string) =>
    element && modifier ? _bem(namespace, block, element, modifier) : ''
  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }
  // for css var
  // --el-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      styles[`--${namespace}-${block}-${key}`] = object[key]
    }
    return styles
  }

  return {
    namespace,
    b,
    e,
    m,
    bem,
    is,
    cssVar
  }
}
