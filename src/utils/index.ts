export * from './validate'

export const EMPTY_OBJ = {}
export const EMPTY_ARR = []
export const NOOP = () => {}
export const NO = () => false

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val =>
  hasOwnProperty.call(val, key)

export const extend = Object.assign

export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string => objectToString.call(value)

export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isArray = Array.isArray
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
export const isPlainObject = (val: unknown): val is object => {
  return toTypeString(val) === '[object Object]'
}
export const isDate = (val: unknown): val is Date => {
  return toTypeString(val) === '[object Date]'
}

export const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as T
}

export const mappingText = <T extends Recordable>(source: T[], val: unknown): keyof T => {
  return source.find(v => v.value === val)?.label
}
