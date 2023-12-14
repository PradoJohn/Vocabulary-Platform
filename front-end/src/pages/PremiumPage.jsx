
import { api } from "../utilities";
import { Card, CardHeader, CardBody } from "react-bootstrap";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const PremiumPage = ()=>{
  const {user} = useOutletContext();
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(!user){
      navigate("/register/")
    }
  },[user])

  
  return(
    <>
      <Card>
        <CardHeader>Welcome to Premium</CardHeader>
        <CardBody>

        </CardBody>
      </Card>
    </>
  );
};

export default PremiumPage;