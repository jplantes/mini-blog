<script setup lang="ts">
import { useBlog } from '../composables/useBlog'
const { entradas, isLogued, obtenerEntradas, navegar, eliminar } = useBlog()


obtenerEntradas()

</script>

<template>
  <div v-if="entradas.length > 0" class="container">
    <div
      v-for="entrada in entradas"
      :key="entrada.id"
      class="card w-100 mb-3 cursor">
      <div @click="navegar(entrada.id)" class="card-body">
        <h5 class="card-title">{{ entrada.titulo }}</h5>
        <p class="card-text">{{ entrada.descripcion }}</p>
      </div>
      <div v-if="isLogued" class="p-3">
        <button @click="eliminar( entrada.id )" class="btn btn-danger">
          Eliminar
        </button>
      </div>
    </div>
  </div>

  <div v-else class="d-flex align-items-center justify-content-center">
    <div class="spinner-border mx-3" aria-hidden="true"></div>
    <strong>Cargando entradas...</strong>
  </div>

</template>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>