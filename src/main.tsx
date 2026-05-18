import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthInitializer from "./components/auth/AuthInitializer";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthInitializer>
      <App />
    </AuthInitializer>
  </StrictMode>,
)
