import {
  Braces,
  ChartNoAxesCombined,
  Database,
  Globe,
  Server,
  Wrench,
} from 'lucide-react'
import type { Technology } from '../types/project'

export const skillGroups = [
  {
    id: 'languages',
    icon: Braces,
    technologies: ['csharp', 'python', 'javascript', 'java', 'kotlin'],
  },
  {
    id: 'web',
    icon: Globe,
    technologies: [
      'aspnet',
      'entityFramework',
      'react',
      'node',
      'html5',
      'css3',
      'bootstrap',
      'rest',
    ],
  },
  {
    id: 'storage',
    icon: Database,
    technologies: ['sql', 'sqlServer', 'mysql', 'sqlite', 'blobs'],
  },
  {
    id: 'bigData',
    icon: Server,
    technologies: [
      'hadoop',
      'hive',
      'kafka',
      'pyspark',
      'ubuntu',
      'linux',
      'virtualbox',
    ],
  },
  {
    id: 'analysis',
    icon: ChartNoAxesCombined,
    technologies: ['pandas', 'selenium', 'nltk', 'sklearn'],
  },
  {
    id: 'tools',
    icon: Wrench,
    technologies: [
      'git',
      'github',
      'visualStudio',
      'vscode',
      'netlify',
      'swagger',
    ],
  },
] as const satisfies readonly {
  id: string
  icon: typeof Braces
  technologies: readonly Technology[]
}[]
