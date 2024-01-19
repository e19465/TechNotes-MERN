import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoMdHome } from "react-icons/io";
import { useSelector } from "react-redux";
import { MdOutlineSaveAs } from "react-icons/md";
import { useState } from "react";

const NotesPageMain = styled.div`
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

const Main = styled.main`
  flex: 1;
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

const Footer = styled.footer`
  padding: 10px;
  border-top: 1px solid #f5f5f5;
  display: flex;
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

const Table = styled.table`
  margin: 20px auto;
  width: 80%;
`;

const Thead = styled.thead``;
const Tr = styled.tr``;
const Th = styled.th`
  border: 1px solid #f5f5f5;
  padding: 20px 0;
  font-size: 17px;
  letter-spacing: 1px;
  text-transform: uppercase;
  background-color: #001f3f;
  &:first-child {
    border-radius: 10px 0 0 0;
  }

  &:last-child {
    border-radius: 0 10px 0 0;
  }
`;
const Td = styled.td`
  border: 1px solid #fff;
  text-align: center;
  padding: 20px 0;
  font-size: 18px;
`;
const Tbody = styled.tbody``;

const Notespage = () => {
  let { allnotes } = useSelector((store) => store.allNotes);
  const { user } = useSelector((store) => store.user);
  const [notesState, setNotesState] = useState(allnotes);

  const handleCheckboxChange = (noteId) => {
    setNotesState((prevNotesState) =>
      prevNotesState.map((note) =>
        note._id === noteId ? { ...note, completed: !note.completed } : note
      )
    );
  };

  return (
    <NotesPageMain>
      <Header>Notes List</Header>
      <Main>
        <Table>
          <Thead>
            <Tr>
              <Th scope="col">mark</Th>
              <Th scope="col">status</Th>
              <Th scope="col">created</Th>
              <Th scope="col">updated</Th>
              <Th scope="col">title</Th>
              <Th scope="col">owner id</Th>
              <Th scope="col">save</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notesState.map((note) => (
              <Tr key={note._id}>
                <Td>
                  {" "}
                  <input
                    type="checkbox"
                    checked={note.completed || false}
                    onChange={() => handleCheckboxChange(note._id)}
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  />{" "}
                </Td>
                <Td
                  style={{
                    color: note.completed ? "#4cceac" : "#db4f4a",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {note.completed ? "Completed" : "Open"}
                </Td>
                <Td>{new Date(note.createdAt).toLocaleDateString()}</Td>
                <Td>{new Date(note.updatedAt).toLocaleDateString()}</Td>
                <Td>{note.title}</Td>
                <Td>{note.user}</Td>
                <Td style={{ fontSize: "25px", cursor: "pointer" }}>
                  <MdOutlineSaveAs role="button" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Main>
      <Footer>
        <SLink to="/">
          <IconContainer title="Back to Home">
            <IoMdHome />
          </IconContainer>
        </SLink>
        <Current>Current User: {user.roles.join(", ")}</Current>
        <Status>Status: {user.active ? "Active" : "Diactivated"}</Status>
      </Footer>
    </NotesPageMain>
  );
};

export default Notespage;
