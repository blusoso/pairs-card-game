import { useContext } from 'react';
import styled from 'styled-components';
import { device } from '../../static/device';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserContext } from '../../stores/userContext';

const Navbar = styled.nav`
  height: 60px;
  background-color: ${(props) => props.bgColor || '#fff'};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  user-select: none;
`;

const NavContainer = styled.nav`
  max-width: 1060px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${device.tablet} {
    margin: 0 1rem;
  }

  h1.logo {
    font-size: 1.5em;
    margin: 0 1rem 0 0;
    letter-spacing: 0.45px;
  }

  .nav-actions {
    button:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const Button = styled.button`
  color: ${(props) => (props.primary ? '#fff' : props.theme.colors.blue)};
  background-color: ${(props) =>
    props.primary ? props.theme.colors.blue : props.theme.colors.lightBlue};
  border: none;
  border-radius: 6px;
  letter-spacing: 0.54px;
  font-size: 1em;
  padding: 0.55em 1.1em;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.primary ? 'rgba(0, 87, 255, 0.9)' : 'rgba(0, 87, 255, 0.2)'};
  }
`;

const NavGlobalV1: React.FC = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useContext(UserContext);

  const handleButtonLink = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    router.push('/login');
  };

  return (
    <>
      <Navbar>
        <NavContainer>
          <h1 className="logo">
            <Link href="/">
              <a>bluePi</a>
            </Link>
          </h1>
          {userInfo ? (
            <div className="nav-actions">
              <Button primary onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="nav-actions">
              <Button onClick={() => handleButtonLink('/register')}>
                Register
              </Button>
              <Button primary onClick={() => handleButtonLink('/login')}>
                Login
              </Button>
            </div>
          )}
        </NavContainer>
      </Navbar>
    </>
  );
};

export default NavGlobalV1;
