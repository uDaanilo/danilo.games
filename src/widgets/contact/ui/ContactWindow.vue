<template>
  <Window id="contact" :title="t('contact.title')">
    <fieldset class="contact-card">
      <legend>{{ t('contact.pingTitle') }}</legend>
      <div class="field-row">
        <span class="contact-label"><MailIcon />{{ t('contact.emailLabel') }}:</span>
        <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
      </div>
      <div class="field-row">
        <span class="contact-label"><GithubIcon />{{ t('contact.githubLabel') }}:</span>
        <a :href="profile.github" target="_blank" rel="noreferrer">{{ profile.github }}</a>
      </div>
      <div class="field-row">
        <span class="contact-label"><LinkedinIcon />{{ t('contact.linkedinLabel') }}:</span>
        <a :href="profile.linkedin" target="_blank" rel="noreferrer">{{ profile.linkedin }}</a>
      </div>
    </fieldset>
  </Window>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GithubIcon from '~icons/dinkie-icons/github'
import LinkedinIcon from '~icons/pixel/linkedin'
import MailIcon from '~icons/pixelarticons/mail-sharp'

import { useProfile } from '@/entities/profile/model/profile'
import Window from '@/shared/ui/Window.vue'

const { t } = useI18n()
const { profile } = useProfile()
</script>

<style scoped>
.contact-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-label {
  min-width: 60px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.blink {
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%,
  45% {
    opacity: 1;
  }
  55%,
  100% {
    opacity: 0.4;
  }
}
</style>
