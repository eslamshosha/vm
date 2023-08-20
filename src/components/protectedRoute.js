import React from 'react'
import {Navigate} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    if(localStorage.getItem("item_api") === null) {
        return <Navigate to="/signin" />
    }else{
       return  children
    }
 

};

export default ProtectedRoute;