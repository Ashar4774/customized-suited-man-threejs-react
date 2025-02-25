import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ManWithSuit from './ManWithSuit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ManWithSuit />
  </StrictMode>,
)
