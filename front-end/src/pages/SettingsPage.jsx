import { api } from "../utilities";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Card, CardBody,CardHeader,Row } from "react-bootstrap";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext();
  const [currentUsername, setCurrentUsername] = useState(user);
  const [isPremium, setIsPremium] = useState(false); // State for the premium toggle

  const getAccountInfo = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get("users/account/");
      const { username, premium } = response.data;
      setCurrentUsername(username);
      setIsPremium(premium); // Set the premium status from the API response
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/register/");
    } else {
      getAccountInfo();
    }
  }, [user, navigate]);



  return (
    <>
    <Row>
      <Card>
        <CardHeader className="account-header"><h2>Manage Account</h2></CardHeader>
        <CardBody>
          
        </CardBody>
      </Card>
    </Row>
    </>
  );
};

export default SettingsPage;
