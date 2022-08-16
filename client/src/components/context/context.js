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
    // const [theme, setTheme]= useState("light");

    // const toggleTheme = () => {
    //     setTheme((currentThem) => (currentThem === 'light' ? "dark" : "light"))
    //   }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])






    return(
        <AppContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
            modalOpen, setModalOpen
           

        }}        
        >{children}

        </AppContext.Provider>
    )







}