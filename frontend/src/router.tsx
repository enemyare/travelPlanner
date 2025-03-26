import {createBrowserRouter} from "react-router-dom";
import {App} from "./App.tsx";
import LandmarksForm from "./components/LandmarksForm.tsx";


export const router = createBrowserRouter([
  {
    path: '/',
    element:  <App/>
  },
  {
    path: '/newlandmark',
    element: <LandmarksForm/>
  }
])