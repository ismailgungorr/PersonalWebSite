import { useTranslation } from 'react-i18next'
import type { Technology } from '../../types/project'

interface TechnologyTagsProps {
  technologies: readonly Technology[]
}

export function TechnologyTags({ technologies }: TechnologyTagsProps) {
  const { t } = useTranslation()

  return (
    <ul className="flex flex-wrap gap-2">
      {technologies.map((technology) => (
        <li
          key={technology}
          className="rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-sm font-medium text-primary"
        >
          {t(`technologies.${technology}`)}
        </li>
      ))}
    </ul>
  )
}
