import React, { useState, useEffect } from "react";
import { Form, Card, CardHeader, Row, Button } from "react-bootstrap"; // Import Form and Button components
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utilities";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext();
  const [newUsername, setNewUsername] = useState("");

  const changeUsername = async () => {
    try {
      const response = await api.put("users/account/", {
        username: newUsername,
      });

      if (response.status === 200) {
        // Update the user object with the new username
        setUser({ ...user, username: newUsername });
      }

    } catch (error) {
      console.error("Error changing username:", error);
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
                Change Username
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default SettingsPage;
