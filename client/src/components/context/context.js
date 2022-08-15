import React, {useState, useReducer, useEffect} from "react";
import axios from "axios";


export const AppContext = React.createContext()

// const initialState = {
//     user:JSON.parse(localStorage.getItem("user")) || null,
//     // user: null,
//     isFetching: false,
//     error:false
// }

export const AppProvider = ({children}) => {
    // const [state, dispatch] = useReducer(reducer, initialState)

    const [modalOpen, setModalOpen] = useState(false);
    // const [theme, setTheme]= useState("light");

    // const toggleTheme = () => {
    //     setTheme((currentThem) => (currentThem === 'light' ? "dark" : "light"))
    //   }

    // useEffect(() => {
    //     localStorage.setItem("user", JSON.stringify(state.user))
    // },[state.user])

   




    return(
        <AppContext.Provider value={{
            modalOpen, setModalOpen
           

        }}        
        >{children}

        </AppContext.Provider>
    )







}