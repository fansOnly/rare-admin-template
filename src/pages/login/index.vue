<template>
  <div class="page">
    <div class="login-box">
      <div class="logo">logo 图片</div>
      <div class="login-title">{{ title }}</div>
      <div class="login-form">
        <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="120px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" type="text" @keyup.enter="submitForm(loginFormRef)" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" autocomplete="off"
              @keyup.enter="submitForm(loginFormRef)" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-button" :loading="loading" @click="submitForm(loginFormRef)">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { login } from '@/api/core'
import { md5Encrypt } from '@/common/security/md5'
import { useMessage } from '@/hooks/use-message'
const { useToast, closeToast } = useMessage()

const router = useRouter()
const route = useRoute()
const redirectedFrom = route.redirectedFrom

const title = import.meta.env.VITE_APP_TITLE

const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const loginForm = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
})

const submitForm = (formEle: FormInstance | undefined) => {
  if (!formEle) return
  formEle.validate(async valid => {
    if (valid) {
      loading.value = true
      const data = await login({
        username: loginForm.username,
        password: md5Encrypt(loginForm.password)
      })
      if (data.STATUS == '1') {
        sessionStorage.setItem('token', data.token)
        useToast({ message: 'success' })
        await router.push(redirectedFrom || '/index')
        loading.value = false
        closeToast()
      }
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.page {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

.login-box {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  right: 50%;
  width: 400px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  transform: translate3d(50%, -50%, 0);
}

.logo {
  text-align: center;
}

.login-button {
  display: block;
  flex: 1;
}
</style>
