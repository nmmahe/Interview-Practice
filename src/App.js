import React, { useState, useEffect, useMemo, useRef } from "react";
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

  //useRef to keep track of the audio file attached to the audio tag and rerender it when
  //a new recording is made
  // const refAudio = useRef();
  const tempData = [
    {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e",
      question: "Name one time you made a mistake and what you did about it?",
      stats: {
        timesPracticed: 4,
        confidence: 80,
        notes: "Feel ready",
      },

      audio: {
        blobURL: "https://www.w3schools.com/html/horse.mp3",
        isRecording: false,
        isBlocked: false,
      },
      hidden: true,
    },
    {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      question: "Tell me about yourself",
      stats: {
        timesPracticed: 2,
        confidence: 50,
        notes: "Umm",
      },
      audio: {
        blobURL: "https://www.w3schools.com/html/horse.mp3",
        isRecording: false,
        isBlocked: false,
      },
      hidden: true,
    },
  ];
  const [interviewData, setInterviewData] = useState(tempData);
  useEffect(() => {
    console.log("mounted");
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        //here's where I might need to use refs so I am not mapping over all of the interviewData
        //again to change the recording
        //setRecording({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        //setRecording({ isBlocked: true });
      }
    );
  }, []);
  useEffect(() => {
    console.log("changed");
    //refs.audio.load();
  }, [interviewData]);

  const start = (id, isBlocked, passedAudio) => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          const updatedData = interviewData.map((card) =>
            card.id === id
              ? { ...card, audio: { ...passedAudio, isRecording: true } }
              : card
          );
          setInterviewData(updatedData);
        })
        .catch((e) => console.error(e));
    }
  };
  const stop = (id, passedAudio) => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);

        console.log("done");
        const updatedData = interviewData.map((card) =>
          card.id === id
            ? {
                ...card,
                audio: { ...passedAudio, blobURL: blobURL, isRecording: false },
              }
            : card
        );
        console.log(updatedData);
        setInterviewData(updatedData);

        console.log(interviewData);
        //updates the audio tag on dom with new video src since rendering won't do that.
        document.querySelector(`[data-id="${id}"]`).load();
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
      audio: {
        blobURL: "",
        isRecording: false,
        isBlocked: false,
      },
      hidden: true,
    };
    setInterviewData([...interviewData, newQuestion]);
    closeModal();
  };

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

      <CardContainer
        interviewData={interviewData}
        handleDetails={(id) => handleDetails(id)}
        start={start}
        stop={stop}
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
