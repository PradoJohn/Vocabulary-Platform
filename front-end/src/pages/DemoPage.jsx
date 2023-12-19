import { api } from "../utilities";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button, Card, CardBody, Row } from "react-bootstrap";
import { MdFavoriteBorder, MdFavorite} from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import './DemoPage.css'
import axios from "axios";

const DemoPage = () => {
  const { 
    user, word, setWord, 
    isPremium, aiTextResponse, setAiTextResponse} = useOutletContext();
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const [wordDetails, setWordDetails] = useState([]);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  
  const getWordDetails = async (wordToSearch) => {
      try {
        const response = await api.get(`word/search_word/${wordToSearch}/`);
        if(response.data[0]){
          const {meanings} = response.data[0]
          setWordDetails(meanings)
        }
      } catch (error) {
        if (error.response.status === 404) {
          setWordDetails({})
          console.error(error.response.data.error)
          setError(error.response.data.error)
        }
        console.error("Error fetching word details:", error);
      }
  };

  const getRandomWord = async()=>{
    console.log("clicked")
    try{
      const response = await axios.get("https://random-word-api.vercel.app/api?words=1")
      let random_word = response.data[0]
      if (response.data){
        setWord(random_word)
        getWordDetails(random_word)
        getSavedFavorites(random_word)
      }
    }catch (error){
      console.error(error.response.status.error)
    }
  }

  // Sets the Word then fetch details
  const handleSearch = () => {
    if(searchWord){
      setWord(searchWord);
      getWordDetails(searchWord);
    }
  };
  
  const addToFavorites=async(wordToSave)=>{
    try{
      const response = await api.post(`word/search_word/${wordToSave}/`,{
        word: wordToSave
      });
        if (response.status === 200){
          setIsFavorite(!isFavorite)
        }
      }catch (error){
      console.error(error.response.data.error)
    }
  };

  const deleteFromFavorites= async()=>{
    let id = await getWordId();
    try{
      if (id !== null){
        const response = await api.delete(`word/saved_words/${id}`,{
          id: id
        })
        if(response.status ===200){
          setIsFavorite(!isFavorite)
        }
      }
    }catch(error){
      console.log("Error during deletion of word: ", id)
    }
  };

  const getWordId = async()=>{
    try{
      const response = await api.get("word/saved_words/")
      if(response.status ===200){
        return response.data.find(item => item.word === word).id
      } 
    }catch(error){
      console.log(error)
    }
  };

  const getSavedFavorites = async (word) => {
    try {
      const response = await api.get("word/saved_words/");
      if (response.status === 200) {
        const wordExists = response.data.some(item => item.word === word);
        // console.log("Word exists in response data:", wordExists); // Debug output
        if (wordExists) {
          setIsFavorite(true);
          setAiTextResponse(response.data.find(item => item.word === word).ai_response);
        } else {
          setIsFavorite(false);
        }
      }
    } catch (error) {
      // Debug checker
      console.error("Error retrieving saved_words from the database:", error);
    }
  };
  
  useEffect(() => {
    if (!user) {
      navigate("/register/");
    }
    getWordDetails(word);
    getSavedFavorites(word);
  }, [user, word]);

  
  useEffect(() => {
    // remounts when retrieving new word Details
  }, [wordDetails]);
  

  return (
    <>
      <Row className="search-demo-row">
       
        <div id="search-container">
          <Button id="search-button" onClick={()=>getRandomWord()}><GiPerspectiveDiceSixFacesRandom size={35} /></Button>
          <input
            value={searchWord}
            type="text"
            id="search-bar"
            placeholder="Search a Word..."
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <Button id="search-button" onClick={handleSearch}>
            <GoSearch size={35}/>
          </Button>
        </div>
        <Card>
          <CardBody>
            {isPremium? (
              <Button 
              className="float-end"
              variant="transparent"
              onClick={()=>{isFavorite ? deleteFromFavorites(): addToFavorites(word) }}
              >
              {isFavorite? <MdFavorite className="heart" size={30}/>: <MdFavoriteBorder size={30}/> }
            </Button>
            ):null}
            <h3 className="text-center"> "{word}"</h3>
            {Array.isArray(wordDetails) && wordDetails.length > 0 ? (
              wordDetails.map((item, idx) => (
                <div key={idx} className="mt-4">
                  <p>
                    <i>{item.partOfSpeech}</i>
                  </p>
                  <ul>
                    {item.definitions.map((definition, defIdx) => (
                      <li key={defIdx}>
                        <strong>Definition:</strong> {definition.definition}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              Array.isArray(aiTextResponse) && aiTextResponse.length > 0 ? (
                aiTextResponse.map((item, idx) => (
                    <ul className="mt-4">
                      <li key={idx}> <strong>AI Definition: </strong>{item}</li>
                    </ul>
                ))
              ) : (
              <div className="mt-5">
                <p className="text-center" style={{color:"red"}}>"{error}"</p>
                <div className="float-start">
                <Button className="btn-navigate-to-shop" variant="transparent" onClick={()=>navigate("/premium_shop/")}>See AI Definition. . .</Button>
                </div>
              </div>
              )
            )}
          </CardBody>
        </Card>
      </Row>
    </>
  );
};

export default DemoPage;
