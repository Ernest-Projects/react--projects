import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import SoundCloud from '../components/SoundCloud.tsx';

import {store} from "@redux-storage/store.ts";
// import { createBrowserRouter } from 'react-router-dom'

import { GoogleOAuthProvider } from '@react-oauth/google';
import {router} from "../router/router.tsx";
import { RouterProvider } from 'react-router-dom';


// const router = createBrowserRouter([]);
createRoot(document.getElementById('root')!).render(
  
  <StrictMode>


    <Provider store = {store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>  
    
    <RouterProvider router = {router}/>

    </GoogleOAuthProvider>
    </Provider> 
    
  </StrictMode>,
)
