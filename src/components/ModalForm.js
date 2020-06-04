import React from "react";
import { useForm } from "react-hook-form";

const ModalForm = ({ onSubmit }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  return (
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
  );
};

export default ModalForm;
