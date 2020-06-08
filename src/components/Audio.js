import React, { useState } from "react";
import "../styles/audio.css";
import Timer from "react-compound-timer";

const Audio = ({ audio, start, stop, id, recording }) => {
  const { blobURL, isRecording, isBlocked } = audio;
  const [time, setTime] = useState(() => 30000);

  return (
    <div className="audio-container">
      {audio.blobURL ? (
        <div>
          <audio data-id={id} controls>
            <source src={audio.blobURL} type="audio/mpeg" />
          </audio>
        </div>
      ) : null}

      <div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={time / 1000}
          // onChange={(e) => setTime(id, e.target.value)}
          onChange={(e) => {
            console.log(e.target.value);
            setTime(e.target.value * 1000);
          }}
          list="timesteplist"
        />
        <datalist id="timesteplist">
          <option>0</option>
          <option>30</option>
          <option>60</option>
          <option>90</option>
          <option>120</option>
        </datalist>
        <Timer
          key={time}
          initialTime={time}
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
                {time % 60000 <= 9999 && !isRecording ? 0 : null}
                <Timer.Seconds />
              </div>
              {/* <div>{timerState}</div> */}
              <br />
              <div>
                <button onClick={start} disabled={isRecording}>
                  Record
                </button>
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
