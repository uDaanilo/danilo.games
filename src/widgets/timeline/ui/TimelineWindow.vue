<template>
  <Window id="projects" :title="t('timeline.title')" body-class="section-grid">
    <fieldset v-for="project in timeline" :key="project.title" class="timeline-card">
      <legend>{{ project.title }}</legend>
      <ul v-if="Array.isArray(project.description)" class="description-list">
        <li v-for="item in project.description" :key="item">{{ item }}</li>
      </ul>
      <p v-else>{{ project.description }}</p>

      <div class="stack-list">
        <span
          v-for="tech in project.stack"
          :title="tech.title"
        >
          <component
            :is="tech.icon"
            :key="tech.title"
            class="stack-icon"
          />
        </span>
      </div>
    </fieldset>
  </Window>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { usePortfolioContent } from '@/entities/portfolio/model/content'
import Window from '@/shared/ui/Window.vue'

const { t } = useI18n()
const { timeline } = usePortfolioContent()
</script>

<style scoped>
.timeline-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
}

.stack-list {
  margin-top: 1rem;
  display: flex;
  gap: 8px;
  padding-left: 1rem;
}

.stack-list span {
  display: flex;
  gap: 0.5rem;
}

.description-list {
  padding-left: 1rem;
  margin: 0;
}

.description-list li:not(:last-child) {
  margin-bottom: 0.5rem;
}
</style>
