import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header';

import { api } from "./utilities";
import { useState, useEffect } from 'react';
import { Container} from 'react-bootstrap';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [word, setWord] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  return (
    <>
        <Header user={user} setUser={setUser} isPremium={isPremium}/>
        <Container>
          <Outlet context={{
            user, setUser, 
            word, setWord, 
            isPremium, setIsPremium
            }}/>
        </Container>
        <Footer/>
    </>
  )
}

export default App;
