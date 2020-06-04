import React, { useState } from "react";
import "./styles/app.css";
import Circle from "./components/Circle";
import CardContainer from "./components/CardContainer";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const { register, handleSubmit, watch, errors } = useForm();
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
  };

  console.log(watch("example")); // watch input value by passing the name of it
  const tempData = [
    {
      id: 1,
      question: "Name one time you made a mistake and what you did about it?",
      stats: {
        timesPracticed: 4,
        confidence: 80,
        notes: "Feel ready",
      },

      audio: "audio1.mp3",
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
      audio: "audio2.mp3",
      hidden: true,
    },
  ];
  const [interviewData, setInterviewData] = useState(tempData);

  const handleDetails = (id) => {
    console.log(id);
    //toggles the hidden field to show question details or not
    const updatedData = interviewData.map((card) =>
      card.id === id ? { ...card, hidden: !card.hidden } : card
    );
    setInterviewData(updatedData);
  };

  return (
    <div className="App">
      <Circle></Circle>
      <CardContainer
        interviewData={interviewData}
        handleDetails={(id) => handleDetails(id)}
      ></CardContainer>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          name="question"
          placeholder="Enter a question..."
          ref={register({ required: true })}
        />
        {errors.question && <span>This field is required</span>}
        {/* include validation with required or other standard HTML validation rules */}
        <input
          name="confidence"
          placeholder="How confident are you with this question?"
          ref={register({ required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.confidence && <span>This field is required</span>}
        <input name="notes" placeholder="Notes..." ref={register} />
        {/* errors will return when field validation fails  */}
        {errors.notes}

        <input type="submit" />
      </form>
    </div>
  );
};

export default App;
