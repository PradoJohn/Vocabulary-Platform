import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header';

import { api } from "./utilities";
import { useState, useEffect } from 'react';
import { Container} from 'react-bootstrap';
import Footer from './components/Footer';


function App() {
  const [user, setUser] = useState(null);
  
  return (
    <>
        <Header user={user} setUser={setUser}/>
        <Container>
          <Outlet context={{user, setUser}}/>
        </Container>
        <Footer/>
    </>
  )
}

export default App;
