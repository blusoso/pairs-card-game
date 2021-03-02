import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import AuthUI from '@/components/template/AuthUI';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserContext } from '@/stores/userContext';
import Button from '../components/template/Button';

interface User {
  email: string;
  password: string;
}

const ButtonWrapper = styled.div`
  .btn {
    display: flex;
    margin-left: auto;
  }
`;

const Login: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [userInfo, setUserInfo] = useContext(UserContext);

  const onSubmit = async (user: User) => {
    await axios
      .post('/api/users/signin', user)
      .then((res) => {
        setErrorMessage(null);
        setUserInfo(res.data.data);
        localStorage.setItem('userInfo', JSON.stringify(res.data.data));
        router.push('/');
      })
      .catch((err) => {
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

          <ButtonWrapper>
            <Button primary>Sign in</Button>
          </ButtonWrapper>
        </form>
      </AuthUI>
    </React.Fragment>
  );
};

export default Login;
