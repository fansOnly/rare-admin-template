import md5 from 'md5'

export const md5Encrypt = (val: string): string => md5(val)
