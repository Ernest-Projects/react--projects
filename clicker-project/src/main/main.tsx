import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Clicker from '../components/Clicker'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Clicker />
  </StrictMode>,
)
