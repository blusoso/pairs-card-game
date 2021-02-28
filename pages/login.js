import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import AuthUI from '@/components/template/AuthUI';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserContext } from '@/stores/userContext';

const Button = styled.button`
  color: ${(props) => (props.primary ? '#fff' : props.theme.colors.blue)};
  background-color: ${(props) =>
    props.primary ? props.theme.colors.blue : props.theme.colors.lightBlue};
  padding: 0.8rem 1.2rem;
  font-size: 600;
  display: flex;
  margin-left: auto;

  &:hover {
    background-color: ${(props) =>
      props.primary ? 'rgba(0, 87, 255, 0.9)' : 'rgba(0, 87, 255, 0.2)'};
  }
`;

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const [userInfo, setUserInfo] = useContext(UserContext);

  const onSubmit = async (user) => {
    await axios
      .post('/api/users/signin', user)
      .then((res) => {
        setErrorMessage(null);
        setUserInfo(res.data.data);
        localStorage.setItem('userInfo', JSON.stringify(res.data.data));
        router.push('/');
      })
      .catch((err) => {
        console.log('error');
        setErrorMessage('Email or password is incorrect. Please try again.');
      });
  };

  return (
    <React.Fragment>
      <AuthUI header="Login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              name="email"
              className="form-control"
              ref={register({ required: true })}
              placeholder="Enter email"
            />
            {errors.email && (
              <span className="error-message">Email is required</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              ref={register({ required: true })}
              placeholder="Password"
            />
            {errors.password && (
              <span className="error-message">Password is required</span>
            )}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <Button primary className="btn">
            Sign in
          </Button>
        </form>
      </AuthUI>
    </React.Fragment>
  );
};

export default Login;
