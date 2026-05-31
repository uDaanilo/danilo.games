<template>
  <div class="locale-switcher field-row">
    <label for="locale-select">{{ t('app.languageLabel') }}</label>
    <select id="locale-select" :value="locale" @change="onChange">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import {
  LOCALE_STORAGE_KEY,
  SUPPORTED_LOCALES,
  isSupportedLocale
} from '@/app/i18n'

const { locale, t } = useI18n()

const options = computed(() =>
  SUPPORTED_LOCALES.map((value) => ({
    value,
    label: t(`locales.${value}`)
  }))
)

const onChange = (event: Event) => {
  const target = event.target
  if (!(target instanceof HTMLSelectElement)) {
    return
  }

  const nextLocale = target.value
  if (!isSupportedLocale(nextLocale)) {
    return
  }

  locale.value = nextLocale
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
  }
}
</script>

<style scoped>
.locale-switcher {
  color: #ddd;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 16px;
}
</style>
