declare global {
  declare type PropType<T> = VuePropType<T>
  declare type Recordable<T = any> = Record<string, T>

  declare type isType<T = unknown> = (val: unknown) => val is T
  declare const mutable = <T extends readonly any[] | Record<string, unknown>>(val: T) =>
    val as Mutable<typeof val>
  declare type Mutable<T> = { -readonly [P in keyof T]: T[P] }
  declare type Nullable<T> = T | null

  declare type Arrayable<T> = T | T[]
  declare type Awaitable<T> = Promise<T> | T
  declare type FlagType = 'Y' | 'N'
}

export {}
