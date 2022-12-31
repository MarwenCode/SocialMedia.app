import React, { useState, useContext, useEffect } from "react";
import "./navbar.scss";
import { FaSearch, FaRegEnvelope } from "react-icons/fa";
import { UserCircle, House, Bell } from "phosphor-react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarModal from "./NavbarModal";

const Navbar = () => {
  const { modalOpen, setModalOpen, user, posts, users } =
    useContext(AppContext);
  const publicFolder = "https://social-media-app-vp1y.onrender.com/api/images/";
  const [post, setPost] = useState([]);
  const Navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const handleClickSearchTerm = () => {
    setSearchActive(false);
  };

  console.log(post);
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [searchActive, setSearchActive] = useState(false);

  //   const handleLogout = () => {
  //     dispatch({ type: "LOGOUT" });
  //     // window.location.replace("/login")
  //     Navigate("/login")
  //   };

  useEffect(() => {
    const fetchPost = async (postId) => {
      const res = await axios.get(`/post/${postId}`);
      // const res = await axios.get("/post/:id");
      console.log(res);
      setPost(res.data);
    };

    fetchPost();
  }, [post]);

  //   const handleClickSearchTerm = () => {
  //     setSearchActive(false);
  //   };

  //   useEffect(() => {
  //     const closeSearchBox = (e) => {
  //       console.log(e);
  //       if (e.path[0].tagName !== "INPUT") {
  //         setSearchActive(false);
  //       }
  //     };
  //     document.body.addEventListener("click", closeSearchBox);
  //     return () => document.body.removeEventListener("click", closeSearchBox);
  //   }, []);

  return (
    <div className="navbar">
      {user ? (
        <>
          {/* <div className="leftnavbar"></div> */}
          <div className="searchSection">
            {searchActive && (
              <div className="search">
                {users
                  .filter((user) => {
                    if (searchTerm == "") {
                      return;
                    } else if (
                      user.username
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return user;
                    }
                  })
                  .map((user, key) => {
                    return (
                      <div className="searchTerm" key={key}>
                        <p
                          className="searchTitle"
                          onClick={handleClickSearchTerm}>
                          <Link
                            className="link"
                            to={`/profile/friend/${user._id}`}>
                            <span className="name">{user.username}</span>
                          </Link>
                        </p>
                        {/* <p className="searchTitle" >{post.title} </p> */}
                      </div>
                    );
                  })}
              </div>
            )}
            <div className="FasearchInput">
              <FaSearch className="Fasearch" />
              <input
                className="inputSearch"
                type="text"
                placeholder="search for a post..."
                onChange={(e) => setSearchTerm(e.target.value)}
                // onClick={() => setSearchActive(true)}
                onClick={() => setSearchActive((prev) => !prev)}
              />
            </div>
          </div>
          <div className="setting">
            <div className="settingList">
              <ul className="list">
                <Link to="/" className="link">
                  {/* <li className="item">Home</li> */}
                  <House size={25} />
                </Link>

                <li className="item">
                  {/* <FaRegEnvelope /> */}
                  <span className="IconBadge">2</span>
                  <Bell size={25} />
                </li>
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
                  // src="images/image1.jpg"

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
