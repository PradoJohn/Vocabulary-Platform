import { Row, Card} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';



const HomePage = () => {
  const [randomWord, setRandomWord] = useState(null)
  const [wordDetails, setWordDetails] = useState([])
  
  
  useEffect(()=>{
    const getRandomWord = async()=>{
      const response = await axios.get("https://random-word-api.herokuapp.com/word")
      console.log(response.data)
      setRandomWord(response.data)
    }
    // const getWordDetails =async()=>{
    //   const token = localStorage.getItem("token")
    //   if (token){
    //     api.defaults.headers.common["Authorization"] = `Token ${token}`
    //     let response = await api.get(`word/search_word/${randomWord}/`)
    //     console.log(response.data)
    //     setWordDetails(response.data)
    //   } 
    // }
    getRandomWord();
    // getWordDetails();  
  },[])

  return (
    <>
        <Row className="d-flex flex-column">
          <Card>
            <h3 className='text-center' style={{width:'300px'}}>"{randomWord}"</h3>

            <p className='text-center'>View Definition and Examples</p>
          </Card>
        </Row>
    </>
  );
}

export default HomePage;
