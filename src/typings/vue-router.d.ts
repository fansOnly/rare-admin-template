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
