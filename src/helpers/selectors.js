



export function getAppointmentsForDay(state, day) {
  //both work
  // const foundDay = state.days.find((days) => days.name === day);
  // const appointmentArray = [];

  // if (state.appointments && foundDay) {
  //   filteredDays.appointments.forEach((appointmentId) => appointmentArray.push(state.appointments[appointmentId]));
  // }
  // return appointmentArray;

  const foundDay = state.days.find((days) => days.name === day);
  if (state.days.length === 0 || foundDay === undefined) {
    return [];
  }
  return foundDay.appointments.map((id) => state.appointments[id]);

}




export function getInterview(state, interview) {
  // Otherwise, the function should return null.
  if (!interview) {
    return null;
  }
  // the interview data when we pass it an object that contains 
  // the interviewer. 
  const interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };

}



