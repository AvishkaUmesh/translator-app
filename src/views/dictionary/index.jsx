// 
import React, { useState } from 'react';
import './DictionaryPage.css'; 

const DictionaryPage = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setError(null); // Clear any previous errors when input changes
  };

  const handleApiCall = async () => {
    if (!inputText) {
      setError('Please enter a word.'); // Empty input validation
      return;
    }

    if (inputText.length < 2) {
      setError('Please enter at least 2 characters.'); // Minimum input length validation
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/dictionary', {
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
        setError(null); // Clear any previous errors
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'API query failed');
      }
    } catch (error) {
      console.error(error);
      setError('API query failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="mt-8 rounded-2xl bg-white p-8">
      <h1 className="text-xl">Sinhala-English Switch Dictionary</h1>
      </div>

      <h1 className="text-2xl text-white mb-4"></h1>
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
          className={`bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>

      </div>
      <div className="mt-4 bg-white rounded-lg p-4">

        <h2 className="text-lg mb-2">Result:</h2>

        <div className=" min-h-[250px] w-full border rounded-xl p-2">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <p className="text-gray-800">{result}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DictionaryPage;
