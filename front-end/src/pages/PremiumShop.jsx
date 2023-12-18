
import { api } from "../utilities";
import { Card, Row, Col} from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { TfiText } from "react-icons/tfi";
import { FaRegImage } from "react-icons/fa6";
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
    <Row className="justify-content-center">
      <Col xs={6} sm={5}>
        <Card>
          <Card.Body>
            <div className="text-center">

            <TfiText size={65}/>
            </div>
            <p className="text-center mt-3">

            Generate Definition
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={6} sm={5}>
        <Card>
          <Card.Body>
            <div className="text-center">
            <FaRegImage size={65}/>
            </div>
            <p className="text-center m-3">
              Generate Image
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
      
    </>
  );
};

export default PremiumShop;