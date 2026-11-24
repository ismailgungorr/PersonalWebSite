import { ImageOff } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ProjectImage } from '../../types/project'

interface ProjectMediaProps {
  image?: ProjectImage
  gallery?: boolean
}

export function ProjectMedia({ image, gallery = false }: ProjectMediaProps) {
  const { t } = useTranslation()
  const [failedSource, setFailedSource] = useState<string>()
  const showImage = image && image.src !== failedSource
  const illustration = showImage && image.kind === 'illustration'

  return (
    <figure
      className={`relative grid w-full place-items-center overflow-hidden bg-background/65 ${gallery ? 'rounded-xl border border-border' : 'border-b border-border'} ${gallery && image?.kind !== 'illustration' ? 'aspect-[4/3]' : 'aspect-[2/1]'}`}
    >
      {showImage ? (
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={t(image.altKey)}
          loading="lazy"
          decoding="async"
          onError={() => setFailedSource(image.src)}
          className={`absolute inset-0 size-full ${gallery || illustration ? 'object-contain' : 'object-cover object-top'}`}
        />
      ) : (
        <div className="profile-grid absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-2 px-3 text-center">
            <span className="grid size-12 place-items-center rounded-xl border border-accent/25 bg-card text-accent">
              <ImageOff size={20} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="rounded-md bg-background/90 px-2 py-1 font-mono text-sm text-muted">
              {t('projects.placeholder')}
            </span>
          </div>
        </div>
      )}
      {illustration && (
        <figcaption className="absolute bottom-2 start-2 max-w-[calc(100%-1rem)] rounded-md border border-border bg-background/90 px-2 py-1 text-xs leading-snug text-primary sm:bottom-3 sm:start-3 sm:text-sm">
          {t('projects.illustration')}
        </figcaption>
      )}
    </figure>
  )
}
