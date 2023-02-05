import React from 'react';
import {hookContext} from '../../App.js';

export const AppNav = () => {
  const { setLocation, unit, setUnit } = React.useContext(hookContext);
  const handleTempClick = () => setUnit(unit === "c" ? "f" : "c");
  const handleClick = () => {
    const value = document.getElementById("searchLocale").value
    if (value.length > 1) {
      const linted = value.replaceAll(">","").replaceAll("<", "");
      setLocation(linted);
    }
  }
  return (
    <>
      <input type="button" className="navBarButton" value={unit === "c" ? "°F" : "°C"} onClick={handleTempClick} />
      <input 
      id="searchLocale" 
      type="text" 
      placeholder="Change Location"></input>
      
      <input className="navBarButton" type="button" value="Search" onClick={handleClick} />
    </>
  )  
}