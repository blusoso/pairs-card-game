import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const CardContainer = styled.div`
  width: 650px;
  margin: 4rem auto;
`;

const Card = styled.div`
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
  padding: 40px 56px;

  h1 {
    margin: 0;
  }

  p {
    margin: 9px 0 16px 0;

    span {
      margin-right: 7px;
    }

    a {
      color: ${(props) => props.theme.colors.blue};
      text-decoration: underline;
      font-weight: 500;
      &:hover {
        color: rgba(0, 87, 255, 0.9);
      }
    }
  }
`;

const AuthUI = ({ header, children }) => {
  return (
    <React.Fragment>
      <CardContainer>
        <Card>
          <h1>{header}</h1>
          {header == 'Login' ? (
            <p>
              <span>New user?</span>
              <Link href="/register">
                <a className="blue-link">Create an account</a>
              </Link>
            </p>
          ) : (
            <p>
              <span>Already have an account?</span>
              <Link href="/login">
                <a className="blue-link">Sign in here</a>
              </Link>
            </p>
          )}
          {children}
        </Card>
      </CardContainer>
    </React.Fragment>
  );
};

export default AuthUI;
