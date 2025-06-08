import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import type { PostApiAuthLogin200OneData } from '@/shared/api/client'

export const useSession = defineStore('session', () => {
  const user = useStorage<PostApiAuthLogin200OneData['user']>('user', null, sessionStorage, {
    serializer: {
      read: (v) => (v ? JSON.parse(v) : null),
      write: JSON.stringify,
    },
  })
  const token = useStorage<PostApiAuthLogin200OneData['token']>('token', null, sessionStorage)

  const isLoggedIn = computed(() => Boolean(user.value))

  const save = (loginData: PostApiAuthLogin200OneData) => {
    user.value = loginData.user
    token.value = loginData.token
  }

  const clear = () => {
    user.value = null
    token.value = null
  }

  return {
    user,
    token,
    isLoggedIn,
    save,
    clear,
  }
})
