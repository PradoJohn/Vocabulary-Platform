
import { Button, Card, CardBody, Form } from "react-bootstrap";

import { useState } from "react";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

const LogIn =({setUser, existingUser, setExistingUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const log_in = async (e) =>{
    e.preventDefault();
    try{
      let response = await api.post("users/login/",{
        username: username,
        password: password,
      });
      // console.log("Response status code:", response.status);
      if (response.status === 200){
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`
        navigate("/demo/")
      } 
    }catch(err){
      if (err.response.status === 400){
        alert("Login Failed. Invalid Username/Password")
      }
    }
  };


  return(

    <>
      <CardBody id="sign-forms">
      <Form onSubmit={(e) => log_in(e)}>
      <h4 className="text-center mt-3"> Log In</h4>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
      </Form.Group>
      <Button type="submit" className="me-2">Log In</Button>
      <Button className="text-dark" variant="outline-warning" onClick={()=> setExistingUser(!existingUser)}>New User?</Button>
    </Form>
    </CardBody>
    </>
  );
}


export default LogIn;