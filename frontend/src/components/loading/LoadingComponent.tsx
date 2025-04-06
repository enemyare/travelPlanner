import {FC} from "react";
import {Spin} from "@gravity-ui/uikit";


const LoadingComponent: FC = () => {
  return (
    <>
      <div>
        <Spin/>
      </div>
    </>
  )
}

export default LoadingComponent;