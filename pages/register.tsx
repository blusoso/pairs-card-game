import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import AuthUI from '@/components/template/AuthUI';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserContext } from '@/stores/userContext';
import Button from '../components/template/Button';

interface User {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const ButtonWrapper = styled.div`
  .btn {
    display: flex;
    margin-left: auto;
  }
`;
const Register: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [userInfo, setUserInfo] = useContext(UserContext);

  const onSubmit = async (user: User) => {
    await axios
      .post('/api/users/signup', user)
      .then((res) => {
        setErrorMessage(null);
        setUserInfo(res.data.data);
        localStorage.setItem('userInfo', JSON.stringify(res.data.data));
        router.push('/');
      })
      .catch((err) => {
        setErrorMessage('Please try again.');
      });
  };

  return (
    <React.Fragment>
      <AuthUI header="Register">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              ref={register({ required: true })}
              placeholder="Name"
            />
            {errors.name && <span>Name is required</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="email"
              className="form-control"
              ref={register({ required: true })}
              placeholder="Enter email"
            />
            {errors.email && <span>Email is required</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              ref={register({ required: true })}
              placeholder="Password"
            />
            {errors.password && <span>Password is required</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password_confirmation"
              className="form-control"
              ref={register({
                required: true,
                validate: (value) => value === watch('password'),
              })}
              placeholder="Comfirm Password"
            />
            {errors.password_confirmation && (
              <span>Confirm password is required</span>
            )}
            {errors.password_confirmation?.type == 'validate' && (
              <span className="error-message">
                Password and confirm password are not match.
              </span>
            )}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <ButtonWrapper>
            <Button primary>Sign Up</Button>
          </ButtonWrapper>
        </form>
      </AuthUI>
    </React.Fragment>
  );
};

export default Register;
