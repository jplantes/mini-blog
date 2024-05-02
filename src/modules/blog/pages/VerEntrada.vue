<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import MdPreview from '../components/MdPreview.vue';

interface Entrada {
  titulo: string
  descripcion: string
  articulo: string
}

const db = getFirestore()
const route = useRoute()

const entrada = ref<Entrada>()

const verEntrada = async () => {

  const docRef = doc(db, 'entradas', route.params.id as string)

  try {
    const docSnap = await getDoc( docRef )
    entrada.value = docSnap.data() as Entrada
  } catch (error) {
    console.log(error)
  }
}

verEntrada()

</script>

<template>
  
  <div v-if="entrada" class="container">
    <h1>
      {{ entrada?.titulo }}
    </h1>
    <span>
      {{ entrada?.descripcion }}
    </span>

    <MdPreview :texto="entrada.articulo" />
  </div>

  <div v-else class="d-flex align-items-center justify-content-center">
    <div class="spinner-border mx-3" aria-hidden="true"></div>
    <strong>Cargando entrada...</strong>
  </div>
</template>

<style scoped>

</style>