import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import SoundCloud from '../components/SoundCloud.tsx';

import {store} from "@redux-storage/store.ts";
// import { createBrowserRouter } from 'react-router-dom'

import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = "691382185332-umqnp5bgco0ro1p0vbff3t3ghd06ugbu.apps.googleusercontent.com";

// const router = createBrowserRouter([]);
createRoot(document.getElementById('root')!).render(
  
  <StrictMode>

    <Provider store = {store}>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    
    <SoundCloud />

    </GoogleOAuthProvider>
    </Provider> 
    
  </StrictMode>,
)
