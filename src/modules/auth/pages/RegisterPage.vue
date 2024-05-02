<script setup lang="ts">
import { ref } from 'vue'
import { createUserWithEmailAndPassword, getAuth, updateProfile, type User } from 'firebase/auth'
import { useRouter } from 'vue-router';


const auth = getAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const displayName = ref('')

const isLoading = ref(false)

const onRegister = async () => {
  if ( email.value === '' && password.value === '' && displayName.value === '' ) return


  
  try {
    isLoading.value = true
    await createUserWithEmailAndPassword(auth, email.value, password.value)

    const currentUser = auth.currentUser as User
    await updateProfile( currentUser, { displayName: displayName.value })

    router.push({ name: 'list-blog'})
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false
  }

}

</script>

<template>
  <div class="d-flex align-items-center py-5">
    <main class="form-signi m-auto mt-5">
      <form @submit.prevent="onRegister">
        <div class="form-floating mt-3">
          <input v-model="displayName" type="text" class="form-control" id="floatingName" placeholder="Nombre completo">
          <label for="floatingName">Nombre</label>
        </div>

        <div class="form-floating mt-3">
          <input v-model="email" type="email" class="form-control" id="floatingEmail" placeholder="nombre@gmail.com">
          <label for="floatingEmail">Email</label>
        </div>
        <div class="form-floating mt-3">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Contraseña">
          <label for="floatingPassword">Contraseña</label>
        </div>
        <button class="btn btn-primary w-100 py-2 mt-3" type="submit" :disabled="isLoading">Registrarme</button>
      </form>
    </main>
  </div>

</template>

<style scoped>
main {
  width: 350px;
}
</style>