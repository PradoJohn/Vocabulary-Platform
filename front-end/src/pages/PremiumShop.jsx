import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities";
import { Container, Card, CardBody, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { TfiText } from "react-icons/tfi";
import { FaRegImage } from "react-icons/fa6";
import { RiQuestionMark } from "react-icons/ri";
import { MdQuiz } from "react-icons/md";
import QuestionModal from "../components/QuestionModal";
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
  const [highlightedQuestion, setHighlightedQuestion] = useState(false);
  const [highlightedQuiz, setHighlightedQuiz] = useState(false);

  // Modal 
  const [showQuestionModal, setShowQuestionModal] = useState(false);


  const getTextResponse = async () => {
    try {
      let currentWord = word
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

  // Handle "Generate Definition" card
  const handleDefinitionClick = () => {
    getTextResponse();
    setHighlightedDefinition(true);
    setTimeout(() => {
      setHighlightedDefinition(false);
    }, 1000);
  };

   // Handle "Questions" card
   const handleQuestionClick = () => {
    setHighlightedQuestion(true);
    setShowQuestionModal(true);
    setTimeout(() => {
      setHighlightedQuestion(false);
    }, 1500);
  };
  // Handle "Quiz" card
  const handleQuizClick = () => {
    setHighlightedQuiz(true);
    setTimeout(() => {
      setHighlightedQuiz(false);
    }, 1000);
  };
  // Handle "Generate Image" card
  const handleImageClick = () => {
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
      <h3 className="mt-3 text-center">'{word}'</h3>
      <Row className="justify-content-center">
        {/* Word Definition Button */}
        <Col xs={6} sm={5} lg={4} xl={4}>
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
              <p className="text-center mt-3">Get AI <br /><strong>Definition</strong></p>
            </Card.Body>
          </Card>
        </Col>
        {/* Custom Query Button */}
        <Col xs={6} sm={5} lg={4} xl={4}>
          <Card
            className={`green-outline-button ${
              highlightedQuestion ? "highlighted" : ""
            }`}
            onClick={handleQuestionClick}
          >
            <Card.Body>
              <div className="text-center">
                <RiQuestionMark size={65} />
              </div>
              <p className="text-center m-3"> Ask a <br /> <strong>Question</strong></p>
            </Card.Body>
          </Card>
        </Col>
        {/* Render the QuestionModal component with the showQuestionModal prop */}
        <QuestionModal 
        show={showQuestionModal} 
        onClose={() => setShowQuestionModal(false)} 
        word={word}
        setAiTextResponse={setAiTextResponse}
        />
      </Row>

      <Row className="justify-content-center">
        {/* Quiz Button */}
        <Col xs={6} sm={5} lg={4} xl={4}>
          <Card
            className={`blue-outline-button ${
              highlightedQuiz ? "highlighted" : ""
            }`}
            onClick={handleQuizClick}
          >
            <Card.Body>
              <div className="text-center">
                <MdQuiz size={65} />
              </div>
              <p className="text-center mt-3">Take a <br/><strong>Quiz</strong></p>
            </Card.Body>
          </Card>
        </Col>
        {/* Image Generator Button */}
        <Col xs={6} sm={5} lg={4} xl={4}>
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
              <p className="text-center m-3">Generate <br /><strong>Img</strong></p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PremiumShop;
