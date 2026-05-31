import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { Profile } from '@/shared/types/portfolio'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isString = (value: unknown): value is string => typeof value === 'string'

const isProfile = (value: unknown): value is Profile =>
  isRecord(value) &&
  isString(value.name) &&
  isString(value.role) &&
  isString(value.location) &&
  isString(value.tagline) &&
  isString(value.email) &&
  isString(value.github)

const emptyProfile: Profile = {
  name: '',
  role: '',
  location: '',
  tagline: '',
  email: '',
  github: '',
  linkedin: ''
}

export const useProfile = () => {
  const { tm } = useI18n()

  const profile = computed(() => {
    const value = tm('profile')
    return isProfile(value) ? value : emptyProfile
  })

  return {
    profile
  }
}
