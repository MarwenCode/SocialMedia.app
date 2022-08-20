import React, {useState, useEffect}   from 'react';
import axios from 'axios';
import Posts from '../../components/Posts/Posts';
import Share from '../../components/share/Share';
import "./home.scss"


const Home = () => {
    const [posts, setPosts] =useState([])

    
    useEffect(() => {
        const fetchPosts = async() => {
            const res = await axios.get("/post")
            console.log(res)
            setPosts(res.data)
           
            
        }
  
        fetchPosts()
    }, [])


  return (
    <div className='home'>
      
      <div className="right">
        

      </div>
      <div className="center">
        <Share />
        
      <Posts posts={posts} />

      </div>
      <div className="left">
        

      </div>

      
    </div>
  )
}

export default Home

