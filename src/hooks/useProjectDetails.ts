import { useEffect, useRef, useState } from 'react'
import type { Project } from '../types/project'

type DetailsComponent =
  typeof import('../components/ui/ProjectDetails').ProjectDetails

export function useProjectDetails() {
  const [dialog, setDialog] = useState<{
    Component: DetailsComponent
    project: Project
  } | null>(null)
  const [notice, setNotice] = useState<'loading' | 'error' | null>(null)
  const cached = useRef<DetailsComponent | null>(null)
  const pending = useRef<AbortController | null>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)

  useEffect(() => () => pending.current?.abort(), [])

  async function open(project: Project, opener: HTMLButtonElement) {
    pending.current?.abort()
    trigger.current = opener

    if (cached.current) {
      setDialog({ Component: cached.current, project })
      setNotice(null)
      return
    }

    const request = new AbortController()
    pending.current = request
    const { signal } = request
    function cancel() {
      request.abort()
      setNotice(null)
    }
    const options = { signal }
    document.addEventListener('pointerdown', cancel, options)
    document.addEventListener('focusin', cancel, options)
    document.addEventListener(
      'keydown',
      (event) => {
        if (event.key === 'Escape' || event.key === 'Tab') cancel()
      },
      options,
    )
    window.addEventListener('hashchange', cancel, options)
    setNotice('loading')

    try {
      const { ProjectDetails } = await import('../components/ui/ProjectDetails')
      cached.current = ProjectDetails
      if (!signal.aborted) {
        if (opener.isConnected)
          setDialog({ Component: ProjectDetails, project })
        setNotice(null)
      }
    } catch {
      if (!signal.aborted) setNotice('error')
    } finally {
      request.abort()
    }
  }

  function close() {
    setDialog(null)
    trigger.current?.focus({ preventScroll: true })
  }

  return { dialog, notice, open, close }
}
