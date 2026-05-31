<template>
  <Window :title="t('about.title')">
    <p v-for="body of t('about.body').split('\n')" :key="body">{{ body }}</p>
    <div class="field-row nav-strip">
      <button type="button" @click="jumpTo('timeline')">{{ t('about.nav.timeline') }}</button>
      <button type="button" @click="jumpTo('contact')">{{ t('about.nav.contact') }}</button>
    </div>
  </Window>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import Window from '@/shared/ui/Window.vue'

const { t } = useI18n()

const jumpTo = (id: string) => {
  if (typeof window === 'undefined') {
    return
  }
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  window.location.hash = `#${id}`
}
</script>

<style scoped>
.nav-strip {
  flex-wrap: wrap;
  gap: 6px;
  margin: 16px 0 0;
}
</style>
