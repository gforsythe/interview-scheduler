import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const updateState = function () {
    const daysURL = "/api/days";
    const appointmentsURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";


    //API Get requests
    return Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)

    ]).then((all) => {

      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      // console.log("this is ALLLLLLLL", all);  

      setState(prevState => ({
        ...prevState,
        days,
        appointments,
        interviewers
      }));
    });

  };

  useEffect(() => {
    updateState();


  }, []);

  const setDay = day => setState({ ...state, day });

  

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
        setState({ ...state, appointments });
      })
      .then(() => {
        return updateState();
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
    console.log("+++++++++++ WHAT ARE YOU?!?!?++++++++", id, interview);
    const url = `/api/appointments/${id}`;
    return axios.put(url, { interview })
      .then(() => {
        setState({ ...state, appointments });
      })
      .then(() => {
        return updateState();
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}