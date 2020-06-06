import React from "react";
import Card from "./Card";
import "../styles/cardcontainer.css";

const CardContainer = (props) => {
  //For some reason, props needs to be destructured here
  //rather than in the parameter passed above.
  //Gives typeerror for function passed through mapping if not done this way...
  const { interviewData, handleDetails, start, stop } = props;
  const cards = interviewData.map((card) => {
    return (
      <Card
        key={card.id}
        card={card}
        handleDetails={handleDetails}
        start={start}
        stop={stop}
      />
    );
  });
  return <div className="card-container">{cards}</div>;
};

export default CardContainer;
