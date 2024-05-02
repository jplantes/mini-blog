<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword, type AuthError } from 'firebase/auth'

const auth = getAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const recorder = ref(false)
const isLoading = ref(false)

const errorLogin = ref('')

const emailStorage = localStorage.getItem('email')
if ( emailStorage ) {
  email.value = emailStorage
  recorder.value = true
}

const onLogin = async () => {
  if (email.value === '' && password.value === '') return
  
  try {
    isLoading.value = true
    await signInWithEmailAndPassword(auth, email.value, password.value)
    
    if (recorder.value) {
      localStorage.setItem('email', email.value)
    } else {
      localStorage.removeItem('email')
    }
    
    router.replace({ name: 'list-blog'})
  } catch (error) {
    const e = error as AuthError

    errorLogin.value = e.code
  } finally {
    isLoading.value = false
  }

}

</script>

<template>
  <div class="d-flex align-items-center py-5">
    <main class="form-signi m-auto mt-5">
      <form @submit.prevent="onLogin">
        <h1 class="h3 mb-3 fw-normal text-center">Bienvenidos</h1>

        <p v-if="errorLogin" class="py-2 text-center text-danger">{{ errorLogin }}</p>

        <div class="form-floating mt-3">
          <input v-model="email" type="email" class="form-control" id="floatingEmail" placeholder="nombre@gmail.com">
          <label for="floatingEmail">Email</label>
        </div>
        <div class="form-floating mt-3">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Contraseña">
          <label for="floatingPassword">Contraseña</label>
        </div>

        <div class="form-check text-start my-3">
          <input v-model="recorder" class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            Recordar usuario
          </label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit" :disabled="isLoading">Ingresar</button>

        <div class="text-center mt-3">
          <RouterLink :to="{ name: 'restore' }" >¿Olvidaste tu contraseña?</RouterLink>
        </div>
      </form>
    </main>  
  </div>
  
</template>

<style scoped>
main {
  width: 350px;
}
</style>