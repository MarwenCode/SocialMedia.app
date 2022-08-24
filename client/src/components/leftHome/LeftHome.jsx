import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AppContext } from "../context/context";
import "./lefthome.scss";

const LeftHome = () => {
  const { user } = useContext(AppContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        // const friendList = await axios.get(`/user/friends/${user._id}`);
        const friendList = await axios.get("/user/friends/" + user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
   
    };

    getFriends();
  }, [user._id]);

  console.log(friends)
  console.log(user)

  return(


 
<div className="lefthome">
   
   <div className="top">

   </div>

   <div className="down">

   <div className="friendslist">
     <h4 className="rightbarTitle">User friends</h4>

     <div className="searchFriendsList">
       {/* <Search  className='searchIcon'/> */}
       <input

         placeholder="search for a friend"
         className="inputSearchFriend" />

     </div>
   </div>

   <div className="leftbarFollowings">

     <div className="leftbarFollowing">
       <span className="leftbarFollowingName"></span>
       <img className="leftbarFollowingImg" />

     </div>

   </div>

 </div>
 
 


</div>

  );
};

export default LeftHome;