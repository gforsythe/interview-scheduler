import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js";




const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  //myhook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function delAppointment() {

    transition(DELETING);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);

      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };


    //fixes bug when there is no interviewer selected or no name put in form and submission occurs
    // if (!interviewer || name.length === 0) {
    //   return console.log("whoopsie, something hapenned");

    // }

    

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });

  }
  return (
    <article   className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === ERROR_DELETE &&
        <Error
          message="Whoospie Error on Deleting"
          onClose={back}
        />}
      {mode === ERROR_SAVE &&
        <Error
          message="Whoopsie Error on Saving"
          onClose={back}
        />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && (
        <Status message="Saving"  />
      )}
      {mode === CONFIRM &&
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={delAppointment}
          onCancel={back}
        />}

      {mode === DELETING && <Status message="Deleting" />}
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
