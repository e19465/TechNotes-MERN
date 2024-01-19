import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api";
import { useDispatch, useSelector } from "react-redux";
import { addNewNote } from "../Redux/features/notes/noteSlice";
import { IoMdHome } from "react-icons/io";

const RegMain = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
  position: relative;
`;

const FormConatainer = styled.div`
  width: 400px;
  min-height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  /* flex: 1; */
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

const TextArea = styled.textarea`
  width: 80%;
  height: 100px;
  margin-bottom: 20px;
  background-color: #c2c2c2;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #333;
  outline: none;
`;

const Footer = styled.footer`
  width: 95%;
  padding: 10px;
  border-top: 1px solid #f5f5f5;
  display: flex;
  position: absolute;
  bottom: 0;
  color: #f5f5f5;
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

const SLink = styled(Link)`
  text-decoration: none;
  color: #f5f5f5;
`;

const IconContainer = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 20px;
  cursor: pointer;
`;

const Createnote = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const titleRef = useRef();
  const textAreaRef = useRef();
  const dispatch = useDispatch();
  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/notes/newnote", {
        user: user?._id,
        title: titleRef.current.value,
        text: textAreaRef.current.value,
      });
      dispatch(addNewNote(response.data));
      alert("Note has been successfully added!");
      titleRef.current.value = "";
      textAreaRef.current.value = "";
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <RegMain>
      <FormConatainer>
        <HEAD>Michael J. Repair Shop</HEAD>
        <PARA>Create a Note</PARA>
        <StyledForm onSubmit={handleAddNote}>
          <Input
            type="text"
            required
            placeholder="Id"
            name="Id"
            id="Id"
            title="User ID (read only)"
            value={user?._id}
            readOnly
          />
          <Input
            type="text"
            required
            placeholder="title"
            id="title"
            name="title"
            ref={titleRef}
          />
          <TextArea placeholder="Description..." ref={textAreaRef} required />
          <Btn type="submit">save</Btn>
        </StyledForm>
      </FormConatainer>
      <Footer>
        <SLink to="/">
          <IconContainer title="Back to Home">
            <IoMdHome />
          </IconContainer>
        </SLink>
        <Current>Current User: {user.roles}</Current>
        <Status>Status: {user.active ? "Active" : "Diactivated"}</Status>
      </Footer>
    </RegMain>
  );
};

export default Createnote;
