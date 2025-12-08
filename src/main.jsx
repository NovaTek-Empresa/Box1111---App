import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

// Ponto de entrada: monta o app React na div #root
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
