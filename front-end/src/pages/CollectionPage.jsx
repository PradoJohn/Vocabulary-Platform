import React, { useEffect, useState } from 'react';
import { api } from '../utilities';
import {
  Row,
  Card,
  CardBody,
  Table,
  Button,
  Pagination,
} from 'react-bootstrap';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FaRegTrashCan } from 'react-icons/fa6';
import './CollectionPage.css';

const CollectionPage = () => {
  const { user, setWord } = useOutletContext();
  const navigate = useNavigate();
  const [savedWords, setSavedWords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const wordsPerPage = 10;

  const getSavedFavorites = async () => {
    try {
      const response = await api.get('word/saved_words/');
      if (response.status === 200) {
        // console.log('All data: ', response.data);
        setSavedWords(response.data);
      }
    } catch (error) {
      console.log('Something went wrong:', error);
    }
  };

  const handleClick = async(param) => {
    // handling if id or word
    if(typeof(param)==='number'){
      try{
        const response = await api.delete(`word/saved_words/${param}/`,{
          id:param
        });
        
        if (response.status ===200){
          getSavedFavorites();
        }
      }catch (error){
        console.error()
      }
    }else if(typeof(param)==='string'){
      setWord(param);
      navigate("/demo/")
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/register/');
    }
    getSavedFavorites();
  }, [user]);

  // Calculate the index of the first and last word to display for the current page
  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = savedWords.slice(indexOfFirstWord, indexOfLastWord);

  // Change the current page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Row className='mb-5'>
        <Card>
          <Card.Header className='word-collection-header text-center'><strong>WORD COLLECTIONS</strong></Card.Header>
          <Table striped className="mt-4">
            <thead>
              <tr className="text-center">
                <th>Word</th>
                <th>AI Generated</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {currentWords.map((item, idx) => (
                <tr key={idx} className="text-center">
                  <td onClick={()=>{handleClick(item.word)}}>
                    <Button 
                      variant="transparent"
                    >
                      <i>{item.word}</i>
                    </Button>
                  </td>
                  <td>{item.ai_response ? 'yes' : 'no'}</td>
                  <td onClick={()=> handleClick(item.id)}>
                    <Button variant="transparent" className="p-0">
                      <FaRegTrashCan className="trash-icon" size={20} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Pagination className="justify-content-center mt-3">
            <Pagination.Prev
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
            />
            {Array.from({ length: Math.ceil(savedWords.length / wordsPerPage) })
              .slice(currentPage - 1, currentPage + 2) // Display pages 1, 2, and 3 initially
              .map((_, index) => {
                const pageNumber = index + currentPage;
                return (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                );
              })}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prevPage) =>
                  Math.min(prevPage + 1, Math.ceil(savedWords.length / wordsPerPage))
                )
              }
            />
          </Pagination>

      </Row>
    </>
  );
};

export default CollectionPage;
