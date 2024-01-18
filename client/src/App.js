import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";
import Publicpage from "./pages/Publicpage";
import Notespage from "./pages/Notespage";
import ManageUserspage from "./pages/ManageUserspage";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import UserNotes from "./pages/Usernotes";

function App() {
  const { user } = useSelector((store) => store.user);
  const includes =
    user?.roles?.includes("Admin") || user?.roles?.includes("Manager");
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
        <Route path="/register" element={<Registerpage />} />
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
      </Routes>
    </div>
  );
}

export default App;
