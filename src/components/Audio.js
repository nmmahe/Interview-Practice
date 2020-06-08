import React from "react";
import "../styles/audio.css";
import Timer from "react-compound-timer";

const Audio = ({ audio, start, stop, id, recording }) => {
  const { blobURL, isRecording, isBlocked } = audio;
  return (
    <div className="audio-container">
      {audio.blobURL ? (
        <div>
          {/* <audio ref="audio" controls></audio> */}
          <audio data-id={id} controls>
            <source src={audio.blobURL} type="audio/mpeg" />
          </audio>
        </div>
      ) : null}

      <div>
        <Timer
          initialTime={55000}
          startImmediately={false}
          direction="backward"
          onStart={() => {
            console.log("onStart hook");
            start(id, isBlocked, audio);
          }}
          onStop={() => {
            console.log("onStop hook");
            stop(id, audio);
          }}
        >
          {({ start, resume, pause, stop, reset, timerState }) => (
            <React.Fragment>
              <div>
                <Timer.Minutes />:
                <Timer.Seconds />
              </div>
              {/* <div>{timerState}</div> */}
              <br />
              <div>
                <button onClick={start} disabled={isRecording}>
                  Record
                </button>
                {/* <button onClick={pause} disabled={!isRecording}>
                  Pause
                </button>
                <button onClick={resume}>Resume</button> */}
                <button onClick={stop} disabled={!isRecording}>
                  Stop
                </button>
                <button onClick={reset}>Reset</button>
              </div>
            </React.Fragment>
          )}
        </Timer>
      </div>
    </div>
  );
};

export default Audio;
