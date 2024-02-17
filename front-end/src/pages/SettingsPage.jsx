import { useState, useEffect } from "react";
import { Form, Card, CardHeader, Row, Button } from "react-bootstrap"; // Import Form and Button components
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utilities";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeUsername = async () => {
    try {
      const response = await api.put("users/account/", {
        username: newUsername,
      });

      if (response.status === 200) {
        // Update the user object with the new username
        alert("Successfully Changed UserName")
        await handleLogout();
      }
    } catch (error) {
      console.error("Error changing username:", error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("The New Password and Confirm Password do not match.");
      setNewPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      const response = await api.put("users/account/", {
        password: newPassword,
      });
  
      if (response.status === 200) {
        alert("Password Successfully Changed");
        await handleLogout();
      }
    } catch (error) {
      alert("Error changing password");
      console.error("Error changing password", error);
    }
  };

  const handleLogout = async () => {
    try {
      const logoutResponse = await api.post("users/logout/");
      if (logoutResponse.status === 204) {
        setUser(null);
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        navigate("/register/");
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/register/");
    }
  }, [user, navigate]);

  return (
    <>
      <Row>
        <Card>
          <CardHeader><h3 className="text-center mt-3">Change Username</h3></CardHeader>
          <Card.Body id="sign-forms">
            <Form onSubmit={(e) => e.preventDefault()}> {/* Prevent the default form submission */}
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  type="text"
                  placeholder="New Username"
                />
              </Form.Group>
              <Button variant="primary" onClick={changeUsername}>
                Apply
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Card>
          <CardHeader><h3 className="text-center mt-3">Change Password</h3></CardHeader>
          <Card.Body id="sign-forms">
            <Form onSubmit={(e) => e.preventDefault()}> {/* Prevent the default form submission */}
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  placeholder="New Password"
                />
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Group>
              <Button variant="primary" onClick={handleChangePassword}>
                Apply
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      
    </>
  );
};

export default SettingsPage;
