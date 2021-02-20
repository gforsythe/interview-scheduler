



export function getAppointmentsForDay(state, day) {
  //both work
  // const foundDay = state.days.find((days) => days.name === day);
  // const appointmentArray = [];

  // if (state.appointments && foundDay) {
  //   filteredDays.appointments.forEach((appointmentId) => appointmentArray.push(state.appointments[appointmentId]));
  // }
  // return appointmentArray;

//refactored
  const foundDay = state.days.find((days) => days.name === day);
  if (state.days.length === 0 || foundDay === undefined) {
    return [];
  }
  return foundDay.appointments.map((id) => state.appointments[id]);

}




export function getInterview(state, interview) {
  //  the function should return null if no interview is there
  if (!interview) {
    return null;
  }
  // otherwise, the interview data when we pass it an object that contains 
  // the interviewer. 
  const interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };

}



export function getInterviewersForDay(state, day) {


//refactored
  const foundDay = state.days.find((days) => days.name === day);
  if (state.days.length === 0 || foundDay === undefined) {
    return [];
  }
  return foundDay.interviewers.map((id) => state.interviewers[id]);

}



  //both work
  // const foundDay = state.days.find((days) => days.name === day);
  // const appointmentArray = [];

  // if (state.appointments && foundDay) {
  //   filteredDays.appointments.forEach((appointmentId) => appointmentArray.push(state.appointments[appointmentId]));
  // }
  // return appointmentArray;