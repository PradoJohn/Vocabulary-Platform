
import { api } from "../utilities";
import { Card} from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";


const PremiumShop = ()=>{
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
        <Card.Footer>
          Premium Shop
        </Card.Footer>
      </Card>
    </>
  );
};

export default PremiumShop;