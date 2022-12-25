import Navbar from "./components/navabar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContext } from "./components/context/context";
import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
// import SinglePost from "./components/singlePost/SinglePost";
import Profile from "./pages/profile/Profile";
import FriendProfile from "./components/FriendProfile/FriendProfile";
import "./app.scss"
import EditPost from "./components/editPost/EditPost";
import Chat from "./pages/chat/Chat";



function App() {
  const { modalOpen, setModalOpen, user } = useContext(AppContext);
  return (
    <Router>
    <div className="container" >
      <Navbar /> 
      {/* {modalOpen && <Modal setOpenModal={setModalOpen} />} */}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login /> } />
        <Route path="/login" element={user ? <Home /> : <Login /> } />
        <Route path="/chat" element={user ? <Chat /> : <Login /> } />
        <Route path="/register" element={user ? <Login /> : <Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/post/:id" element={<EditPost />} />
        <Route path="/profile/friend/:id" element={<FriendProfile />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
