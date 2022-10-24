import React, {useState, useReducer, useEffect,useRef} from "react";
import axios from "axios";
import reducer from "./reducer";


export const AppContext = React.createContext()

const initialState = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error:false
}



export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [modalOpen, setModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    // const [theme, setTheme]= useState("light");

    // const toggleTheme = () => {
    //     setTheme((currentThem) => (currentThem === 'light' ? "dark" : "light"))
    //   }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

    //fetch Posts
    
    useEffect(() => {
        const fetchPosts = async () => {
          
        //   const res = await axios.get("/post");
          const res = await axios.get("https://social-media-app-vp1y.onrender.com/api/post");
          console.log(res);
          setPosts(res.data);
        };
    
        fetchPosts();
      }, []);

   

    console.log(posts)




    return(
        <AppContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
            modalOpen, setModalOpen,
            posts,setPosts
           

        }}        
        >{children}

        </AppContext.Provider>
    )







}