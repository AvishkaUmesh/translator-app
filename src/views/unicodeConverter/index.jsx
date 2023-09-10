import React, { useState, useEffect } from "react";
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
} from "sinhala-unicode-coverter";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Copy } from 'lucide-react';
function TextConverter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("dlManelToUnicode"); // Default method

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
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = outputText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
    document.getElementById("my_modal_1").classList.remove("hidden");
    setTimeout(function () {
      document.getElementById("my_modal_1").classList.add("hidden");
    }, 2000);
  };

  const resetTextAreas = () => {
    setInputText("");
    setOutputText("");
  };

  const handleDropdownChange = (e) => {
    setSelectedMethod(e.target.value);
    // resetTextAreas(); // Call the resetTextAreas function when the dropdown changes
  };

  AOS.init();

  return (
    <div>
      <div className="mt-8 rounded-2xl bg-white p-8">
        <h1 className="text-xl font-bold text-navy-700">Sinhala Text Converter</h1>
      </div>
      <div className="mt-4 w-full rounded-2xl bg-white p-8" data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500">
        <div className="flex flex-col gap-1 " data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="600">
          <label>Select Conversion Method:</label>
          <select
            value={selectedMethod}
            onChange={handleDropdownChange} // Use the handleDropdownChange handler
            className="select select-bordered w-6/12 max-w-xs"
          >
            <optgroup label="Legacy format to Unicode">
              <option value="dlManelToUnicode">DL-Manel to Unicode</option>
              <option value="kaputaToUnicode">Kaputa to Unicode</option>
              <option value="fmAbayaToUnicode">FM-Abaya to Unicode</option>
              <option value="amaleeToUnicode">Amalee to Unicode</option>
              <option value="thibusToUnicode">Thibus to Unicode</option>
            </optgroup>
            <optgroup label="Unicode to Legacy">
              <option value="unicodeToDlManel">Unicode to DL-Manel</option>
              <option value="unicodeToKaputa">Unicode to Kaputa</option>
            </optgroup>
            <optgroup label="Singlish to Unicode">
              <option value="singlishToUnicode">
                Singlish (Sinhala) to Unicode
              </option>
              <option value="singlishPhoneticToUnicode">
                Singlish Phonetic (Sinhala) to Unicode
              </option>
            </optgroup>
          </select>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 ">
          <div className="">
            <div className="form-control" data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="700">
              <label className="label">
                <span className="label-text">Input Text</span>
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
              <textarea
              
                class="textarea textarea-bordered textarea-primary text-xl min-h-[250px] w-full rounded-xl"
                placeholder="Enter your text here"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <div className="form-control" data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="900">
              <label className="label">
                <span className="label-text">Coverted Text</span>
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
              <textarea
                class="textarea textarea-bordered text-xl min-h-[250px] w-full rounded-xl"
                placeholder="Converted text will appear here"
                value={outputText}
                readOnly
              />
            </div>
            <div className="mt-4 flex justify-between" data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1000">
              <button className="btn" onClick={copyToClipboard} >
              <Copy />
                Copy to Clipboard
              </button>
              <button className="btn btn-outline  btn-primary" onClick={resetTextAreas}>Reset</button>
            </div>
          </div>
        </div>

        
 


      </div>
      <div className="mt-4 rounded-2xl bg-white p-8 hidden" id="my_modal_1">
      <div className="alert alert-success " >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Text Copied to ClipBoard</span>
        </div>
      </div>
    </div>
  );
}

export default TextConverter;
