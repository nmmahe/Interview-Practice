import React from "react";
import "../styles/audio.css";

const Audio = ({ audio, start, stop, id, recording }) => {
  const { blobURL, isRecording, isBlocked } = audio;
  return (
    <div className="audio-container">
      {audio.blobURL ? (
        <div>
          {/* <audio ref="audio" controls></audio> */}
          <audio controls>
            <source src={audio.blobURL} type="audio/mpeg" />
          </audio>
        </div>
      ) : null}

      <div>
        <button
          onClick={() => start(id, isBlocked, audio)}
          disabled={isRecording}
        >
          Record
        </button>
        <button onClick={() => stop(id, audio)} disabled={!isRecording}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default Audio;
