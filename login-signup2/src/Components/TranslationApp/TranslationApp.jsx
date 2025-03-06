import React, { useState } from 'react';
import axios from 'axios';
import './TranslationApp.css';

const TranslationApp = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [inputLanguage, setInputLanguage] = useState('en'); // Default to English
  const [outputLanguage, setOutputLanguage] = useState('es'); // Default to Spanish
  const [errorMessage, setErrorMessage] = useState('');

  const handleTranslate = async () => {
    // Log the data being sent to the backend for debugging
    console.log("Sending data:", {
      text: inputText,
      targetLanguage: outputLanguage,
    });

    try {
      // Make the POST request to the backend API
      const response = await axios.post('http://localhost:5000/translate', {
        text: inputText,
        targetLanguage: outputLanguage,
      });

      // Check if the response contains the translated text
      if (response.data && response.data.translatedText) {
        setOutputText(response.data.translatedText);
        setErrorMessage(''); // Clear any previous errors
      } else {
        setErrorMessage('Translation failed. Please try again.');
      }
    } catch (error) {
      // Log any errors in the console
      console.error("Translation API Error:", error);
      setErrorMessage('An error occurred while translating.');
    }
  };

  return (
    <div className="translation-app">
      <h1>Translate Text</h1>

      <div className="translation-input">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate"
        ></textarea>

        <div>
          <label>Input Language: </label>
          <select value={inputLanguage} onChange={(e) => setInputLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            {/* Add more languages as needed */}
          </select>
        </div>
      </div>

      <div className="translation-output">
        <div>
          <label>Output Language: </label>
          <select value={outputLanguage} onChange={(e) => setOutputLanguage(e.target.value)}>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            {/* Add more languages as needed */}
          </select>
        </div>

        <textarea value={outputText} readOnly placeholder="Translated text will appear here"></textarea>
      </div>

      <button className="translate-button" onClick={handleTranslate}>Translate</button>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default TranslationApp;
