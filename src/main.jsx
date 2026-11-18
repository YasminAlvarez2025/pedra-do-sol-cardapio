import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const App = lazy(() => import('./App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div role="status" style={{ padding: 32 }}>Carregando TOKKA…</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
