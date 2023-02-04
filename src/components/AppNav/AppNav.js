import React from 'react';
import {hookContext} from '../../App.js';

export const AppNav = () => {
  const { setLocation } = React.useContext(hookContext);
  const handleClick = () => {
    const value = document.getElementById("searchLocale").value
    if (value.length > 1) {
      const linted = value.replaceAll(">","").replaceAll("<", "");
      setLocation(linted);
    }
  }
  return (
    <>
    <input 
    id="searchLocale" 
    type="text" 
    placeholder="Change Location"></input>
    
  <input className="searchButton" type="button" value="Search" onClick={handleClick} />
  </>
  )  
}