import { useNavigate, useOutletContext } from "react-router-dom";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export const RegisterPage = ()=>{
  const {user, setUser} = useOutletContext();
  const [existingUser, setExistingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    if (user){
      navigate("/")
    }
  },[])

  return (
    <>
      {existingUser ? (
      <LogIn  setUser={setUser} existingUser={existingUser} setExistingUser={setExistingUser}/>
      ) : (
      <SignUp setUser={setUser} existingUser={existingUser} setExistingUser={setExistingUser}/>
      )
      }
    </>
  );
}