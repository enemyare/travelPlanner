import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './index.css'
import {ThemeProvider} from "@gravity-ui/uikit";
import {App} from "./App.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={"light"}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
