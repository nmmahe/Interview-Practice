import React from "react";
import "../styles/card.css";
import Question from "./Question";
import Stats from "./Stats";
import Audio from "./Audio";

const Card = (props) => {
  const {
    card,
    handleDetails,
    start,
    stop,
    recording,
    handleConfidence,
  } = props;
  const { id, question, stats, audio, hidden } = card;
  return (
    <div className="card">
      <Question question={question}></Question>
      <div>{hidden}</div>
      {hidden ? null : (
        <>
          <Stats
            stats={stats}
            handleConfidence={handleConfidence}
            id={id}
          ></Stats>
          <Audio
            key={audio.blobURL}
            audio={audio}
            start={start}
            stop={stop}
            id={id}
            recording={recording}
          ></Audio>
        </>
      )}

      <div>
        <button onClick={() => handleDetails(id)}>Click Me</button>
      </div>
    </div>
  );
};
export default Card;
