import React, { useState, useEffect, useMemo } from "react";
import "./styles/app.css";
import Circle from "./components/Circle";
import CardContainer from "./components/CardContainer";
import ModalForm from "./components/ModalForm";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import MicRecorder from "mic-recorder-to-mp3";
//style for the modal
const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
var subtitle;

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const App = () => {
  //audio recording
  //Tut at https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10
  //const Mp3Recorder = new MicRecorder({ bitRate: 128 });
  //Need this line below as shown since it's a functional component implementation. See https://github.com/closeio/mic-recorder-to-mp3/issues/14
  const Mp3Recorder = useMemo(() => new MicRecorder({ bitRate: 128 }), []);
  const [recording, setRecording] = useState({
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  });
  useEffect(() => {
    console.log("mounted");
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setRecording({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        setRecording({ isBlocked: true });
      }
    );
  }, []);

  const start = () => {
    if (recording.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setRecording({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };
  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setRecording({ blobURL, isRecording: false });
        console.log("done");
        const updatedData = interviewData.map((card) =>
          card.id === 1 ? { ...card, audio: blobURL } : card
        );
        console.log(updatedData);
        setInterviewData(updatedData);

        console.log(interviewData);
      })
      .catch((e) => console.log(e));
  };

  //react-hook-form submit from ModalForm
  const onSubmit = (data) => {
    console.log(data);
    const newId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    const { question, confidence, notes } = data;
    const newQuestion = {
      id: newId,
      question: question,
      stats: { timesPracticed: 0, confidence: confidence, notes: notes },
      audio: null,
      hidden: true,
    };
    setInterviewData([...interviewData, newQuestion]);
    closeModal();
  };

  const tempData = [
    {
      id: 1,
      question: "Name one time you made a mistake and what you did about it?",
      stats: {
        timesPracticed: 4,
        confidence: 80,
        notes: "Feel ready",
      },

      audio: "https://www.w3schools.com/html/horse.mp3",
      hidden: true,
    },
    {
      id: 2,
      question: "Tell me about yourself",
      stats: {
        timesPracticed: 2,
        confidence: 50,
        notes: "Umm",
      },
      audio: "https://www.w3schools.com/html/horse.mp3",
      hidden: true,
    },
  ];
  const [interviewData, setInterviewData] = useState(tempData);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  //toggles the hidden field to show question details or not
  const handleDetails = (id) => {
    console.log(id);
    const updatedData = interviewData.map((card) =>
      card.id === id ? { ...card, hidden: !card.hidden } : card
    );
    setInterviewData(updatedData);
  };

  return (
    <div className="App">
      <Circle></Circle>
      <button onClick={openModal}>Add Question</button>
      <button onClick={start} disabled={recording.isRecording}>
        Record
      </button>
      <button onClick={stop} disabled={!recording.isRecording}>
        Stop
      </button>
      <audio src={recording.blobURL} controls="controls" />
      <CardContainer
        interviewData={interviewData}
        handleDetails={(id) => handleDetails(id)}
      ></CardContainer>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal Form"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>

        <ModalForm onSubmit={onSubmit} />
      </Modal>
    </div>
  );
};

export default App;
