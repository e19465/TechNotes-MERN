import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";
import Publicpage from "./pages/Publicpage";
import Notespage from "./pages/Notespage";
import ManageUserspage from "./pages/ManageUserspage";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import UserNotes from "./pages/Usernotes";
import UserSettings from "./pages/UserSettings";
import Createnote from "./pages/Createnote";
import { useEffect } from "react";
import api from "./api";
import {
  fetchingStart,
  fetchingSuccess,
  fetchingFailure,
} from "./Redux/features/notes/noteSlice";

import {
  allFetchingStart,
  allFetchingSuccess,
  allFetchingFailure,
} from "./Redux/features/allNotes/allNotesSlice";

import Editnote from "./pages/Editnote";

function App() {
  const { user } = useSelector((store) => store.user);
  const includes =
    user?.roles?.includes("Admin") || user?.roles?.includes("Manager");

  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      dispatch(fetchingStart());
      try {
        const response = await api.get(`/notes/user/allnotes/${user?._id}`);
        dispatch(fetchingSuccess(response.data));
      } catch (err) {
        dispatch(fetchingFailure());
        console.log(err);
      }
    };

    getPosts();
  }, [user, dispatch]);

  useEffect(() => {
    const getAllPosts = async () => {
      dispatch(allFetchingStart());
      try {
        const response = await api.get("/notes/alluser/allnotes");
        dispatch(allFetchingSuccess(response.data));
      } catch (err) {
        dispatch(allFetchingFailure());
        console.log(err);
      }
    };

    getAllPosts();
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            user && includes ? (
              <Dashboard />
            ) : user && !includes ? (
              <Homepage />
            ) : (
              <Navigate to="/public" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user && includes ? (
              <Dashboard />
            ) : user && !includes ? (
              <Navigate to="/homepage" />
            ) : (
              <Publicpage />
            )
          }
        />
        <Route
          path="/homepage"
          element={
            user && !includes ? (
              <Homepage />
            ) : user && includes ? (
              <Navigate to="/dashboard" />
            ) : (
              !user && <Publicpage />
            )
          }
        />
        <Route
          path="/usernotes"
          element={
            user && !includes ? (
              <UserNotes />
            ) : user && includes ? (
              <Navigate to="/notes" />
            ) : (
              !user && <Navigate to="/public" />
            )
          }
        />
        <Route
          path="/user_settings"
          element={
            user && !includes ? (
              <UserSettings />
            ) : user && includes ? (
              <Navigate to="/manage" />
            ) : (
              !user && <Navigate to="/public" />
            )
          }
        />
        <Route
          path="/register"
          element={user && includes ? <Registerpage /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/public" element={<Publicpage />} />
        <Route
          path="/notes"
          element={
            user && includes ? (
              <Notespage />
            ) : user && !includes ? (
              <Navigate to="/usernotes" />
            ) : (
              !user && <Navigate to="/public" />
            )
          }
        />
        <Route
          path="/manage"
          element={
            user && includes ? <ManageUserspage /> : <Navigate to="/public" />
          }
        />
        <Route path="/createnote" element={<Createnote />} />
        <Route path="/edit_note" element={<Editnote />} />
      </Routes>
    </div>
  );
}

export default App;
