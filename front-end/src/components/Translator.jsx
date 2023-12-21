import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './Translator.css';
import { BsTranslate } from 'react-icons/bs';
import { useOutletContext } from 'react-router-dom';

// Language Options
const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'it', name: 'Italian' },
  { code: 'ko', name: 'Korean' },
  { code: 'ru', name: 'Russian' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'zh-CN', name: 'Chinese Traditional' },
  { code: 'zh-TW', name: 'Chinese Simplified' },
];
export const DropDownTranslator = ({ word, setTranslatedWord }) => {
  const [curLanguage, setCurLanguage] = useState("en");

  const handleTranslate = async (targetLanguage) => {
    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set('source_language', curLanguage);
      encodedParams.set('target_language', targetLanguage);
      encodedParams.set('text', word);

      const options = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key':'86eb1cd6d6mshea67072103ee1e9p1c9300jsn1ee2e2778682',
          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
        },
        data: encodedParams,
      };

      const response = await axios.request(options);
      const translatedText = response.data.data.translatedText;
      setCurLanguage(targetLanguage);
      setTranslatedWord(translatedText);
      if(targetLanguage ==='en'){
        setTranslatedWord("")
      }
    
    } catch (error) {
      console.error('Translation error:', error);
    }
  };
  


  return (
    <div>
      <Dropdown className="float-start">
        <Dropdown.Toggle as={CustomToggle}>
          <BsTranslate style={{ color: 'black' }} size={28} />
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu} style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {languageOptions.map((option) => (
            <Dropdown.Item key={option.code} eventKey={option.name} onClick={() => handleTranslate(option.code)}>
              {option.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="translator-link"
  >
    {children}
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={`custom-menu ${className}`}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type Language..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children)
            .filter(
              (child) =>
                !value ||
                child.props.eventKey.toLowerCase().startsWith(value.toLowerCase())
            )
            .map((child) => (
              <Dropdown.Item key={child.key} onClick={child.props.onClick}>
                {child}
              </Dropdown.Item>
            ))}
        </ul>
      </div>
    );
  }
);
