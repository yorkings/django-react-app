import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../lib/constants";
import { useEffect, useState } from "react";
import {Button} from "@nextui-org/button";
import { toast } from "react-toastify";

const ProtectedRoute = ({children}) => {
  const [Isauthorized,SetIsauthorized]=useState(null);
  useEffect(()=>{
    authToken().catch(()=>SetIsauthorized(false))
  },[])
  const refreshToken= async()=> {
    const refreshToken=localStorage.getItem(REFRESH_TOKEN)
    try {
        const res = await api.post("/api/token/refresh/",{refresh:refreshToken});
        if (res.status ==200){
            localStorage.setItem(ACCESS_TOKEN,res.data.access)
            SetIsauthorized(true)
        }else{
            SetIsauthorized(false)
        }
    } catch (error) {
       toast.error(error)

    }
  }
  const authToken= async()=>{
     const token=localStorage.getItem(ACCESS_TOKEN)
     if(!token){
        SetIsauthorized(false)
        return
     }
     const decode=jwtDecode(token)
     const tokenExpiration = decode.exp
     const now = Date.now()/1000
     if(tokenExpiration < now){
        await refreshToken()
     }else{
        SetIsauthorized(true)
     }
  }
  if(Isauthorized ===null){
    return <Button color="primary" isLoading>
    Loading ...
  </Button>
  }
  return Isauthorized ? children :<Navigate to="/login"/>
}

export default ProtectedRoute;
