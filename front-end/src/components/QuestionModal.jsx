import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { api } from '../utilities';
import { useNavigate } from 'react-router-dom';

function QuestionModal({ show, onClose, word, setAiTextResponse }) {

  const [question, setQuestion] = useState("");
  const navigate = useNavigate();


  const handleQuestionClick =async()=>{

    try{
      const response = await api.post("conversations/",{
        word: word,
        prompt: question
      })
      if (response.status ===201){
        setAiTextResponse(response.data.ai_response)
        onClose(false)
        navigate("/demo/")
      }
    }catch(error){
      console.error(error.console.status.error)
    }
  }

  return (
    <>
      <Modal show={show} onHide={() => onClose(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ask a Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>'{word}'</Form.Label>
              <Form.Control
                value={question}
                type="text"
                placeholder={`Ex. What is ${word}?`}
                autoFocus
                onChange={(e)=>setQuestion(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleQuestionClick()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default QuestionModal;
