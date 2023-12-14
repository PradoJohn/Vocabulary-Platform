
import { useState } from "react";
import {api} from "../utilities"
import { useNavigate } from "react-router-dom";
import {Form, Button, Card, CardBody, CardHeader} from "react-bootstrap";


const SignUP =({setUser, existingUser, setExistingUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sign_up = async (e)=>{
    e.preventDefault();
    try{
      let response = await api.post("users/signup/",{
        username: username,
        password: password,
      });
      if (response.status === 201){
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`
        navigate("/")
      }
    }catch (err){
      if(err.response.status ===400){
        alert("Sign Up failed. Username already exists.")
      }
    }
    
  }

  return(

    <>
      <CardBody id="sign-forms">
        <Form onSubmit={(e) => sign_up(e)}>
        <h4 className="text-center mt-3">Sign Up</h4>
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
        <Button type="submit" className="me-2">Sign Up</Button>
        <Button className="text-dark" variant="outline-warning" onClick={()=> setExistingUser(!existingUser)}>Already have an Account?</Button>
        </Form>
      </CardBody>
    </>
  );
}


export default SignUP;