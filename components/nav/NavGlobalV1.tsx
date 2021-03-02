import { useContext } from 'react';
import styled from 'styled-components';
import { device } from '../../static/device';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserContext } from '../../stores/userContext';
import Button from '../../components/template/Button';

interface StyledProps {
  bgColor?: string;
  theme: any;
}

const Navbar = styled.nav`
  height: 60px;
  background-color: ${(props: StyledProps) => props.bgColor || '#fff'};
  border-bottom: 1px solid ${(props: StyledProps) => props.theme.colors.gray};
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
              <Button primary handleOnclick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="nav-actions">
              <Button handleOnclick={() => handleButtonLink('/register')}>
                Register
              </Button>
              <Button primary handleOnclick={() => handleButtonLink('/login')}>
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
