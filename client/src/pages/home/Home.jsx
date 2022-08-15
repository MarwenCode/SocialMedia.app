import React, {useState, useEffect}   from 'react';
import axios from 'axios';

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
    <div>Home</div>
  )
}

export default Home