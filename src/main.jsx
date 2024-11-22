import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BloodBankProvider } from "./context/BloodBankContext";
import { DonorProvider } from "./context/DonorContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BloodBankProvider><DonorProvider>
      <App />

      </DonorProvider></BloodBankProvider>
  </StrictMode>,
)
