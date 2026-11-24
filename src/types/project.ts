import type tr from '../locales/tr.json'

export type Technology = keyof typeof tr.technologies

export type ProjectCategory =
  | 'web'
  | 'business'
  | 'bigData'
  | 'infrastructure'
  | 'data'
  | 'automation'
  | 'machineLearning'

export type ProjectStatus = 'active' | 'completed' | 'learning'
type ProjectContentKey = `projects.items.${string}`

export interface ProjectImage {
  kind: 'screenshot' | 'illustration'
  src: string
  width: number
  height: number
  altKey: ProjectContentKey
}

export interface Project {
  id: string
  slug: string
  titleKey: ProjectContentKey
  summaryKey: ProjectContentKey
  problemKey: ProjectContentKey
  solutionKey: ProjectContentKey
  featuresKeys: readonly ProjectContentKey[]
  technologies: readonly Technology[]
  categories: readonly ProjectCategory[]
  status: ProjectStatus
  featured: boolean
  liveUrl?: string
  githubUrl?: string
  images?: readonly ProjectImage[]
  imageNoteKey?: ProjectContentKey
  valueKey?: ProjectContentKey
}
