const express = require("express");
const translate = require("google-translate-api-x");
const bodyParser = require("body-parser");
const httpRequest = require("http");
const maduraAPI = require("@sl-codeblaster/nodejs-madura-api");


const app = express();
const port = 5001;

app.use(bodyParser.json());

app.post("/translate", async (req, res) => {
  const { text } = req.body;

  try {
    const translation = await translate(text, { from: "si", to: "en" });
    res.json({ translation: translation.text });
  } catch (error) {
    res.status(500).json({ error: "Translation failed" });
  }
});


app.post("/dictionary", async (req, res) => {
  try {
    // Extract the user input from the request body
    const { word } = req.body;

    if (!word) {
      // Handle the case where 'word' is not provided in the request body
      return res.status(400).json({ error: "Word not provided in the request" });
    }

    //  use the user-provided 'word' in the Madura API query
    const result = await maduraAPI.query(word);

    console.log(result);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "API query failed" });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
