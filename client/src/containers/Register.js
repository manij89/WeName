import React from 'react';
import { useForm } from "react-hook-form";
import ErrorMessage from '../components/ErrorMessage';
import '../styles/register.scss';

export default function Register(props) {


  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = data => {
    console.log(JSON.stringify(data));
  };
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // const validateUserName = async value => {
  //   await sleep(1000);
  //   if (value !== "bill") {
  //     setError("username", "validate");
  //   } else {
  //     clearError("username");
  //   }
  // };

  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <label>First Name:</label>
      <input name="firstName" ref={register({ required: true })} />
      <ErrorMessage error={errors.firstName} />

      <label>Last Name:</label>
      <input name="lastName" ref={register({ required: true, minLength: 2 })} />
      <ErrorMessage error={errors.firstName} />

      <label>Email</label>
      <input
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      <ErrorMessage error={errors.email} />
      <input disabled={isSubmitting} type="submit" />
    </form>
  )
}
