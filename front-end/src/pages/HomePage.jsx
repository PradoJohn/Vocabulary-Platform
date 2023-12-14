import { Row, Card} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const HomePage = () => {
  const [randomWord, setRandomWord] = useState(null)
  const {setWord} = useOutletContext();
  
  useEffect(()=>{
    const getRandomWord = async()=>{
      const response = await axios.get("https://random-word-api.herokuapp.com/word")
      // console.log(response.data)
      setWord(response.data)
      setRandomWord(response.data)
    }
    getRandomWord();
  },[])

  return (
    <>
        <Row className="d-flex flex-column">
          <Card>
            <h3 className='text-center' style={{width:'300px'}}>"{randomWord}"</h3>
            <p className='text-center'> <Link to="/demo/">View Definition</Link></p>
          </Card>
        </Row>
    </>
  );
}

export default HomePage;
