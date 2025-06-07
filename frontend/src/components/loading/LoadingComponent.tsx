import {FC} from "react";
import {Spin} from "@gravity-ui/uikit";


const LoadingComponent: FC = () => {
  return (
    <>
      <div className={"loading-container"}>
        <Spin/>
      </div>
    </>
  )
}

export default LoadingComponent;