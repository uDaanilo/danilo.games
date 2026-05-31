<template>
  <Window :title="t('hero.windowTitle', { name: profile.name })">
    <div class="hero-body">
      <div class="hero-text hero-content">
        <div class="hero-summary">
          <h1>{{ profile.name }}</h1>
          <p><strong>{{ profile.role }}</strong> • {{ profile.location }}</p>
          <p>{{ profile.tagline }}</p>

          <div class="badge-row">
            <span v-for="badge in badges" :key="badge.title" class="badge">
              <component
                :is="badge.icon"
                class="badge-icon"
                aria-hidden="true"
              />
              <span>{{ badge.title }}</span>
            </span>
          </div>
        </div>

        <div class="field-row cta-row">
          <button type="button" @click="openEmail">{{ t('hero.cta.email') }}</button>
        </div>
      </div>

      <div class="mascot-card">
        <Mascot />
      </div>
    </div>
  </Window>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { usePortfolioContent } from '@/entities/portfolio/model/content'
import { useProfile } from '@/entities/profile/model/profile'
import Mascot from '@/shared/ui/Mascot.vue'
import Window from '@/shared/ui/Window.vue'

const { t } = useI18n()
const { profile } = useProfile()
const { badges } = usePortfolioContent()

const openEmail = () => {
  if (typeof window === 'undefined') {
    return
  }

  window.location.href = `mailto:${profile.value.email}`
}
</script>

<style scoped>
.hero-body {
  display: grid;
  gap: 20px;
  grid-template-columns: auto minmax(200px, 300px);
  align-items: center;
}

@media (max-width: 1079px) {
  .hero-body {
    grid-template-columns: 1fr;
  }
}

.hero-text h1 {
  margin: 0 0 8px;
  font-size: 32px;
}

.hero-text p {
  margin: 0 0 16px;
  line-height: 1.5;
}

.hero-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hero-summary {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.badge {
  background: var(--button-face);
  box-shadow: var(--border-raised-outer), var(--border-raised-inner);
  padding: 2px 8px;
  font-size: 11px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.badge:first-child {
  padding-left: 0;
}

.badge-icon {
  width: 14px;
  height: 14px;
}

.cta-row {
  flex-wrap: wrap;
  gap: 6px;
}

.mascot-card {
  background: var(--button-highlight);
  box-shadow: var(--border-sunken-outer), var(--border-sunken-inner);
  text-align: center;
  overflow: hidden;
}

.mascot-caption {
  font-size: 12px;
  color: #475066;
  margin-top: 8px;
}
</style>
