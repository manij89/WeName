import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import ErrorMessage from '../components/ErrorMessage';
import '../styles/login.scss';
import { Link } from 'react-router-dom';
import { loginUser, setPartner } from '../redux/actions';
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

  const {register, errors, formState: { isSubmitting }} = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: form.email,
      password: form.password
    };
    props.loginUser(userData);
    props.history.push('/game');
  };


  return (

    <div className='login'>
      <form
        className='login-form'
        onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input className='registration-input'
          id='email'
          name="email"
          type="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          onChange={onChange}
        />
        <ErrorMessage error={errors.email || errors.validate} />

        <label htmlFor="password">Password</label>
        <input className='registration-input'
          id= "password"
          name="password"
          type="password"
          ref={register({ required: true, minLength: 8 })}
          onChange={onChange}
        />
        <ErrorMessage error={errors.email} />

        <button data-testid='loginBtn' className='registration-button' disabled={isSubmitting} type="submit"> Login
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
  setPartner: (userData) => dispatch(setPartner(userData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);