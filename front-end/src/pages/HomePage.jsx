import { Row, Card, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const HomePage = () => {
  const [randomWord, setRandomWord] = useState(null)
  const {setWord} = useOutletContext();
  
  useEffect(()=>{
    const getRandomWord = async()=>{
      // Word API genertors: 
      // Lots of uncommon words: https://random-word-api.herokuapp.com/word
      // Lots of common words: https://random-word-api.vercel.app/api?words=1
      const response = await axios.get("https://random-word-api.herokuapp.com/word")
      setWord(response.data[0])
      setRandomWord(response.data)
    }
    getRandomWord();
  },[])

  return (
    <>
      <Row className="justify-content-center align-items-center mb-3">
        <Col lg={8}>
          <Card className="p-4">
            <h1 className="display-4 text-center">Welcome to WordFinity</h1>
            <p className="text-center">
              WordFinity is your ultimate vocabulary learning companion. Whether you want to learn vocabulary words randomly or search for specific words, we've got you covered with a wide range of features:
            </p>
            <hr />
            <div className="text-center">
              <h3>"{randomWord}"</h3>
              <Button  id= "search-button" className='mt-2' as={Link} to="/demo/">View Definition</Button>
            </div>
            <hr/>
            <ul>
              <li><strong>Random Vocabulary Learning:</strong> Discover new words and expand your vocabulary with our random word generator.</li>
              <li><strong>Word Search:</strong> Easily search for specific words and access detailed definitions and examples.</li>
              <li><strong>AI-Generated Examples:</strong> Our platform provides AI-generated example sentences to help you understand word usage in context.</li>
              <li><strong>More Resources:</strong> Explore additional learning resources, quizzes, and articles to enhance your language skills.</li>
            </ul>
            
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
