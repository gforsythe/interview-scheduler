import React from "react";
import DayListItem from "components/DayListItem";




export default function DayList(props) {

  // const [listData, setlistData] = useState([]);
  // const onButtonClick = function () {
  //   setlistData(data);
  // };
  // // Here's the star of our show so we'll put just before the curtain lifts
  // const mappedList = listData.map(item => {
  //   return <li key={item.id}>{item.text}</li>;
  // });

  const mappedList = props.days.map(day => {

    return(

      <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  />

    )
  });

  return(
    <ul > {mappedList} </ul>
  )
}
