import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";




export default function Application(props) {
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
      
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      console.log("this is ALLLLLLLL", all);  

    setState(prevState => ({ 
      ...prevState, 
      days, 
      appointments, 
      interviewers }));
    });
  }, []);

  function cancelInterview (id) {

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
        setState({...state, appointments});
      });

  }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("+++++++++++ WHAT ARE YOU?!?!?++++++++", id, interview)
    const url = `/api/appointments/${id}`;
    return axios.put(url, {interview})
      .then(() => {
        setState({...state, appointments});
      });
  

  }

  //calling helpers
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const mappedAppointments = appointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}

      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {mappedAppointments}

        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
