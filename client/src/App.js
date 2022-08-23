import Navbar from "./components/navabar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "./components/navabar/Modal";
import { AppContext } from "./components/context/context";
import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import SinglePost from "./components/singlePost/SinglePost";



function App() {
  const { modalOpen, setModalOpen } = useContext(AppContext);
  return (
    <Router>
    <div className="container" >
      <Navbar />
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:postId" element={<SinglePost />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
