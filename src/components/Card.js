import React from "react";
import "../styles/card.css";
import Question from "./Question";
import Stats from "./Stats";
import Audio from "./Audio";

const Card = (props) => {
  const { card, handleDetails } = props;
  const { id, question, stats, audio, hidden } = card;
  return (
    <div className="card">
      <Question question={question}></Question>
      <div>hidden: {hidden}</div>
      {hidden ? null : (
        <>
          <Stats stats={stats}></Stats>
          <Audio audio={audio}></Audio>
        </>
      )}

      <div>
        <button onClick={() => handleDetails(id)}>Click Me</button>
      </div>
    </div>
  );
};
export default Card;
