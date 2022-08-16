import Navbar from "./components/navabar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "./components/navabar/Modal";
import { AppContext } from "./components/context/context";
import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";



function App() {
  const { modalOpen, setModalOpen } = useContext(AppContext);
  return (
    <Router>
    <div className="container" >
      <Navbar />
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
