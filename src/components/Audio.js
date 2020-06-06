import React from "react";
import "../styles/audio.css";

const Audio = ({ audio, start, stop, id }) => {
  return (
    <div className="audio-container">
      {audio ? (
        <div>
          <audio controls>
            <source src={audio} type="audio/mpeg" />
          </audio>
        </div>
      ) : null}

      <div>
        <button onClick={() => start(id)}>Record</button>
        <button onClick={() => stop(id)}>Stop</button>
      </div>
    </div>
  );
};

export default Audio;
