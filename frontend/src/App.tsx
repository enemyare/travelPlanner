import './App.css'
import LandmarksTable from "./pages/table/LandmarksTable.tsx";
import {observer} from "mobx-react-lite";

export const App = observer(() => {

  return (
    <>
      <LandmarksTable/>
    </>
  )
})

