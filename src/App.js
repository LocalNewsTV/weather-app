import React from 'react';
import './App.css';
import { NavBar } from './components/NavBar/NavBar.js';
import './components/NavBar/NavBar.css';
import { SmallContentBoxDate, SmallContentBoxImage, SmallContentBoxText } from './components/SmallContentBox/SmallContentBox.js';
import './components/SmallContentBox/SmallContentBox.css';
import { MainCont } from './components/MainCont/MainCont.js';
import './components/MainCont/MainCont.css';
import axios from 'axios';

export const hookContext = React.createContext();
const App = () => {
  const [apiData, setApiData] = React.useState({});
  const [location, setLocation] = React.useState("");
  const [unit, setUnit] = React.useState("c");
  React.useEffect(() => {
    (async () => {
      const locationLatLong = {};
      try{
        navigator.geolocation.getCurrentPosition((position)=>{
            locationLatLong.lat = (position.coords.latitude).toFixed(4)
            locationLatLong.long = (position.coords.longitude).toFixed(4)
            localStorage.setItem("LastSearchLocale", `${locationLatLong.lat},${locationLatLong.long}`)
            setLocation(`${locationLatLong.lat},${locationLatLong.long}`);
          });

        if(!location && localStorage.getItem("LastSearchLocale")){
          setLocation(localStorage.getItem("LastSearchLocale"))
        }
        else if(locationLatLong === {}){
          const defaultLoc = "Victoria";
          setLocation(defaultLoc)
          localStorage.setItem("LastSearchLocale", defaultLoc)
        }
      } catch(ex){
          console.log(ex);
      }
    })();
  },);
  //Makes page refresh every 5 minutes
  React.useEffect(() => {
    const interval = setInterval((async () => {
      try{
        const { data } = await axios.post(`https://localnewstv-todo.onrender.com/api/weather`,{ location: location}
        )
        setApiData(data);
      } catch(ex){
          console.log(ex);
      }
  }), (5 * 60 * 1000));
  return () => clearInterval(interval);
});

//Update render when new area searched
  React.useEffect(() => {
    (async () => {
      try{
        if(location){
        const { data } = await axios.post(`https://localnewstv-todo.onrender.com/api/weather`,{ location: location}
        )
        setApiData(data);
        }
      } catch(ex){
          console.log(ex);
      }
  })();
},[location]);

  return (
    <hookContext.Provider value={{location, setLocation, apiData, unit, setUnit}}>
      <NavBar/>
      <MainCont temp={apiData.current?.temp_c || ""}>
        <div className={"topContent"}>
          <h2 className={"location"}>{apiData.location?.name ? `${apiData.location?.name}, ${apiData.location?.country}` : "Loading..."}</h2>
          <p>Feels like: {unit === "c"
                          ? `${apiData.current?.feelslike_c || 0.0}°C` 
                          : `${apiData.current?.feelslike_f || 0.0}°F`}</p>
        </div>
        <div className={"subContent"}>
          <SmallContentBoxText 
            content={unit === "c" 
                     ? `${apiData.current?.temp_c || 0.0}°C` 
                     : `${apiData.current?.temp_f || 0.0}°F`} />
          <SmallContentBoxImage content={apiData.current?.condition.icon} />
          <SmallContentBoxDate content={apiData.location?.tz_id}/>
        </div>
      </MainCont>
    </hookContext.Provider>
  );
}

export default App;
