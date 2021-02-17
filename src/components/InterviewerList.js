import React from "react";
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss";




export default function InterviewerList(props){

  const mappedList = props.interviewers.map(interviewer => {
    return(
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name} 
        avatar={interviewer.avatar} 
        selected={interviewer.id === props.interviewer}
        setInterviewer={ () => props.setInterviewer(interviewer.id)}
        />
    );
  });
    return(

      <section className="interviewers">
      <h4 className="interviewersheader text--light">Interviewer</h4>
      <ul className="interviewerslist">{mappedList}</ul>
    </section>


    )
}


