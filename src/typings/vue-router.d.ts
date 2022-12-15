import 'vue-router'
import type { PropType as VuePropType } from 'vue'

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // menu id
    id?: string
    // menu icon
    icon?: string
    // menu name
    title?: string
    // if cache menu path
    cache?: boolean
    // menu animation name when toggle visibility
    transition?: string
    // menu target type
    type?: 'default' | 'external-link' | 'iframe'
    // external-link or iframe url
    src?: string
    // if always affix on tabs
    affix?: boolean
  }
}

declare global {
  declare type PropType<T> = VuePropType<T>
  declare type Recordable<T = any> = Record<string, T>

  export type isType<T = unknown> = (val: unknown) => val is T
  export const mutable = <T extends readonly any[] | Record<string, unknown>>(val: T) =>
    val as Mutable<typeof val>
  export type Mutable<T> = { -readonly [P in keyof T]: T[P] }
  export type Nullable<T> = T | null

  export type Arrayable<T> = T | T[]
  export type Awaitable<T> = Promise<T> | T
  export type FlagType = 'Y' | 'N'
}
