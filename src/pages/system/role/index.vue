<template>
  <div>
    this is user page
    <el-button @click="jump('/news/index')">跳转 news</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const jump = (url: string) => {
  router.push(url)
}
</script>

<style scoped lang="scss"></style>
