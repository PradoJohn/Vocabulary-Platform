
import { api } from "../utilities";
import { Card, CardHeader, CardBody } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import Table from 'react-bootstrap/Table';


const CollectionPage = ()=>{
  const {user, word, setWord} = useOutletContext();
  const navigate = useNavigate();
  
  useEffect(()=>{

    const getSavedFavorites=async()=>{
      try{
        const response = await api.get("word/saved_words");
        
      }catch(error){
        console.log("Something went wrong:", error)
      }
    }
    
  },[])

  useEffect(()=>{
    if(!user){
      navigate("/register/")
    }
  },[user])

  
  return(
    <>
      <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>Word</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>intendments</td>
          <td>Otto</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry the Bird</td>
        </tr>
      </tbody>
    </Table>
    </>
  );
};

export default CollectionPage;