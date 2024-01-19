import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api";
import { useSelector } from "react-redux";

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
  min-height: 400px;
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

const Editnote = () => {
  const { user } = useSelector((store) => store.user);
  const { id } = useSelector((store) => store.noteUpdate);
  const { notes } = useSelector((store) => store.notes);
  const [editID, setEditID] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();

  const handleEditNote = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/notes/update/${id}`, {
        userId: user?._id,
        title: editTitle,
        text: editText,
      });
      console.log(response.data);
      alert("Note has been successfully updated!");
      setEditTitle("");
      setEditText("");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const editNeedNote = notes.find((note) => note._id === id);
    setEditID(editNeedNote._id);
    setEditTitle(editNeedNote.title);
    setEditText(editNeedNote.text);
  }, [notes, id]);

  return (
    <RegMain>
      <FormConatainer>
        <HEAD>Michael J. Repair Shop</HEAD>
        <PARA>Create a Note</PARA>
        <StyledForm onSubmit={handleEditNote}>
          <Input
            type="text"
            required
            placeholder="Id"
            name="Id"
            id="Id"
            title="User ID (read only)"
            value={editID}
            readOnly
          />
          <Input
            type="text"
            required
            placeholder="title"
            id="title"
            name="title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextArea
            placeholder="Description..."
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            required
          />
          <Btn type="submit">save</Btn>
        </StyledForm>
      </FormConatainer>
    </RegMain>
  );
};

export default Editnote;
