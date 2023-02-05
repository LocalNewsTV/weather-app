import { hookContext } from "../../App"
import React from "react";

export const MainCont = ({...props}) => {
  const { apiData } = React.useContext(hookContext);
  return (
    <div className="main-cont">
      {props.children}
    </div>
  )
}