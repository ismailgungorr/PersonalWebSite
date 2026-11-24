import {
  BriefcaseBusiness,
  Car,
  Gauge,
  Languages,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BentoCard } from '../components/ui/BentoCard'
import { profile } from '../data/profile'

const information = [
  { id: 'military', icon: ShieldCheck },
  { id: 'license', icon: Car },
  { id: 'driving', icon: Gauge },
  { id: 'travel', icon: BriefcaseBusiness },
  { id: 'language', icon: Languages },
  { id: 'location', icon: MapPin },
] as const

export function AdditionalInformation() {
  const { t } = useTranslation()

  return (
    <section
      id="additional-information"
      aria-labelledby="additional-information-heading"
      className="col-span-full mt-10 sm:mt-14"
    >
      <h2
        id="additional-information-heading"
        className="mb-5 text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {t('additionalInformation.title')}
      </h2>
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {information.map(({ id, icon }, index) => (
          <BentoCard
            key={id}
            headingLevel="h3"
            title={t(`additionalInformation.items.${id}.title`)}
            description={
              id === 'location'
                ? t('profile.location.name', { city: profile.city })
                : t(`additionalInformation.items.${id}.description`)
            }
            icon={icon}
            className="p-5 sm:p-6"
            revealOnScroll
            staggerIndex={index}
          />
        ))}
      </div>
    </section>
  )
}
