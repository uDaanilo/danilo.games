export interface Profile {
  name: string
  role: string
  location: string
  tagline: string
  email: string
  github: string
  linkedin: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface TimelineItem {
  title: string
  description: string
  stack: Array<{ title: string; icon: string }>
}
