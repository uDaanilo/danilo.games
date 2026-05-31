<template>
  <main>
    <div class="desktop">
      <LocaleSwitcher />
      <HeroWindow />
      <AboutWindow />
      <TimelineWindow />
      <ContactWindow />
    </div>
  </main>
</template>

<script setup lang="ts">
import AboutWindow from '@/widgets/about/ui/AboutWindow.vue'
import ContactWindow from '@/widgets/contact/ui/ContactWindow.vue'
import HeroWindow from '@/widgets/hero/ui/HeroWindow.vue'
import TimelineWindow from '@/widgets/timeline/ui/TimelineWindow.vue'
import LocaleSwitcher from '@/shared/ui/LocaleSwitcher.vue'
</script>

<style scoped>
.desktop {
  padding: 32px 24px 96px;
  max-width: 1100px;
  margin: 0 auto;
}

@media (max-width: 720px) {
  .desktop {
    padding: 20px 16px 96px;
  }
}
</style>
