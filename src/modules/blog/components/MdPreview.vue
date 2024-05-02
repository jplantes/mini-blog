<script setup lang="ts">

import { MdPreview, config } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import ES_AR from 'md-editor-v3-i18-es-ar'
import { defineProps, ref } from 'vue';

config({
  editorConfig: {
    languageUserDefined: {
      'es_AR': ES_AR
    }
  }
})

const props = defineProps<{
  texto: string
}>()

const text = ref('')

if( props.texto ){
  text.value = props.texto
}

</script>

<template>
  <MdPreview language="es_AR" :model-value="text" />
</template>

<style scoped>

</style>