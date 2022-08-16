import React, {useState, useEffect}   from 'react';
import axios from 'axios';
import Posts from '../../components/Posts/Posts';


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

      <Posts posts={posts} />
    </div>
  )
}

export default Home

