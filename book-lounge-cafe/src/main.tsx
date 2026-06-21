import { createRoot } from 'react-dom/client'
import './app/styles/main.css'
import App from './app/app'
import { initFaro, reportWebVitals } from 'shared/lib/observability'

initFaro()
reportWebVitals()

createRoot(document.getElementById('root')!).render(
  <App />
)
