
export const SmallContentBoxDate = ({content}) =>  {
  return (
    <div className={"smallContentBox-cont"}>
      <img src={content} alt="weather icon" />
    </div>
  )
}
export const SmallContentBoxText = ({content}) =>  {
  return (
    <div className={"smallContentBox-cont"}>
      <p>{content}</p>
    </div>
  )
}
export const SmallContentBoxImage = ({content}) =>  {
  return (
    <div className={"smallContentBox-cont"}>
      <img src={content} height={100} width={100} alt="weather icon" />
    </div>
  )
}