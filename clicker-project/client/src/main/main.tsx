import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Clicker from '../components/Clicker'

console.log("Clicker component is loaded");
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Clicker />
  </StrictMode>
)
