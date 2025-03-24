import './App.css'
import LandmarksTable from "./components/Table.component.tsx";
import {observer} from "mobx-react-lite";
import {store} from "./store/store.ts";

export const App = observer(() => {

  return (
    <>
      <h2>Кол-во достопримечательностей: { store.count }</h2>
      <LandmarksTable/>
    </>
  )
})

