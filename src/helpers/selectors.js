



export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((days) => days.name === day);
  const appointmentArray = [];

  if(state.appointments && filteredDays) {
    filteredDays.appointments.forEach((appointmentId) => appointmentArray.push(state.appointments[appointmentId]));
  }
  return appointmentArray;

}


