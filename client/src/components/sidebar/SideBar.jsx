import React, {useState,useEffect} from 'react';
import {BsChatSquareText} from "react-icons/bs";
import {FcVideoCall} from "react-icons/fc";
import {MdGroups} from "react-icons/md";
import "./sidebar.scss";
import axios from 'axios';
import News from '../news/News';


const SideBar = () => {


    const [listData, setListData] = useState([])

    const url='https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8e331b907e5c48dba9b48ea87cfdadc3'
  
    useEffect(() => {
        const fetchNews = async() => {

            const res =  await axios.get(`
            https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8e331b907e5c48dba9b48ea87cfdadc3`)
            // .then((res) => setListData((listData) => [...listData, res.data]))
           
          setListData(res.data.articles)
        
       
            console.log(res)
          }

          fetchNews()

        }, [])

        console.log(listData)





  return (
    <div className="sidebar">
    <div className="sidebarWrapper">
      <ul className="sidebarList">
        <li className="sidebarListItem">
          <BsChatSquareText className="sidebarIcon" />
          <span className="sidebarListItemText">Chats</span>
        </li>
        <li className="sidebarListItem">
          <FcVideoCall className="sidebarIcon" />
          <span className="sidebarListItemText">Videos</span>
        </li>
        <li className="sidebarListItem">
          <MdGroups className="sidebarIcon" />
          <span className="sidebarListItemText">Groups</span>
        </li>
   
      </ul>
   
      <hr className="sidebarHr" />
      
    
     
    
      <div className='news'>
   
        {listData.map((data, index) => (
        
               <News data={data} key={index}/>

        ))} 


        
       
      </div>
    </div>
  </div>
  )
}

export default SideBar