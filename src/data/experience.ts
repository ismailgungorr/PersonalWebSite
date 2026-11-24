import type { Technology } from '../types/project'
import type { ProjectId } from './projects'

interface ExperienceEntry {
  id: 'researchInternship' | 'hospitality'
  responsibilities: readonly string[]
  period?: { start: string; end: string }
  technologies?: readonly Technology[]
  competencies?: readonly string[]
  relatedProjects?: readonly ProjectId[]
}

export const experienceEntries: readonly ExperienceEntry[] = [
  {
    id: 'researchInternship',
    responsibilities: ['cluster', 'systems', 'tools', 'teamwork', 'reporting'],
    period: { start: '2025-02', end: '2025-06' },
    technologies: [
      'hadoop',
      'ubuntu',
      'hive',
      'kafka',
      'pyspark',
      'python',
      'selenium',
    ],
    relatedProjects: ['hadoop', 'yok-academic-crawler'],
  },
  {
    id: 'hospitality',
    responsibilities: ['orders', 'coordination', 'operations'],
    competencies: [
      'billing',
      'operations',
      'orders',
      'teamwork',
      'communication',
    ],
  },
]
