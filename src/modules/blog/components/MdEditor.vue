<script setup lang="ts">
import { ref } from 'vue'

import { MdEditor, config } from 'md-editor-v3'
import ES_AR from 'md-editor-v3-i18-es-ar'
import 'md-editor-v3/lib/style.css'

const text = ref('# ¿De que vas a hablar hoy?')

config({
  editorConfig: {
    languageUserDefined: {
      'es_AR': ES_AR
    }
  }
})

const emit = defineEmits(['save'])


const onSave = () => {
  emit('save', text.value)
}

</script>

<template>
  <MdEditor
    v-model="text"
    language="es_AR"
    :preview="false"
    @on-save="onSave"
  />
</template>