import { Compass, GraduationCap, MapPin } from 'lucide-react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { BentoCard } from './components/ui/BentoCard'
import { profile } from './data/profile'
import { useProjectDetails } from './hooks/useProjectDetails'
import { About } from './sections/About'
import { AdditionalInformation } from './sections/AdditionalInformation'
import { Contact } from './sections/Contact'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Expertise } from './sections/Expertise'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Resume } from './sections/Resume'
import { Skills } from './sections/Skills'

export function App() {
  const { t } = useTranslation()
  const {
    dialog,
    notice,
    open: openProjectDetails,
    close: closeProjectDetails,
  } = useProjectDetails()

  useEffect(() => {
    if (window.location.hash && window.scrollY === 0) {
      const target = document.getElementById(window.location.hash.slice(1))
      target?.scrollIntoView({ behavior: 'instant' })
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <a
          href="#home"
          className="sr-only z-30 rounded-lg bg-card px-4 py-3 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t('navigation.skip')}
        </a>
        <Navbar />
        <main
          id="home"
          tabIndex={-1}
          className="site-container grid grid-cols-1 gap-4 pt-5 pb-10 sm:gap-5 sm:pt-8 sm:pb-14 md:grid-cols-6 lg:grid-cols-12 lg:pt-10"
        >
          <Hero />

          <BentoCard
            title={t('profile.location.title')}
            icon={MapPin}
            className="p-5 sm:p-6 md:col-span-3 lg:col-span-3"
            staggerIndex={1}
          >
            <p className="mt-4 text-xl font-semibold tracking-tight">
              {t('profile.location.name', { city: profile.city })}
            </p>
            <p className="mt-1.5 leading-relaxed text-muted">
              {t('profile.location.description', { city: profile.city })}
            </p>
          </BentoCard>

          <BentoCard
            title={t('profile.education.title')}
            icon={GraduationCap}
            className="p-5 sm:p-6 md:col-span-3 lg:col-span-4"
            staggerIndex={2}
          >
            <p className="mt-4 text-xl font-semibold tracking-tight">
              {t('profile.education.university')}
            </p>
            <p className="mt-1.5 leading-relaxed text-muted">
              {t('profile.education.program')}
            </p>
            <p className="mt-1 text-sm text-muted">
              {t('profile.education.level')}
            </p>
          </BentoCard>

          <BentoCard
            title={t('profile.interests.title')}
            icon={Compass}
            className="p-5 sm:p-6 md:col-span-6 lg:col-span-5"
            staggerIndex={2}
          >
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.careerInterests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-sm font-medium text-primary"
                >
                  {t(`profile.interests.${interest}`)}
                </li>
              ))}
            </ul>
          </BentoCard>
          <About />
          <Expertise />
          <Skills />
          <Projects onDetails={openProjectDetails} />
          <Experience onProjectDetails={openProjectDetails} />
          <Education />
          <AdditionalInformation />
          <Resume />
          <Contact />
        </main>
        <Footer />
        <div
          role="status"
          aria-live="polite"
          className={
            notice
              ? 'pointer-events-none fixed inset-x-4 bottom-4 z-30 mx-auto w-fit max-w-[calc(100%-2rem)] rounded-xl border border-border bg-card px-4 py-3 text-sm text-primary shadow-lg'
              : 'sr-only'
          }
        >
          {notice === 'loading' && t('projects.loadingDetails')}
          {notice === 'error' && t('projects.detailsError')}
        </div>
        {dialog && (
          <dialog.Component
            project={dialog.project}
            onClose={closeProjectDetails}
          />
        )}
      </LazyMotion>
    </MotionConfig>
  )
}
