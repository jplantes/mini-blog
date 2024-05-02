<script setup lang="ts">
import MdEditor from '../components/MdEditor.vue'
import { useBlog } from '../composables/useBlog'

const { isSave, titulo, descripcion , guardar } = useBlog()
</script>

<template>

  <div class="container">
    <div v-if="isSave" class="d-flex align-items-center justify-content-center">
      <div class="spinner-border mx-3" aria-hidden="true"></div>
      <strong>Guardando entrada...</strong>
    </div>
    
    <div>
      <label for="titulo" class="form-label">Titulo</label>
      <input v-model="titulo" id="titulo" class="form-control" type="text">
    </div>

    <div class="my-4">
      <label for="descripcionCorta" class="form-label">Descripción corta</label>
      <input v-model="descripcion" id="descripcionCorta" class="form-control" type="text">
    </div>

    <MdEditor @save="guardar" />

    <div class="my-5 text-center">
      <button class="btn btn-danger">
        Cancelar
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>