import React from 'react';

export const SmallContentBoxDate = ({content}) =>  {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString('en-US', {"timeZone": content}));
  React.useEffect(()=>{
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', {"timeZone": content}));
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className={"smallContentBox-cont"}>
      <p>{time}</p>
    </div>
  )
}
export const SmallContentBoxText = ({content = ""}) =>  {
  return (
    <div className={"smallContentBox-cont"}>
      <p>{content}</p>
    </div>
  )
}
export const SmallContentBoxImage = ({content = "https://via.placeholder.com/100"}) =>  {
  return (
    <div className={"smallContentBox-cont"}>
      <img src={content} height={100} width={100} alt="weather icon" />
    </div>
  )
}