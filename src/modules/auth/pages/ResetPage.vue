<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const auth = getAuth()
auth.languageCode = 'es'

const router = useRouter()

const email = ref('')
const isLoading = ref(false)


const onReset = async () => {
  if (email.value === '') return

  try {
    isLoading.value = true
    await sendPasswordResetEmail(auth, email.value)
    router.push({ name: 'login' })
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="d-flex align-items-center py-5">
    <main class="form-signi m-auto mt-5">
      <form @submit.prevent="onReset">
        <h1 class="h3 mb-3 fw-normal text-center">Recuperar contraseña</h1>

        <div class="form-floating mt-3">
          <input v-model="email" type="email" class="form-control" id="floatingEmail" placeholder="nombre@gmail.com">
          <label for="floatingEmail">Email</label>
        </div>

        <button class="btn btn-primary w-100 py-2 mt-4" type="submit" :disabled="isLoading">Recuperar</button>
      </form>
    </main>  
  </div>
  
</template>

<style scoped>
main {
  width: 350px;
}
</style>