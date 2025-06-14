import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Root.module.scss'
import PET from '../components/main/Main.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PET />
  </StrictMode>,
)
