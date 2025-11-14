import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import SoundCloud from '../compontents/SoundCloud.tsx'

import {store} from "../redux/storages/store.ts"
// import { createBrowserRouter } from 'react-router-dom'

// const router = createBrowserRouter([]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Provider store = {store}>

    <SoundCloud />

    </Provider> 
    
  </StrictMode>,
)
