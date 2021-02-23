import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {

    const daysURL = "/api/days";
    const appointmentsURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";


    //API Get requests
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)

    ]).then((all) => {
      console.log("WHAT ARE YOU!!!!!!!!!!!!!", all);

      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      // console.log("this is ALLLLLLLL", all);  

      return setState(prevState => ({
        ...prevState,
        days,
        appointments,
        interviewers
      }));
    })
      .catch(error => console.log(error));
  }, []);


  const getSpotsForDay = function (day, appointments) {
    let spots = 0;
    //count the appointments that have null interviews
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    return spots;

  };

  const updateSpots = function (dayName, days, appointments) {
    //find the day object
    const day = days.find(d => d.name === dayName);

    const spots = getSpotsForDay(day, appointments);


    return days.map(item => item.name === dayName ? { ...day, spots } : item);

  };


  const cancelInterview = function (id) {

    //use id to find right appointment slot and set interview => null

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const url = `/api/appointments/${id}`;
    return axios.delete(url)
      .then(() => {
        const days = updateSpots(state.day, state.days, appointments);
        setState({ ...state, appointments, days });
      });


  };

  const bookInterview = function (id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // console.log("+++++++++++ WHAT ARE YOU?!?!?++++++++", id, interview);
    const url = `/api/appointments/${id}`;
    return axios.put(url, { interview })
      .then(() => {
        const days = updateSpots(state.day, state.days, appointments);
        setState({ ...state, appointments, days });
      });

  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}