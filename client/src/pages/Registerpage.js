import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api";

const RegMain = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

const FormConatainer = styled.div`
  width: 400px;
  min-height: 350px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const HEAD = styled.p`
  text-align: center;
  text-transform: uppercase;
  font-size: 25px;
  padding: 10px 0 5px 0;
  letter-spacing: 1px;
  color: #061d33;
`;

const PARA = styled.p`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 17px;
  color: #777;
`;

const StyledForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  background-color: #c2c2c2;
  width: 80%;
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #333;
  outline: none;

  &::placeholder {
    color: #333;
  }
`;

const Btn = styled.button`
  width: 80%;
  height: 30px;
  border: none;
  outline: none;
  padding: 10px 0;
  background-color: teal;
  color: #fff;
  transition-property: background-color, color;
  transition-duration: 0.5s;
  transition-delay: 0s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
  letter-spacing: 2px;
  font-size: 12px;
  text-transform: uppercase;
  &:hover {
    background-color: #333;
    color: orange;
  }
`;

const LastLine = styled.p`
  margin-top: 10px;
  color: #222;
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 13px;
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: #6780fa;

  &:hover {
    text-decoration: underline;
  }
`;

const Registerpage = () => {
  const navigate = useNavigate();
  const usernameRegX = /^\S+$/;
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confPassRef = useRef();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      usernameRegX.test(usernameRef.current.value) &&
      passwordRef.current.value === confPassRef.current.value
    ) {
      try {
        const response = await api.post("/users/register", {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        });
        alert(response.data);
        console.log(response.data);
        usernameRef.current.value = "";
        passwordRef.current.value = "";
        confPassRef.current.value = "";
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert(
        "Username can't have white spaces and two passwords must be match!"
      );
    }
  };
  return (
    <RegMain>
      <FormConatainer>
        <HEAD>Michael J. Repair Shop</HEAD>
        <PARA>register</PARA>
        <StyledForm onSubmit={handleRegister}>
          <Input
            type="text"
            required
            placeholder="Username"
            name="username"
            ref={usernameRef}
          />
          <Input
            type="password"
            required
            placeholder="Password"
            name="password"
            ref={passwordRef}
          />
          <Input
            type="password"
            required
            placeholder="Confirm Password"
            name="confirmPassword"
            ref={confPassRef}
          />
          <Btn type="submit">register</Btn>
          <LastLine>
            Already have an account? <SLink to="/login">Login</SLink>
          </LastLine>
        </StyledForm>
      </FormConatainer>
    </RegMain>
  );
};

export default Registerpage;
