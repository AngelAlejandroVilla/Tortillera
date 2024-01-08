<script  setup lang="ts">
import { watch } from '@vue/runtime-core'
import LayoutBlank from './LayoutBlank.vue'
import { markRaw, ref } from 'vue'
import { useRoute } from 'vue-router'

const layout = ref()
const route = useRoute()

watch(
  () => route.meta?.layout as string | undefined,
    async (metaLayout) => {
      try {
        const component = metaLayout && await import(`./${metaLayout}.vue`)
        layout.value = markRaw(component?.default || LayoutBlank)
      } catch (e) {
        layout.value = markRaw(LayoutBlank)
      }
    },
    { immediate: true }
)

</script>

<template>
  <component :is="layout"> <router-view></router-view>> </component>
</template>
