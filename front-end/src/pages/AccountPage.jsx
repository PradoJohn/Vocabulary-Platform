import { api } from "../utilities";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./AccountPage.css";

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, isPremium, setIsPremium } = useOutletContext();
  const [username, setUsername] = useState(null);

  const getAccountInfo = async () => {
    const token = localStorage.getItem("token");
    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    try {
      const response = await api.get("users/account/");
      if (response.data) {
        // console.log(response.data);
        const { username, is_premium } = response.data;
        setUsername(username);
        setIsPremium(is_premium);
      } else {
        console.error("Empty response data");
      }
    } catch (error) {
      console.error("Error fetching account info:", error);
    }
  };

  const handleSlide = async () => {
    const updatedIsPremium = !isPremium; // Toggle the premium status
    setIsPremium(updatedIsPremium);

    const token = localStorage.getItem("token");
    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    try {
      const response = await api.put("users/account/", {
        is_premium: updatedIsPremium, // Use the updated value
      });
      // console.log(response.data);
      if (response.status === 202) {
        setIsPremium(response.data.is_premium);
      }
    } catch (error) {
      console.error("Error updating premium status:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/register/");
    } else {
      getAccountInfo();
    }
  }, [user, username, isPremium]);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-center">Profile</h3>
      </CardHeader>
      <CardBody>
        <h6>Username: {username}</h6>
        <h6>Premium: {isPremium ? "Yes" : "No"}</h6>
        <label className="switch">
          <input
            type="checkbox"
            className="checkbox"
            checked={isPremium}
            onChange={handleSlide}
          />
          <span className="slider"></span>
        </label>
      </CardBody>
    </Card>
  );
};

export default AccountPage;
