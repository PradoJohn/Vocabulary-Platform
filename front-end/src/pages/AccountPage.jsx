import { api } from "../utilities";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./AccountPage.css";

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, setUser, isPremium, setIsPremium } = useOutletContext();
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
    try {
      const response = await api.put("users/account/", {
        is_premium: updatedIsPremium, // Use the updated value
      });
      // console.log(response.data);
      if (response.status === 200) {
        await handleLogout();
        if(isPremium){
          alert("You have chosen to downgrade from our Premium plan. Your account will now revert to our standard (or free) plan, which comes with its own set of features and limitations.")
        }else{
          alert("Congratulations! You've successfully upgraded to our Premium account.")
        }
        
      }
    } catch (error) {
      console.error("Error updating premium status:", error);
    }
  };

  const handleLogout =async()=>{
    try {
      const response = await api.post("users/logout/");
      if (response.status === 204) {
        setUser(null);
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        navigate("/register/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }
  useEffect(() => {
    if (!user) {
      navigate("/register/");
    } else {
      getAccountInfo();
    }
  }, [user]);

  return (
    <Card style={{width:"400px"}}>
      <CardHeader>
        <h3 className="text-center" >Profile</h3>
      </CardHeader>
      <CardBody>
        <h6>Username: {username} </h6>
        <h6>Premium: {isPremium ? "Yes" : "No"}</h6>
        <div className="d-flex flex-row align-items-center ">
        <h6 className="me-2">{isPremium ? "Deactivate:" : "Activate:"} </h6>
        <label className="switch">
          <input
            type="checkbox"
            className="checkbox"
            checked={isPremium}
            onChange={handleSlide}
          />
            <span className="slider"></span>
        </label>
        </div>
      </CardBody>
    </Card>
  );
};

export default AccountPage;
