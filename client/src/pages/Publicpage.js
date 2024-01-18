import { Link } from "react-router-dom";
import styled from "styled-components";

const PublicMain = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 5;
  padding: 10px;
  color: #f5f5f5;
`;

const Head = styled.h1`
  padding: 10px 20px;
  font-size: 50px;
  letter-spacing: 1px;
  border-bottom: 1px solid #f5f5f5;
`;

const Desc = styled.p`
  margin-top: 20px;
  padding-left: 20px;
  letter-spacing: 1px;
  font-size: 15px;
`;

const AddressContainer = styled.div`
  margin-top: 50px;
  padding: 10px;
  padding-left: 20px;
  flex-grow: 1;
`;
const AddressLine = styled.p`
  letter-spacing: 1px;
  font-size: 17px;
  line-height: 30px;
  font-style: italic;
`;

const Footer = styled.div`
  padding: 20px;
  border-top: 1px solid #f5f5f5;
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: #f5f5f5;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Publicpage = () => {
  return (
    <PublicMain>
      <Head>Welcome to Michael J. Repairs!</Head>
      <Desc>
        Located in Beautiful Kandy City. Michael J. provides a trained staff to
        ready to make your tech repair needs.
      </Desc>
      <AddressContainer>
        <AddressLine>Michael J. repairs,</AddressLine>
        <AddressLine>202, Colombo street,</AddressLine>
        <AddressLine>Maradana.</AddressLine>
        <AddressLine>055-2225588</AddressLine>
      </AddressContainer>
      <Footer>
        <SLink to="/login">Empoyee Login</SLink>
      </Footer>
    </PublicMain>
  );
};

export default Publicpage;
