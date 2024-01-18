import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";
import Publicpage from "./pages/Publicpage";
import Notespage from "./pages/Notespage";
import ManageUserspage from "./pages/ManageUserspage";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Homepage /> : <Navigate to="/public" />}
        />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/public" element={<Publicpage />} />
        <Route path="/notes" element={<Notespage />} />
        <Route path="/manage" element={<ManageUserspage />} />
      </Routes>
    </div>
  );
}

export default App;
