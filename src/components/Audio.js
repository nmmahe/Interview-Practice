import React from "react";
import "../styles/audio.css";

const Audio = ({ audio }) => {
  return (
    <div className="audio-container">
      <div>
        <audio controls>
          <source src={audio} type="audio/mpeg" />
        </audio>
      </div>
      <div>New Recording</div>
    </div>
  );
};

export default Audio;
