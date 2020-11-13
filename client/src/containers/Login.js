import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import ErrorMessage from '../components/ErrorMessage';
import '../styles/login.scss';
import { Redirect, Link } from 'react-router-dom';
import { loginUser } from '../redux/actions';
import { connect } from 'react-redux';

function Login (props) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const onChange = e => {
    setForm((prev) => {
      const newState = {...prev};
      newState[e.target.name] = e.target.value;
      return newState;
    })
  };

  const {
    register,
    errors,
    formState: { isSubmitting }
  } = useForm();

  // TODO  get data from db
  // TODO setUser
  // TODO check for partner and setPartner
  // TODO isAuthenticated is true
  // TODO setNames and if partner setPartnerNames + matches
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: form.email,
      password: form.password
    };
    // props.isAuthenticated = true;
    props.loginUser(userData);
    props.history.push('/game');
  };

  // TODO add hardcoded validation
  //   const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  //   const validateEmail = async value => {
  //   await sleep(1000);
  //   if (value !== "jort@hello.com" || "elke@hello.com") {
  //       setError("email", "validate");
  //     } else {
  //       clearError("email");
  //     }
  // };


  // if (props.isAuthenticated) {
  //   <Redirect to='/game' />
  // };

  return (

    <div className='login'>
      <form
        className='login-form'
        onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Email</label>
        <input className='registration-input'
          name="email"
          type="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          onChange={onChange}
        />
        <ErrorMessage error={errors.email || errors.validate} />

        <label>Password</label>
        <input className='registration-input'
          name="password"
          type="password"
          ref={register({ required: true, minLength: 8 })}
          onChange={onChange}
        />
        <ErrorMessage error={errors.email} />

        <button className='registration-button' disabled={isSubmitting} type="submit"> Login
        </button>

        <h5>Not Registered? <Link to='/register'>Register</Link> here</h5>
      </form>

    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userData) => dispatch(loginUser(userData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);