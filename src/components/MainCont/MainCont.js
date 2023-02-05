import { hookContext } from "../../App"
import React from "react";

export const MainCont = ({...props}) => {
  const { apiData } = React.useContext(hookContext);
  React.useEffect(()=>{
    if(apiData.current?.temp_c){
      const clear = 13;       const cloudy = 10;
      const CloudyNight = 9;  const nightPartly = 5;
      const partly = 10;      const rainy = 1;
      const snow = 5;         const foggy = 2;
      const nightClear = 1;
      const rand = (num) => Math.ceil(Math.random() * num) + ".jpg";
      const image = "images/";
      const weather = apiData.current.condition.text;
      let backgroundImage;

      switch(true){     
        case (weather === ("Overcast" || "Cloudy") && (apiData.current.condition.icon).includes("night") ):
          backgroundImage = image + "CloudyNight/" + rand(CloudyNight)
          break;
        case (weather === "Partly cloudy" && (apiData.current.condition.icon).includes("night") ):
          backgroundImage = image + "NightPartly/" + rand(nightPartly)
          break;
        case (weather.includes("rain") || weather.includes("hail")):
          backgroundImage = image + "Rainy/" + rand(rainy);
          break;
        case (weather.includes("fog") || weather.includes("Fog")):
          backgroundImage = image + "Foggy/" + rand(foggy);
          break;
        case (weather.includes("snow")):
          backgroundImage = image + "Snow/" + rand(snow);
          break;
        case (weather === "Sunny"):
          backgroundImage = image + "Clear/" + rand(clear);
          break;
        case (weather === "clear"):
          backgroundImage = image + "NightClear/" + rand(nightClear);
          break;
        case (weather === ("Cloudy" || "Overcast")):
          backgroundImage = image + "Cloudy/" + rand(cloudy);
          break;
        case (weather === "Partly cloudy"):
          backgroundImage = image + "Partly/" + rand(partly);
          break;
        default:
          backgroundImage =  image + "NightPartly/" + rand(nightPartly);
      }
      document.getElementsByClassName('main-cont')[0].style.backgroundImage = `url('${backgroundImage}')`; 
    } 
  },[apiData])
  return (
    <div className="main-cont">
      {props.children}
    </div>
  )
}