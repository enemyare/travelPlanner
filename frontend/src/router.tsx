import {createBrowserRouter} from "react-router-dom";
import {App} from "./App.tsx";
import LandmarkForm from "./components/form/LandmarkForm.tsx";
import LandmarkDetail from "./components/detail/LandmarkDetail.tsx";


export const router = createBrowserRouter([
  {
    path: '/',
    element:  <App/>
  },
  {
    path: '/newlandmark',
    element: <LandmarkForm/>
  },
  {
    path: '/landmark/:id',
    element: <LandmarkDetail/>
  }
])