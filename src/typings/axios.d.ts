export interface RequestOption {
  [key: string]: unknown
}

export interface ResponseData {
  STATUS: number | string
  MSG: string
  LIST?: Array<any>
  [key: string]: any
}
