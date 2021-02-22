import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const mappedList = props.interviewers.map((interviewer) => (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
  ));
  
  return (
    <section className="interviewers">
      <h4 className="interviewersheader text--light">Interviewer</h4>
      <ul className="interviewerslist">{mappedList}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
  setInterviewer: PropTypes.func.isRequired,

};
