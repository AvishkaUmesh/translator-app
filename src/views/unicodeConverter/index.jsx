import React, { useState, useEffect } from 'react';
import {
  dlManelToUnicode,
  baminiToUnicode,
  kaputaToUnicode,
  fmAbayaToUnicode,
  amaleeToUnicode,
  thibusToUnicode,
  unicodeToDlManel,
  unicodeToBamini,
  unicodeToKaputa,
  singlishToUnicode,
  singlishPhoneticToUnicode,
} from 'sinhala-unicode-coverter';

function TextConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('dlManelToUnicode'); // Default method

  useEffect(() => {
    // Create a map of conversion functions
    const conversionMethods = {
      dlManelToUnicode,
      baminiToUnicode,
      kaputaToUnicode,
      fmAbayaToUnicode,
      amaleeToUnicode,
      thibusToUnicode,
      unicodeToDlManel,
      unicodeToBamini,
      unicodeToKaputa,
      singlishToUnicode,
      singlishPhoneticToUnicode,
    };

    // Get the selected conversion function based on the dropdown value
    const selectedConversionFunction = conversionMethods[selectedMethod];

    if (selectedConversionFunction) {
      const convertedText = selectedConversionFunction(inputText);
      setOutputText(convertedText);
    }
  }, [inputText, selectedMethod]);

  const copyToClipboard = () => {
    // Create a temporary textarea element to copy the text
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = outputText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
  };

  const resetTextAreas = () => {
    setInputText('');
    setOutputText('');
  };

  const handleDropdownChange = (e) => {
    setSelectedMethod(e.target.value);
    resetTextAreas(); // Call the resetTextAreas function when the dropdown changes
  };

  return (
    <div>
      <h1>Sinhala Text Converter</h1>
      <div>
        <label>Select Conversion Method:</label>
        <select
          value={selectedMethod}
          onChange={handleDropdownChange} // Use the handleDropdownChange handler
        >
          <optgroup label="Legacy format to Unicode">
            <option value="dlManelToUnicode">DL-Manel to Unicode</option>
            <option value="baminiToUnicode">Bamini to Unicode</option>
            <option value="kaputaToUnicode">Kaputa to Unicode</option>
            <option value="fmAbayaToUnicode">FM-Abaya to Unicode</option>
            <option value="amaleeToUnicode">Amalee to Unicode</option>
            <option value="thibusToUnicode">Thibus to Unicode</option>
          </optgroup>
          <optgroup label="Unicode to Legacy">
            <option value="unicodeToDlManel">Unicode to DL-Manel</option>
            <option value="unicodeToBamini">Unicode to Bamini</option>
            <option value="unicodeToKaputa">Unicode to Kaputa</option>
          </optgroup>
          <optgroup label="Singlish to Unicode">
            <option value="singlishToUnicode">Singlish (Sinhala) to Unicode</option>
            <option value="singlishPhoneticToUnicode">Singlish Phonetic (Sinhala) to Unicode</option>
          </optgroup>
        </select>
      </div>
      <div>
        <textarea
          placeholder="Enter your text here"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Converted text will appear here"
          value={outputText}
          readOnly
        />
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
        <button onClick={resetTextAreas}>Reset</button>
      </div>
    </div>
  );
}

export default TextConverter;
