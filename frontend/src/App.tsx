import './App.css'
import LandmarksTable from "./components/table/LandmarksTable.tsx";
import {observer} from "mobx-react-lite";

export const App = observer(() => {

  return (
    <>
      <LandmarksTable/>
    </>
  )
})

