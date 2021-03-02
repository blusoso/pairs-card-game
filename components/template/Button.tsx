import React from 'react';
import styled from 'styled-components';

interface Props {
  primary?: boolean;
  uppercase?: boolean;
  padding?: number;
  handleOnclick?(): any;
}

interface StyledProps {
  primary?: boolean;
  uppercase?: boolean;
  padding?: number;
  theme: any;
}

const Button = styled.button`
  color: ${(props: StyledProps) =>
    props.primary ? '#fff' : props.theme.colors.blue};
  background-color: ${(props: StyledProps) =>
    props.primary ? props.theme.colors.blue : props.theme.colors.lightBlue};
  padding: ${(props: StyledProps) => `${props.padding}em` || '0.55em 1.1em'};
  text-transform: ${(props: StyledProps) =>
    props.uppercase ? 'uppercase' : 'none'};
  letter-spacing: 0.3px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 6px;

  &:hover {
    background-color: ${(props: StyledProps) =>
      props.primary ? 'rgba(0, 87, 255, 0.9)' : 'rgba(0, 87, 255, 0.2)'};
  }
`;

const ButtonUI: React.FC<Props> = ({
  primary,
  uppercase,
  padding,
  handleOnclick,
  children,
}) => {
  const handleButton = () => {
    handleOnclick && handleOnclick();
  };

  return (
    <>
      <Button
        primary={primary}
        uppercase={uppercase}
        padding={padding}
        className="btn"
        onClick={handleButton}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonUI;
