import {observer} from "mobx-react-lite";
import {store} from "../../store/store.ts";
import {Alert} from "@gravity-ui/uikit";


const ErorrComponent  = observer(() =>{
  const {apiError: {message}} = store
  return (
    <>
      <Alert theme="danger" title="Ошибка" message={message} />
    </>
  )
})

export default ErorrComponent