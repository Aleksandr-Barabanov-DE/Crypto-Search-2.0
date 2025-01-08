import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CryptoProvider } from './api/CryptoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </StrictMode>,
)
