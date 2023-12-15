import { useNavigate, useOutletContext } from "react-router-dom";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import { useState, useEffect } from "react";

export const RegisterPage = ()=>{
  const {user, setUser, setIsPremium} = useOutletContext();
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
      <LogIn  setUser={setUser} existingUser={existingUser} setExistingUser={setExistingUser} setIsPremium={setIsPremium}/>
      ) : (
      <SignUp setUser={setUser} existingUser={existingUser} setExistingUser={setExistingUser}/>
      )
      }
    </>
  );
}