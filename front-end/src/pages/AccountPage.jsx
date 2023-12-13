import { api } from "../utilities";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Row, Col} from "react-bootstrap";
import { useOutletContext, useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const { user} = useOutletContext();
  const [username, setUsername] = useState(null)
  const [isPremium, setIsPremium] = useState(false)

  const getAccountInfo = async () => {
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = `Token ${token}`;

      try {
        const response = await api.get("users/account/");
        if (response.data) {
          console.log(response.data)
          const {username, is_premium} = response.data;
          setUsername(username);
          setIsPremium(is_premium);
        } else {
          console.error("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

  useEffect(() => {
    if (!user){
      navigate("/register/")
    }else{
      getAccountInfo();
    }
  }, [user]);

  return (

      <Card>
        <CardHeader>
          <h2 className="account-header text-center">Profile</h2>
        </CardHeader>
        <CardBody>
          <h6>Username: {username}</h6>
          <h6>Premium: {isPremium ? "Yes" : "No"}</h6>
        </CardBody>
      </Card>
  );
};

export default AccountPage;
