import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities";
import { Container, Card, CardBody, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { TfiText } from "react-icons/tfi";
import { FaRegImage } from "react-icons/fa6";
import "./PremiumShop.css";

const PremiumShop = () => {
  const {
    user,
    word,
    setWord,
    aiTextResponse,
    setAiTextResponse,
  } = useOutletContext();
  const navigate = useNavigate();

  // outline highlights
  const [highlightedDefinition, setHighlightedDefinition] = useState(false);
  const [highlightedImage, setHighlightedImage] = useState(false);

  const getTextResponse = async () => {
    console.log("clicked")
    let currentWord = word
    try {
      const response = await api.get(`conversations/${word}/`);
      if (response.status === 201) {
        setAiTextResponse(response.data.ai_response);
        setWord("");
        setWord(currentWord)
        navigate("/demo/")
      }
    } catch (error) {
      alert("Must be a word!")
      console.error(error.response.error);
    }
  };

  // Handle the click event for the "Generate Definition" card
  const handleDefinitionClick = () => {
    getTextResponse();
    setHighlightedDefinition(true);

    setTimeout(() => {
      setHighlightedDefinition(false);
    }, 1000);
  };

  // Handle the click event for the "Generate Image" card
  const handleImageClick = () => {
    // You can add logic specific to the image card here if needed
    setHighlightedImage(true);
    setTimeout(() => {
      setHighlightedImage(false);
    }, 1500);
  };

  useEffect(() => {
    if (!user) {
      navigate("/register/");
    }
  }, [user, word]);

  return (
    <Container className="d-flex flex-column">
      <Row className="justify-content-center">
        <Col xs={6} sm={5}>
          <Card
            className={`green-outline-button ${
              highlightedDefinition ? "highlighted" : ""
            }`}
            onClick={handleDefinitionClick}
          >
            <Card.Body>
              <div className="text-center">
                <TfiText size={65} />
              </div>
              <p className="text-center mt-3">Generate <strong>Definition</strong> for '{word}'</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} sm={5}>
          <Card
            className={`blue-outline-button ${
              highlightedImage ? "highlighted" : ""
            }`}
            onClick={handleImageClick}
          >
            <Card.Body>
              <div className="text-center">
                <FaRegImage size={65} />
              </div>
              <p className="text-center m-3">Generate <strong>Img</strong> using '{word}'</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Row className="justify-content-center">
        <Col xs={12} sm={10}>
          <Card>
            <Card.Header>
              <h3 className="text-center"> "{word}"</h3>
            </Card.Header>
            <CardBody>
                {Array.isArray(aiTextResponse) && aiTextResponse.length > 0 && (
                  <ul className="mt-4">
                    {aiTextResponse.map((item, idx) => (
                      <li key={idx}>
                        <strong>AI Definition: </strong>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </CardBody>
          </Card>
        </Col>
      </Row> */}
    </Container>
  );
};

export default PremiumShop;
