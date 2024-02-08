import React, { useState, useContext, useEffect } from "react";
import "./navbar.scss";
import { UserCircle, House } from "phosphor-react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/context";
import axios from "axios";
import NavbarModal from "./NavbarModal";

const Navbar = () => {
  const { modalOpen, setModalOpen, user, users } = useContext(AppContext);
  console.log(users);

  const [post, setPost] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);



  const handleClickSearchTerm = () => {
    setSearchActive(false);
  };

  console.log(post);

  useEffect(() => {
    const fetchPost = async (postId) => {
      const res = await axios.get(`/post/${postId}`);
      // const res = await axios.get("/post/:id");
      console.log(res);
      setPost(res.data);
    };

    fetchPost();
  }, [post]);

  const displayUsers = () => {
   setSearchActive((prev) => !prev);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };



  return (
    <div className="navbar">
      {user ? (
        <>
          <div className="searchSection" >
            {searchActive && (
              <div className="search">
                {users
                  .filter((user) =>
                    user.username.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((user, key) => (
                    <div className="searchTerm" key={key}>
                      <p className="searchTitle" onClick={handleClickSearchTerm}>
                        <Link className="link" to={`/profile/friend/${user._id}`}>
                          <span className="name">{user.username}</span>
                        </Link>
                      </p>
                    </div>
                  ))}
              </div>
            )}
            <div className="FasearchInput">
              <input
                className="inputSearch"
                type="text"
                placeholder="search for a profile..."
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={displayUsers}
              />
            </div>
          </div>
          <div className="setting">
            <div className="settingList">
              <ul className="list">
                <Link to="/" className="link">
                  <House size={25} />
                </Link>
              </ul>
            </div>
            <div className="sign">
              {modalOpen ? (
                <div className="modal">
                  <NavbarModal setOpenModal={setModalOpen} />
                </div>
              ) : (
                <img
                  className="topImg"
                  alt=""
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : "/images/noAvatar.png"
                  }
                  onClick={() => {
                    setModalOpen(true);
                  }}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="avatar">
          <UserCircle />
        </div>
      )}
    </div>
  );
};

export default Navbar;


