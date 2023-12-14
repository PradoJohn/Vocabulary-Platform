import { api } from "../utilities";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Card, CardBody, Row } from "react-bootstrap";

import './DemoPage.css'

const DemoPage = () => {
  const { user, word, setWord } = useOutletContext();
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const [wordDetails, setWordDetails] = useState({});
  const [error, setError] = useState("");

  const getWordDetails = async (wordToSearch) => {
      try {
        const response = await api.get(`word/search_word/${wordToSearch}`);
        if(response.data[0]){
          // destructuring meaning from json data
          const {meanings} = response.data[0]
          console.log(meanings)
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

  const handleSearch = () => {
    setWord(searchWord);
    getWordDetails(word);
  };

  useEffect(() => {
    if (!user) {
      navigate("/register/");
    }
    getWordDetails(word);
  }, [user, word]);

  useEffect(() => {
    
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
