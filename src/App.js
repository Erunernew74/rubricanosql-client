import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InserimentoSuccess from "./components/InserimentoSuccess/InserimentoSuccess";
import Home from "./components/Home/Home";
import UpdateIndirizzi from "./components/UpdateIndirizzi";
import UpdateSuccess from "./components/UpdateSuccess/UpdateSuccess";
import Cerca from "./components/Cerca/Cerca";
import Navigation from "./components/Nav/Navigation";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import RegisterSuccess from "./components/RegisterSuccess/RegisterSuccess";
import LoginSuccess from "./components/LoginSuccess/LoginSuccess";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";
import Profilo from "./components/Profilo/Profilo";
import Rubrica from "./components/Rubrica/Rubrica";
import LogoutSuccess from "./components/LogoutSuccess/LogoutSuccess";

function App() {
  return (
    <AuthComponent>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />

          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="logoutSuccess" element={<LogoutSuccess />} />
          <Route path="/registerSuccess" element={<RegisterSuccess />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/profilo" element={<Profilo />} />
            <Route
              path="/inserimentoSuccess"
              element={<InserimentoSuccess />}
            />
            <Route path="/rubrica" element={<Rubrica />} />
            <Route path="/update/:id" element={<UpdateIndirizzi />} />
            <Route path="/updateSuccess" element={<UpdateSuccess />} />
            <Route path="loginSuccess" element={<LoginSuccess />} />
            <Route path="/cerca" element={<Cerca />} />
          </Route>
        </Routes>
      </Router>
    </AuthComponent>
  );
}

export default App;
