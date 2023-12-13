

import { api } from "../utilities";
import { useState, useEffect } from "react";
import {useNavigate, useOutletContext } from "react-router-dom";
import { Card, CardBody, Row } from "react-bootstrap";

const DemoPage = ()=>{
  const {user, setUser} = useOutletContext();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user){
      navigate("/register/")
    }
  },[user])
  
  return(
    <>
      <Card>
        <CardBody>
          {user}        
        </CardBody>
      </Card>

    </>
  );
}

export default DemoPage;




