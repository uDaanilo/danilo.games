import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { SkillGroup, TimelineItem } from '@/shared/types/portfolio'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isString = (value: unknown): value is string => typeof value === 'string'

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isString)

const isSkillGroup = (value: unknown): value is SkillGroup =>
  isRecord(value) && isString(value.title) && isStringArray(value.items)

const isSkillGroupArray = (value: unknown): value is SkillGroup[] =>
  Array.isArray(value) && value.every(isSkillGroup)

const isBadge = (value: unknown): value is { title: string; icon: string } =>
  isRecord(value) && isString(value.title) && value.icon !== undefined

const isBadgeArray = (value: unknown): value is { title: string; icon: string }[] =>
  Array.isArray(value) && value.every(isBadge)

const isTimelineItem = (value: unknown): value is TimelineItem =>
  isRecord(value) &&
  isString(value.title) &&
  (isString(value.description) || isStringArray(value.description)) &&
  value.stack !== undefined

const isTimelineItemArray = (value: unknown): value is TimelineItem[] =>
  Array.isArray(value) && value.every(isTimelineItem)

export const usePortfolioContent = () => {
  const { tm } = useI18n()

  const badges = computed(() => {
    const value = tm('portfolio.badges')
    return isBadgeArray(value) ? value : []
  })

  const skills = computed(() => {
    const value = tm('portfolio.skills')
    return isSkillGroupArray(value) ? value : []
  })

  const timeline = computed(() => {
    const value = tm('portfolio.timeline')
    return isTimelineItemArray(value) ? value : []
  })

  return {
    badges,
    skills,
    timeline
  }
}
