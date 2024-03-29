import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header';


import { useState} from 'react';
import { Container} from 'react-bootstrap';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [word, setWord] = useState("null");
  const [isPremium, setIsPremium] = useState(false);
  const [aiTextResponse, setAiTextResponse] = useState([]);
  const [translatedWord, setTranslatedWord] = useState("");

  return (
    <>
        <Header user={user} setUser={setUser} isPremium={isPremium}/>
        <Container>
          <Outlet context={{
            user, setUser, 
            word, setWord, 
            isPremium, setIsPremium,
            aiTextResponse, setAiTextResponse,
            translatedWord, setTranslatedWord
            }}/>
        </Container>
        <Footer/>
    </>
  )
}

export default App;
