import { BriefcaseBusiness, GitBranch, type LucideIcon } from 'lucide-react'

interface SocialPlatform {
  id: 'linkedin' | 'github'
  name: string
  url: string
  enabled: boolean
  username?: string
  icon: LucideIcon
}

export const contact = {
  email: 'ismail.gungor.work@gmail.com',
  openToWork: true,
  careerFocus: ['erp', 'software', 'it'],
} as const

export const emailHref = `mailto:${contact.email}`

export const socialPlatforms: readonly SocialPlatform[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ismail-g%C3%BCng%C3%B6r-3a305629a/',
    enabled: true,
    icon: BriefcaseBusiness,
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/ismailgungorr',
    username: 'ismailgungorr',
    enabled: true,
    icon: GitBranch,
  },
]
