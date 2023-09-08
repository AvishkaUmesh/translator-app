import React, { useState } from 'react';
import './DictionaryPage.css'; // Import your custom CSS for styling

const DictionaryPage = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleApiCall = async () => {
    try {
      const response = await fetch('/httpRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        const meanings = data.result.meanings.map((meaningObj) => meaningObj.meaning);
        // Join meanings into a string
        const meaningsString = meanings.join(', ');
        setResult(meaningsString);
      } else {
        setResult('API query failed');
      }
    } catch (error) {
      console.error(error);
      setResult('API query failed');
    }
  };

  return (
    
    <div className="bg-purple-500 min-h-screen p-4">
      <h1 className="text-2xl text-white mb-4">Sinhala to English Dictionary</h1>
      <div className="bg-white rounded-lg p-4">
        <input
          type="text"
          placeholder="Enter your word"
          className="w-full border border-gray-300 p-2 rounded-md mb-4"
          value={inputText}
          onChange={handleInputChange}
        />
        <button
          onClick={handleApiCall}
          className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 focus:outline-none"
        >
          Search
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-lg text-white mb-2">Result:</h2>
        <div className="bg-white rounded-lg p-4">
          <p className="text-gray-800">{result}</p>
        </div>
      </div>
    </div>
  );
};

export default DictionaryPage;
