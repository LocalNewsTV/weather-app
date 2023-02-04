import React from 'react';
import './App.css';
import { NavBar } from './components/NavBar/NavBar.js';
import './components/NavBar/NavBar.css';
import { SmallContentBoxDate, SmallContentBoxImage, SmallContentBoxText } from './components/SmallContentBox/SmallContentBox.js'
import './components/SmallContentBox/SmallContentBox.css'

export const hookContext = React.createContext();
function App() {
  const [location, setLocation] = React.useState("V9A");
  return (
    <hookContext.Provider value={{location, setLocation}}>
      <NavBar/>
      <div className="main-cont">
        <div className={"topContent"}>

        </div>
        <div className={"subContent"}>
          <SmallContentBoxText content={"Hello World"} />
          <SmallContentBoxImage content={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1280px-Google_Images_2015_logo.svg.png"} />
        </div>
      </div>
    </hookContext.Provider>
  );
}

export default App;
