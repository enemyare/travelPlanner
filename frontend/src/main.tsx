import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './index.css'
import {ThemeProvider} from "@gravity-ui/uikit";
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={"light"}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
        </RouterProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
