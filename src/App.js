import React from 'react';
import './App.css';
import { NavBar } from './components/NavBar/NavBar.js';
import './components/NavBar/NavBar.css';
import { SmallContentBoxDate, SmallContentBoxImage, SmallContentBoxText } from './components/SmallContentBox/SmallContentBox.js'
import './components/SmallContentBox/SmallContentBox.css'
import { MainCont } from './components/MainCont/MainCont.js'
import axios from 'axios';

export const hookContext = React.createContext();
const App = () => {
  const [apiData, setApiData] = React.useState({});
  const [location, setLocation] = React.useState("V9A");
  const [unit, setUnit] = React.useState("c");
  React.useEffect(() => {
    (async () => {
      try{
        const api = process.env.REACT_APP_API_KEY;
        const { data } = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${api}&q=${location}&aqi=no`)
        console.log(data);
        setApiData(data);
      } catch(ex){
          console.log("uhoh, hotdog");
      }
  })();
},[location]);

  return (
    <hookContext.Provider value={{location, setLocation, apiData, unit, setUnit}}>
      <NavBar/>

      <MainCont temp={apiData.current?.temp_c || ""}>
        <div className={"topContent"}>
          <h1>{`${apiData.location?.name}, ${apiData.location?.country}` || "Loading..."}</h1>
          <p>Feels like: {unit === "c"
                          ? apiData.current?.temp_c || "" 
                          : apiData.current?.temp_f || ""}</p>
        </div>
        <div className={"subContent"}>
          <SmallContentBoxText content={`${apiData.location?.name}, ${apiData.location?.country}`} />
          <SmallContentBoxImage content={apiData.current?.condition.icon} />
          <SmallContentBoxDate content={apiData.location?.tz_id} />
        </div>
      </MainCont>
    </hookContext.Provider>
  );
}

export default App;
