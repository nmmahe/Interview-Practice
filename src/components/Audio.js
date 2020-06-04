import React from "react";
import "../styles/audio.css";

const Audio = ({ audio }) => {
  return (
    <div className="audio-container">
      <div>
        <audio controls>
          <source
            src="https://www.w3schools.com/html/horse.mp3"
            type="audio/mpeg"
          />
        </audio>
      </div>
      <div>New Recording</div>
    </div>
  );
};

export default Audio;
