<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const isLogued = ref(false)

onAuthStateChanged(
  getAuth(),
  user => user ? isLogued.value = true : isLogued.value = false
)

const onLogOut = async () => {
  await getAuth().signOut()
  router.push({ name: 'list-blog'})
}

</script>

<template>
  <header
    class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <div class="col-md-3 mb-2 mb-md-0 px-3">
      <RouterLink :to="{name: 'list-blog'}" class="d-inline-flex link-body-emphasis text-decoration-none">
        <h4>Mini Blog</h4>
      </RouterLink>
    </div>

    <ul v-if="isLogued" class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li><RouterLink :to="{name: 'editor-blog'}" class="nav-link px-2">Nueva entrada</RouterLink></li>
      <li><RouterLink :to="{name: 'register'}" class="nav-link px-2">Crear Usuario</RouterLink></li>
    </ul>

    <div class="col-md-3 text-end">
      <RouterLink v-if="!isLogued" :to="{ name: 'login' }" class="btn btn-outline-primary me-2">Ingresar</RouterLink>
      <button v-else @click="onLogOut" class="btn btn-outline-danger me-2">Salir</button>
    </div>
  </header>
</template>

<style scoped></style>