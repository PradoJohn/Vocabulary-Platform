import { api } from "../utilities";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button, Card, CardBody, Row } from "react-bootstrap";
import { MdFavoriteBorder, MdFavorite} from "react-icons/md";
import './DemoPage.css'

const DemoPage = () => {
  const { user, word, setWord } = useOutletContext();
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const [wordDetails, setWordDetails] = useState({});
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const getWordDetails = async (wordToSearch) => {
      try {
        const response = await api.get(`word/search_word/${wordToSearch}/`);
        if(response.data[0]){
          // destructuring meaning from json data
          const {meanings} = response.data[0]
          // console.log(meanings)
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
  // Sets the Word then fetch details
  const handleSearch = () => {
    if(searchWord){
      setWord(searchWord);
      getWordDetails(word);
    }
  };

  
  const addToFavorites=async(wordToSave)=>{
    // To add word to Favorite Collections
    try{
      const response = await api.post(`word/search_word/${wordToSave}/`,{
        word: wordToSave
      });
      // console.log("save the word", wordToSave)
        if (response.status === 200){
          setIsFavorite(true)
          console.log("Word is saved")
        }else{
          console.log("Word Not Saved")
        }
      }catch (error){
      console.error(error.response.data.error)
    }
  };

  // To remove from Favorite Collections
  const deleteFromFavorites=(wordToDelete)=>{
    console.log("delete",wordToDelete)
  };

 
  useEffect(()=>{
  // mounts word that exist from the database then remounts for new word
  const getSavedFavorites = async (word) => {
    try {
      const response = await api.get("word/saved_words/");
      if (response.status === 200) {
        console.log(response.data);
  
        // Check if the word exists in any of the objects in the response data
        const wordExists = response.data.some(item => item.word === word);
        console.log("Word exists in response data:", wordExists); // Debug output
  
        if (wordExists) {
          console.log("The word exists in the database.");
          setIsFavorite(true);
        } else {
          console.log("The word does not exist in the database.");
          setIsFavorite(false);
        }
      }
    } catch (error) {
      // Debug checker
      console.error("Error retrieving saved_words from the database:", error);
    }
  };

  getSavedFavorites(word);
  },[word]);
  
  
  useEffect(() => {
    // check user if exist otherwise redirects to login page
    if (!user) {
      navigate("/register/");
    }
    getWordDetails(word);
  }, [user, word]);

  
  useEffect(() => {
    // remounts when retrieving new word Details
  }, [wordDetails]);
  

  return (
    <>
      <Row className="search-demo-row">
        <div id="search-container">
          <input
            value={searchWord}
            type="text"
            id="search-bar"
            placeholder="Search a Word..."
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <button id="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <Card>
          <CardBody>
            <Button 
            className="float-end"
            variant="transparent"
            onClick={()=>{isFavorite ? deleteFromFavorites(word): addToFavorites(word) }}
            >
              {isFavorite ? <MdFavorite size={30}/>: <MdFavoriteBorder size={30}/> }
            </Button>
            <h3 className="text-center"> "{word}"</h3>
            {Array.isArray(wordDetails) && wordDetails.length > 0 ? (
              wordDetails.map((item, idx) => (
                <div key={idx}>
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
              <p className="text-center" style={{color:"red"}}>"{error}"</p>
            )}
          </CardBody>
        </Card>
      </Row>
    </>
  );
};

export default DemoPage;
