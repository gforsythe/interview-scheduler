import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";




const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  //myhook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function delAppointment() {
    transition(DELETING);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      });
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };


    //fixes bug when there is no interviewer selected or no name put in form and submission occurs
    if (!interviewer || name.length === 0) {
      return console.log("whoopsie, something hapenned");

    }

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {

        transition(SHOW);
      });

  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && (
        <Status message="SAVING" />
      )}
      {mode === CONFIRM &&
        <Confirm
          message={"Delete the appointment?"}
          onConfirm={delAppointment}
          onCancel={back}
        />}

      {mode === DELETING && <Status message="DELETING" />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === EDIT &&
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
    </article>
  );
}
