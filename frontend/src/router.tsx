import {createBrowserRouter} from "react-router-dom";
import {App} from "./App.tsx";
import LandmarkForm from "./pages/form/LandmarkForm.tsx";
import LandmarkDetail from "./pages/detail/LandmarkDetail.tsx";


export const router = createBrowserRouter([
  {
    path: '/',
    element:
      <App/>
      ,
  },
  {
    path: '/newlandmark',
    element: <LandmarkForm/>
  },
  {
    path: '/updateLandmark/:id',
    element: <LandmarkForm/>
  },
  {
    path: '/landmark/:id',
    element: <LandmarkDetail/>
  }
])