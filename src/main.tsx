import './fonts.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { i18nReady } from './lib/i18n'
import './index.css'

function renderApp() {
  const root = document.getElementById('root')

  if (!root) {
    throw new Error('Missing application root.')
  }

  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void i18nReady.then(renderApp)
