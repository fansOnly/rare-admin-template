<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank" class="ns-menu-link">
    <slot />
  </a>
  <router-link v-else v-slot="{ isActive, href, navigate }" v-bind="$props" custom>
    <a
      v-bind="$attrs"
      :href="href"
      :class="['ns-menu-link', isActive ? activeClass : inactiveClass]"
      @click="navigate"
    >
      <slot />
    </a>
  </router-link>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineOptions({
  name: 'AppLink'
})

const router = useRouter()

const props = defineProps<{
  to: string
  activeClass?: string
  inactiveClass?: string
}>()

const isExternalLink = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})

const navigate = (to: string) => router.push(to)
</script>

<style lang="scss" scoped>
.ns-menu-link {
  color: inherit;
  text-decoration: none;
}
</style>
