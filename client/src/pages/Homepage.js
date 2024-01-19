import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/features/user/userSlice";
import { persistor } from "../Redux/store";

const HomepageMain = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #f5f5f5;
  z-index: 5;
  padding: 10px 10px 10px 20px;
`;

const Header = styled.header`
  padding: 10px 0;
  font-size: 30px;
  letter-spacing: 1px;
  border-bottom: 1px solid #f5f5f5;
`;

const DATE = styled.p`
  padding: 20px 0;
  font-size: 17px;
`;

const Main = styled.main`
  flex: 1;
`;

const Greeting = styled.p`
  font-size: 40px;
  margin: 10px 0;
`;

const IconLinkContainer = styled.div`
  display: flex;
  align-items: center;
  /* background-color: blue; */
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
`;

const IconContainer = styled.div`
  /* background-color: red; */
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const LinkContainer = styled.div`
  /* background-color: yellow; */
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const StyLink = styled(Link)`
  text-decoration: none;
  color: #f5f5f5;
  font-size: 16px;
  text-transform: capitalize;
  letter-spacing: 1px;
  transition-property: transform;
  transition-duration: 0.5s;
  transition-delay: 0s;
  transition-timing-function: ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const Footer = styled.footer`
  padding: 10px;
  border-top: 1px solid #f5f5f5;
  display: flex;
`;

const FooterIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin-right: 20px;
  cursor: pointer;
`;

const Current = styled.span`
  margin-right: 30px;
  font-size: 15px;
  letter-spacing: 1px;
`;

const Status = styled.span`
  font-size: 15px;
  letter-spacing: 1px;
`;

const Homepage = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const handleLogout = async () => {
    await persistor.purge();
    dispatch(logout());
  };

  return (
    <HomepageMain>
      <Header>Tech Notes</Header>
      <DATE>{today}</DATE>
      <Main>
        <Greeting>Welcome!</Greeting>
        <IconLinkContainer>
          <IconContainer>
            <FaLongArrowAltRight />
          </IconContainer>
          <LinkContainer>
            <StyLink to="/usernotes">your notes</StyLink>
          </LinkContainer>
        </IconLinkContainer>
        <IconLinkContainer>
          <IconContainer>
            <FaLongArrowAltRight />
          </IconContainer>
          <LinkContainer>
            <StyLink to="/createnote">create a note</StyLink>
          </LinkContainer>
        </IconLinkContainer>
      </Main>
      <Footer>
        <FooterIcon title="logout">
          <IoLogOutSharp role="button" onClick={handleLogout} />
        </FooterIcon>
        <Current>Current User: {user.roles}</Current>
        <Status>Status: {user.active ? "Active" : "Diactivated"}</Status>
      </Footer>
    </HomepageMain>
  );
};

export default Homepage;
