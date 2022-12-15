<template>
  <div></div>
</template>

<script setup lang="ts">
import { useNamespace } from '@/hooks/use-namespace'

const ns = useNamespace('button')
console.log('==b==', ns.b())
console.log('==e==', ns.e('icon'))
console.log('==m==', ns.m('primary'))
console.log('==bem==', ns.bem('text', 'large'))
console.log('==is==', ns.is('round'))
console.log('==cssVar==', ns.cssVar({ height: '50px' }))
</script>
