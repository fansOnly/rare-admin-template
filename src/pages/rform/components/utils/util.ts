/**
 * 首字母大写
 */
export const humpNaming = (str: string) => {
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}
